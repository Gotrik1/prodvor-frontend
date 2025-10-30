
/**
 * @fileOverview Generates a promotional image for a tournament.
 */
import { z } from 'zod';

export const GenerateTournamentImageInputSchema = z.object({
  prompt: z.string().describe("A detailed text description for the tournament promotional image."),
});
export type GenerateTournamentImageInput = z.infer<typeof GenerateTournamentImageInputSchema>;


export async function generateTournamentImage(input: GenerateTournamentImageInput): Promise<GenerateTournamentImageOutput> {
  console.log("Mocking tournament image generation for prompt:", input.prompt);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return a placeholder image URL, which the component can handle.
  const placeholderUrl = 'https://placehold.co/1920x1080.png';
  
  return { imageDataUri: placeholderUrl };
}

export const GenerateTournamentImageOutputSchema = z.object({
  imageDataUri: z.string().optional(),
  error: z.string().optional(),
});
export type GenerateTournamentImageOutput = z.infer<typeof GenerateTournamentImageOutputSchema>;
