
'use server';
/**
 * @fileOverview Generates a short promo video for a tournament using Veo.
 *
 * - generateTournamentPromo - A function that handles the video generation process.
 */

import {ai} from '@/shared/api/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {
  GenerateTournamentPromoInputSchema,
  GenerateTournamentPromoOutputSchema,
  type GenerateTournamentPromoInput,
  type GenerateTournamentPromoOutput,
} from './schemas/tournament-promo-schema';

export async function generateTournamentPromo(
  input: GenerateTournamentPromoInput
): Promise<GenerateTournamentPromoOutput> {
  return generateTournamentPromoFlow(input);
}

const generateTournamentPromoFlow = ai.defineFlow(
  {
    name: 'generateTournamentPromoFlow',
    inputSchema: GenerateTournamentPromoInputSchema,
    outputSchema: GenerateTournamentPromoOutputSchema,
  },
  async ({tournamentName, tournamentDescription}) => {
    
    // Construct a more detailed prompt for better video quality
    const prompt = `Create a dynamic and exciting 5-second promo video for a sports tournament.
    Tournament Name: "${tournamentName}"
    Description: "${tournamentDescription}"
    Style: Cinematic, epic, high-energy, with fast cuts. Focus on the thrill of competition.`;

    let {operation} = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait for the operation to complete
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error(
        'Failed to generate video: ' + (operation.error.message || 'Unknown error')
      );
    }
    
    const videoPart = operation.output?.message?.content.find(p => !!p.media);
    if (!videoPart || !videoPart.media?.url) {
      throw new Error('Failed to find the generated video in the operation result');
    }
    
    // The media URL from Veo is temporary. We need to fetch it and convert to a data URI.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
    }

    const fetch = (await import('node-fetch')).default;
    const videoDownloadResponse = await fetch(
      `${videoPart.media.url}&key=${apiKey}`
    );

    if (!videoDownloadResponse.ok) {
        throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
    }

    const videoBuffer = await videoDownloadResponse.buffer();
    const videoDataUri = `data:${videoPart.media.contentType || 'video/mp4'};base64,${videoBuffer.toString('base64')}`;

    return {videoDataUri};
  }
);
