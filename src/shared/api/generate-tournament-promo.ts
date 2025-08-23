
'use server';
/**
 * @fileOverview Generates a promotional video for a tournament.
 */
import { z } from 'zod';

export const GenerateTournamentPromoInputSchema = z.object({
  tournamentName: z.string().describe("The name of the tournament."),
  tournamentGame: z.string().describe("The game or discipline of the tournament.")
});
export type GenerateTournamentPromoInput = z.infer<typeof GenerateTournamentPromoInputSchema>;

export async function generateTournamentPromo(input: GenerateTournamentPromoInput): Promise<GenerateTournamentPromoOutput> {
  console.log("Mocking tournament promo generation for:", input.tournamentName);
  // Simulate a long delay for video generation
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  return { 
      error: "Функция генерации видео временно недоступна в этом прототипе." 
  };
}

export const GenerateTournamentPromoOutputSchema = z.object({
  videoDataUri: z.string().optional(),
  error: z.string().optional(),
});
export type GenerateTournamentPromoOutput = z.infer<typeof GenerateTournamentPromoOutputSchema>;
