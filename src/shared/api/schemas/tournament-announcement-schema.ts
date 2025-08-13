/**
 * @fileOverview Defines the Zod schemas and TypeScript types for the tournament announcement feature.
 *
 * - SendTournamentAnnouncementInputSchema - The Zod schema for the input of the sendTournamentAnnouncement flow.
 * - SendTournamentAnnouncementInput - The TypeScript type inferred from the input schema.
 * - SendTournamentAnnouncementOutputSchema - The Zod schema for the output of the sendTournamentAnnouncement flow.
 * - SendTournamentAnnouncementOutput - The TypeScript type inferred from the output schema.
 */
import {z} from 'genkit';

export const SendTournamentAnnouncementInputSchema = z.object({
  tournamentId: z.string().describe("The ID of the tournament."),
  subject: z.string().min(5, { message: "Тема должна содержать не менее 5 символов." }).describe('The subject of the announcement.'),
  message: z.string().min(20, { message: "Сообщение должно содержать не менее 20 символов." }).describe('The content of the announcement message.'),
});
export type SendTournamentAnnouncementInput = z.infer<
  typeof SendTournamentAnnouncementInputSchema
>;

export const SendTournamentAnnouncementOutputSchema = z.object({
  success: z.boolean().describe('Whether the announcement was sent successfully.'),
  error: z.string().optional().describe('An optional error message if the announcement failed.'),
});
export type SendTournamentAnnouncementOutput = z.infer<
  typeof SendTournamentAnnouncementOutputSchema
>;
