'use server';
/**
 * @fileOverview Generates variations of a team logo using AI image generation.
 *
 * - generateTeamLogoVariations - A function that generates logo variations.
 * - GenerateTeamLogoVariationsInput - The input type for the generateTeamLogoVariations function.
 * - GenerateTeamLogoVariationsOutput - The return type for the generateTeamLogoVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTeamLogoVariationsInputSchema = z.object({
  logoDescription: z
    .string()
    .describe('A description of the desired team logo.'),
});
export type GenerateTeamLogoVariationsInput = z.infer<
  typeof GenerateTeamLogoVariationsInputSchema
>;

const GenerateTeamLogoVariationsOutputSchema = z.object({
  logoDataUris: z
    .array(z.string())
    .describe('An array of data URIs of the generated logo variations.'),
});
export type GenerateTeamLogoVariationsOutput = z.infer<
  typeof GenerateTeamLogoVariationsOutputSchema
>;

export async function generateTeamLogoVariations(
  input: GenerateTeamLogoVariationsInput
): Promise<GenerateTeamLogoVariationsOutput> {
  return generateTeamLogoVariationsFlow(input);
}

const generateTeamLogoVariationsFlow = ai.defineFlow(
  {
    name: 'generateTeamLogoVariationsFlow',
    inputSchema: GenerateTeamLogoVariationsInputSchema,
    outputSchema: GenerateTeamLogoVariationsOutputSchema,
  },
  async input => {
    const logoDataUris: string[] = [];

    // Generate 3 logo variations
    for (let i = 0; i < 3; i++) {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a team logo based on the following description: ${input.logoDescription}`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      if (media?.url) {
        logoDataUris.push(media.url);
      }
    }

    return {logoDataUris};
  }
);
