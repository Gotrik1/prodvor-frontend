
'use server';
/**
 * @fileOverview Generates a promotional video for a tournament.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const GenerateTournamentPromoInputSchema = z.object({
  tournamentName: z.string().describe("The name of the tournament."),
  tournamentGame: z.string().describe("The game or discipline of the tournament.")
});
export type GenerateTournamentPromoInput = z.infer<typeof GenerateTournamentPromoInputSchema>;

const GenerateTournamentPromoOutputSchema = z.object({
  videoDataUri: z.string().optional(),
  error: z.string().optional(),
});
export type GenerateTournamentPromoOutput = z.infer<typeof GenerateTournamentPromoOutputSchema>;

const generatePromoFlow = ai.defineFlow(
  {
    name: 'generatePromoFlow',
    inputSchema: GenerateTournamentPromoInputSchema,
    outputSchema: GenerateTournamentPromoOutputSchema,
  },
  async ({ tournamentName, tournamentGame }) => {
    try {
      const prompt = `A short, epic, cinematic promotional video for a tournament called "${tournamentName}". The discipline is ${tournamentGame}. Focus on dynamic shots, intense moments, and a sense of competition.`;
      
      let { operation } = await ai.generate({
        model: 'googleai/veo-2.0-generate-001',
        prompt: prompt,
        config: {
          durationSeconds: 5,
          aspectRatio: '16:9',
        },
      });

      if (!operation) {
        throw new Error('Video generation operation failed to start.');
      }

      // Wait for the operation to complete
      while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
      }

      if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
      }

      const video = operation.output?.message?.content.find((p) => !!p.media);
      if (!video || !video.media?.url) {
        throw new Error('Generated video not found in the operation output.');
      }
      
      // The URL from Veo is a temporary download link. We need to fetch it and convert to a data URI.
      // This requires node-fetch.
      const fetch = (await import('node-fetch')).default;
      const videoDownloadResponse = await fetch(
        `${video.media.url}&key=${process.env.GEMINI_API_KEY}`
      );

      if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
        throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
      }
      
      const videoBuffer = await videoDownloadResponse.arrayBuffer();
      const videoDataUri = `data:video/mp4;base64,${Buffer.from(videoBuffer).toString('base64')}`;
      
      return { videoDataUri };

    } catch (e: any) {
      console.error('Flow Error:', e);
      return { error: e.message || 'An unknown error occurred during video generation.' };
    }
  }
);

export async function generateTournamentPromo(input: GenerateTournamentPromoInput): Promise<GenerateTournamentPromoOutput> {
  return await generatePromoFlow(input);
}
