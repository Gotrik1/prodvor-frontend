
/**
 * @fileOverview Defines the Zod schemas and TypeScript types for the tournament promo generation feature.
 */
import {z} from 'genkit';

export const GenerateTournamentPromoInputSchema = z.object({
  tournamentName: z.string().describe('The name of the tournament.'),
  tournamentDescription: z.string().optional().describe('A short description of the tournament.'),
});
export type GenerateTournamentPromoInput = z.infer<
  typeof GenerateTournamentPromoInputSchema
>;

export const GenerateTournamentPromoOutputSchema = z.object({
  videoDataUri: z.string().nullable().describe('The data URI of the generated promo video.'),
  error: z.string().optional().describe('An optional error message if generation failed.'),
});
export type GenerateTournamentPromoOutput = z.infer<
  typeof GenerateTournamentPromoOutputSchema
>;
