
'use server';
/**
 * @fileOverview An AI agent that answers questions about sports rules.
 *
 * - askRulesExpert - A function that handles the question-answering process.
 */
import { ai } from '@/ai/genkit';
import { AskRulesExpertInputSchema, AskRulesExpertOutputSchema, type AskRulesExpertInput, type AskRulesExpertOutput } from '@/shared/lib/schemas';


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
