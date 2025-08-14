
'use server';
/**
 * @fileOverview Generates a promotional image for a tournament.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const GenerateTournamentImageInputSchema = z.object({
  prompt: z.string().describe("A detailed text description for the tournament promotional image."),
});
export type GenerateTournamentImageInput = z.infer<typeof GenerateTournamentImageInputSchema>;

const GenerateTournamentImageOutputSchema = z.object({
  imageDataUri: z.string().optional(),
  error: z.string().optional(),
});
export type GenerateTournamentImageOutput = z.infer<typeof GenerateTournamentImageOutputSchema>;

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateTournamentImageInputSchema,
    outputSchema: GenerateTournamentImageOutputSchema,
  },
  async ({ prompt }) => {
    try {
      const { media } = await ai.generate({
        model: googleAI.model('gemini-2.0-flash-preview-image-generation'),
        prompt: `Epic, high-resolution, 4k, cinematic promotional poster for a sports tournament. Style: hyper-realistic, dramatic lighting. Description: "${prompt}"`,
        config: {
          responseModalities: ['IMAGE'],
        },
      });

      if (!media?.url) {
        throw new Error('Image generation failed to return a media URL.');
      }

      return { imageDataUri: media.url };
    } catch (e: any) {
      console.error('Flow Error:', e);
      return { error: e.message || 'An unknown error occurred during image generation.' };
    }
  }
);

export async function generateTournamentImage(input: GenerateTournamentImageInput): Promise<GenerateTournamentImageOutput> {
  return await generateImageFlow(input);
}
