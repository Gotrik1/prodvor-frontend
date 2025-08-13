
'use server';
/**
 * @fileOverview Sends a tournament announcement to all registered participants.
 *
 * - sendTournamentAnnouncement - A function that handles the announcement process.
 * - SendTournamentAnnouncementInput - The input type for the function.
 * - SendTournamentAnnouncementOutput - The return type for the function.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';

// Mock function to get participants of a tournament
async function getTournamentParticipants(tournamentId: string): Promise<{ email: string, name: string }[]> {
  console.log(`Fetching participants for tournament: ${tournamentId}`);
  // In a real app, this would query a database.
  return [
    { email: 'player1@example.com', name: 'Terminator' },
    { email: 'player2@example.com', name: 'Valkyrie' },
    { email: 'player3@example.com', name: 'Destroyer' },
  ];
}

const SendTournamentAnnouncementInputSchema = z.object({
  tournamentId: z.string().describe("The ID of the tournament."),
  subject: z.string().describe('The subject of the announcement.'),
  message: z.string().describe('The content of the announcement message or a prompt for the AI.'),
  isAiEnhanced: z.boolean().describe("Whether to use AI to enhance the message.")
});
export type SendTournamentAnnouncementInput = z.infer<typeof SendTournamentAnnouncementInputSchema>;

const SendTournamentAnnouncementOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});
export type SendTournamentAnnouncementOutput = z.infer<typeof SendTournamentAnnouncementOutputSchema>;

// This is a tool the AI can use to "send" an email.
const sendEmailTool = ai.defineTool(
  {
    name: 'sendEmail',
    description: 'Sends an email to a recipient.',
    inputSchema: z.object({
      to: z.string().describe("The recipient's email address."),
      subject: z.string().describe('The subject of the email.'),
      body: z.string().describe('The HTML body of the email.'),
    }),
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    console.log(`Email Tool: Pretending to send email to ${input.to}`);
    console.log(`Subject: ${input.subject}`);
    console.log(`Body: ${input.body}`);
    // In a real app, you would integrate with an email service like SendGrid or Nodemailer.
    return { success: true };
  }
);

const announcementFlow = ai.defineFlow(
  {
    name: 'announcementFlow',
    inputSchema: SendTournamentAnnouncementInputSchema,
    outputSchema: SendTournamentAnnouncementOutputSchema,
  },
  async (input) => {
    try {
      const participants = await getTournamentParticipants(input.tournamentId);

      if (!participants || participants.length === 0) {
        return { success: false, error: 'No participants found for this tournament.' };
      }

      let finalMessage = input.message;

      if (input.isAiEnhanced) {
        const { text } = await ai.generate({
          prompt: `You are an expert copywriter for a gaming platform.
          Rewrite and enhance the following announcement message to make it more engaging, clear, and exciting.
          The original message is: "${input.message}"
          Keep the core meaning, but improve the tone and style.
          The final output should be only the rewritten message text.`,
        });
        finalMessage = text;
      }

      // We will now call the tool for each participant with the final message
      const toolPromises = participants.map(participant =>
        sendEmailTool({
          to: participant.email,
          subject: input.subject,
          body: `Привет, ${participant.name}!\n\n${finalMessage}`
        })
      );
      
      await Promise.all(toolPromises);

      return { success: true };

    } catch (e: any) {
      console.error('Flow Error:', e);
      return { success: false, error: e.message || 'An unknown error occurred.' };
    }
  }
);

export async function sendTournamentAnnouncement(input: SendTournamentAnnouncementInput): Promise<SendTournamentAnnouncementOutput> {
  return await announcementFlow(input);
}
