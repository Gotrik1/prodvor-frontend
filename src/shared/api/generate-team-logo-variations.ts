
'use server';
/**
 * @fileOverview Generates logo variations for a team based on a description.
 * - generateTeamLogoVariations - A function that handles the logo generation.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const LogoGenerationInputSchema = z.object({
  logoDescription: z.string().describe("A detailed text description for a team logo."),
});

const LogoGenerationOutputSchema = z.object({
  logoDataUris: z.array(z.string()).describe("An array of 4 generated logo images as Base64 data URIs."),
  error: z.string().optional(),
});
export type LogoGenerationOutput = z.infer<typeof LogoGenerationOutputSchema>;

const logoGenerationFlow = ai.defineFlow(
  {
    name: 'logoGenerationFlow',
    inputSchema: LogoGenerationInputSchema,
    outputSchema: LogoGenerationOutputSchema,
  },
  async ({ logoDescription }) => {
    try {
      const generationPromises = Array(4).fill(null).map(() => 
        ai.generate({
          model: googleAI.model('gemini-2.0-flash-preview-image-generation'),
          prompt: `A modern, vector-style, flat SVG logo for a sports team. The logo should be on a clean, solid dark background. Description: "${logoDescription}"`,
          config: {
            responseModalities: ['IMAGE', 'TEXT'],
          },
        })
      );

      const results = await Promise.all(generationPromises);
      
      const logoDataUris = results.map(result => {
        if (!result.media?.url) {
          throw new Error('Image generation failed to return a media URL.');
        }
        return result.media.url;
      });
      
      return { logoDataUris };
    } catch (e: any) {
      console.error("Logo Generation Flow Error:", e);
      return { logoDataUris: [], error: e.message || "An unknown error occurred during logo generation." };
    }
  }
);


export async function generateTeamLogoVariations(
  input: { logoDescription: string }
): Promise<LogoGenerationOutput> {
    return await logoGenerationFlow(input);
}
