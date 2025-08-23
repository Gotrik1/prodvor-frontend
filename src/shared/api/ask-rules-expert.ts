
/**
 * @fileOverview An AI agent that answers questions about sports rules.
 *
 * - askRulesExpert - A function that handles the question-answering process.
 * - AskRulesExpertInput - The input type for the function.
 * - AskRulesExpertOutput - The return type for the function.
 */
import { z } from 'zod';
import { ai } from '@/ai/genkit';

export const AskRulesExpertInputSchema = z.object({
  question: z.string().describe("The user's question about sports rules."),
});
export type AskRulesExpertInput = z.infer<typeof AskRulesExpertInputSchema>;


const AskRulesExpertOutputSchema = z.object({
  answer: z.string().describe("A clear and concise answer to the user's question."),
  source: z.string().optional().describe("The specific rule or document the answer is based on."),
  error: z.string().optional(),
});
export type AskRulesExpertOutput = z.infer<typeof AskRulesExpertOutputSchema>;


const rulesExpertPrompt = ai.definePrompt({
    name: 'rulesExpertPrompt',
    input: { schema: AskRulesExpertInputSchema },
    output: { schema: AskRulesExpertOutputSchema },
    prompt: `
        You are an expert on sports rules. Answer the user's question clearly and concisely.
        If possible, cite the source of the rule.

        Question: {{{question}}}
    `,
});

const askRulesExpertFlow = ai.defineFlow(
    {
        name: 'askRulesExpertFlow',
        inputSchema: AskRulesExpertInputSchema,
        outputSchema: AskRulesExpertOutputSchema,
    },
    async (input) => {
        const { output } = await rulesExpertPrompt(input);
        return output || { answer: 'Не удалось получить ответ от AI.', source: 'N/A' };
    }
);


export async function askRulesExpert(input: AskRulesExpertInput): Promise<AskRulesExpertOutput> {
  return await askRulesExpertFlow(input);
}
