
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
  message: z.string().describe('The content of the announcement message.'),
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

      const { output } = await ai.generate({
        prompt: `
          You are a helpful assistant for the ProDvor platform.
          Your task is to send an announcement to all tournament participants.
          Use the sendEmail tool for each participant.
          The subject is: "${input.subject}"
          The message is: "${input.message}"
          The list of participants is: ${JSON.stringify(participants)}
        `,
        tools: [sendEmailTool],
      });

      // The AI will call the tool, but we confirm success here.
      // In a more robust implementation, we would check the tool outputs.
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
