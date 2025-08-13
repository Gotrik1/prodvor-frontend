'use server';
/**
 * @fileOverview Generates a news digest about backyard sports.
 *
 * - generateNewsDigest - A function that generates the news digest.
 * - GenerateNewsDigestOutput - The return type for the generateNewsDigest function.
 */

import {ai} from '@/shared/api/genkit';
import {z} from 'genkit';

const GenerateNewsDigestOutputSchema = z.object({
  title: z.string().describe('The title of the news digest.'),
  content: z.string().describe('The content of the news digest in a few sentences.'),
});
export type GenerateNewsDigestOutput = z.infer<
  typeof GenerateNewsDigestOutputSchema
>;

export async function generateNewsDigest(): Promise<GenerateNewsDigestOutput> {
  return generateNewsDigestFlow();
}

const prompt = ai.definePrompt({
    name: 'generateNewsDigestPrompt',
    output: {schema: GenerateNewsDigestOutputSchema},
    prompt: `You are a sports news analyst for a platform called ProDvor, which is dedicated to amateur and backyard sports.

    Generate a short, engaging news digest about recent or fictional interesting events in the world of amateur sports (like backyard football, street basketball, etc.).
    
    The tone should be slightly humorous and exciting. Mention fictional teams or players to make it more lively.
    
    Come up with a catchy title and a few sentences for the content.
    
    Example:
    Title: "Night Snipers" Clinch Victory in a Rooftop Showdown!
    Content: The "Night Snipers" basketball team snatched victory from the "Asphalt Kings" in a dramatic rooftop final. The winning shot was made by 'Air' Alex just seconds before the final whistle! Is this the start of a new dynasty?`
});


const generateNewsDigestFlow = ai.defineFlow(
  {
    name: 'generateNewsDigestFlow',
    outputSchema: GenerateNewsDigestOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
