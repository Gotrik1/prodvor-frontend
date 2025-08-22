
'use server';
/**
 * @fileOverview An AI agent that answers questions about sports rules.
 *
 * - askRulesExpert - A function that handles the question-answering process.
 * - AskRulesExpertInput - The input type for the function.
 * - AskRulesExpertOutput - The return type for the function.
 */
import { z } from 'zod';
import { ai } from '@/ai/genkit';
import type { AskRulesExpertInput, AskRulesExpertOutput } from '@/views/referee-center/ui/index';


const AskRulesExpertInputSchema = z.object({
  question: z.string().describe("The user's question about sports rules."),
});

const AskRulesExpertOutputSchema = z.object({
  answer: z.string().describe("A clear and concise answer to the user's question."),
  source: z.string().optional().describe("The specific rule or document the answer is based on."),
});

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
        console.log("Mocking Genkit rules expert for question:", input.question);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // This is a mock implementation that simulates a call to an LLM
        // and provides a canned response for a specific question.
        if (input.question.toLowerCase().includes('офсайд')) {
            return {
                answer: "В мини-футболе (футзале) положение 'вне игры' (офсайд) отсутствует. Игрок может находиться в любой точке площадки в любой момент времени.",
                source: "Правила мини-футбола (Футзала)"
            };
        }

        return { 
            answer: "Я — моковая версия AI-Консультанта, использующая Genkit. В реальной версии я бы дал точный ответ на ваш вопрос. Сейчас я могу ответить только на вопрос про офсайд в мини-футболе.",
            source: "N/A"
        };
    }
);


export async function askRulesExpert(input: AskRulesExpertInput): Promise<AskRulesExpertOutput> {
  return await askRulesExpertFlow(input);
}
