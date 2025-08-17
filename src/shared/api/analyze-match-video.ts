
'use server';
/**
 * @fileOverview Analyzes a match video using a multimodal AI model.
 *
 * - analyzeMatchVideo - A function that handles the video analysis.
 * - AnalyzeMatchVideoInput - The input type for the function.
 * - AnalyzeMatchVideoOutput - The return type for the function.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';

const AnalyzeMatchVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a sports match, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('A specific question or prompt for the AI to focus on during analysis.'),
});
export type AnalyzeMatchVideoInput = z.infer<typeof AnalyzeMatchVideoInputSchema>;

const AnalyzeMatchVideoOutputSchema = z.object({
  analysis: z.string().optional(),
  error: z.string().optional(),
});
export type AnalyzeMatchVideoOutput = z.infer<typeof AnalyzeMatchVideoOutputSchema>;


const analyzeVideoFlow = ai.defineFlow(
  {
    name: 'analyzeVideoFlow',
    inputSchema: AnalyzeMatchVideoInputSchema,
    outputSchema: AnalyzeMatchVideoOutputSchema,
  },
  async ({ videoDataUri, prompt }) => {
    try {
      const { text } = await ai.generate({
        prompt: [
          {
            text: `You are an expert sports analyst. Your task is to analyze the provided sports match video and answer the user's query.
            Provide a detailed, structured analysis. Use markdown for formatting. Be insightful and offer tactical advice where appropriate.
            
            User's query: "${prompt}"`,
          },
          { media: { url: videoDataUri } },
        ],
      });

      return { analysis: text };
    } catch (e: any) {
      console.error('Flow Error:', e);
      return { error: e.message || 'An unknown error occurred during video analysis.' };
    }
  }
);

export async function analyzeMatchVideo(input: AnalyzeMatchVideoInput): Promise<AnalyzeMatchVideoOutput> {
  // Add a delay to simulate a longer processing time for video
  await new Promise(resolve => setTimeout(resolve, 2000));
  return await analyzeVideoFlow(input);
}
