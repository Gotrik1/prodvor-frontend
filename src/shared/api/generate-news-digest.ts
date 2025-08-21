
'use server';
/**
 * @fileOverview Generates a news digest based on recent platform activity.
 *
 * - generateNewsDigest - A function that handles the digest generation.
 * - NewsDigestOutput - The return type for the function.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';
import { posts, tournaments, teams } from '@/mocks';

const NewsDigestOutputSchema = z.object({
  digest: z.object({
    title: z.string().describe("A catchy headline for the news digest."),
    summary: z.string().describe("A short, engaging summary of the main news."),
    highlights: z.array(z.string()).describe("A list of 3-4 key highlights or bullet points."),
  }).nullable(),
  success: z.boolean(),
  error: z.string().optional(),
});
export type NewsDigestOutput = z.infer<typeof NewsDigestOutputSchema>;


const newsDigestFlow = ai.defineFlow(
  {
    name: 'newsDigestFlow',
    inputSchema: z.void(),
    outputSchema: NewsDigestOutputSchema,
  },
  async () => {
    try {
      // In a real app, this data would come from a database query.
      // We are using mocks to simulate fetching recent activity.
      const recentPosts = posts.slice(0, 2);
      const activeTournaments = tournaments.filter(t => t.status === 'РЕГИСТРАЦИЯ' || t.status === 'ИДЕТ').slice(0, 2);
      const topTeams = teams.slice(0, 3);
      
      const promptContext = `
        Here is the latest activity on the ProDvor platform:

        Recent Posts:
        ${recentPosts.map(p => `- ${p.author.nickname}: "${p.content}"`).join('\n')}

        Active Tournaments:
        ${activeTournaments.map(t => `- ${t.name} (${t.game}): Status - ${t.status}, ${t.participants}/${t.maxParticipants} participants.`).join('\n')}
        
        Top Teams by Rating:
        ${topTeams.map(t => `- ${t.name} (Rank: ${t.rank})`).join('\n')}
      `;

      const { output } = await ai.generate({
        prompt: `You are a sports news analyst for the ProDvor platform.
        Your task is to create an engaging news digest based on the provided recent activity.
        Analyze the context and generate a title, a summary, and a few bullet points for the highlights.
        The tone should be exciting and encourage users to engage with the platform.
        The language must be Russian.

        Context:
        ${promptContext}
        `,
        output: {
          schema: NewsDigestOutputSchema.shape.digest,
        },
      });

      if (!output) {
        throw new Error("AI failed to generate a digest.");
      }
      
      return { digest: output, success: true };

    } catch (e: unknown) {
      console.error("News Digest Flow Error:", e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      return { digest: null, success: false, error: errorMessage };
    }
  }
);


export async function generateNewsDigest(): Promise<NewsDigestOutput> {
  return await newsDigestFlow();
}
