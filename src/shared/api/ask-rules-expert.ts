
'use server';
/**
 * @fileOverview An AI agent that answers questions about sports rules.
 *
 * - askRulesExpert - A function that handles the question-answering process.
 * - AskRulesExpertInput - The input type for the function.
 * - AskRulesExpertOutput - The return type for the function.
 */
import { ai } from '@/shared/lib/genkit';
import { z } from 'zod';
import { knowledgeBaseData } from '@/views/referee-center/lib/mock-data';

const AskRulesExpertInputSchema = z.object({
  question: z.string().describe("The user's question about sports rules."),
});
export type AskRulesExpertInput = z.infer<typeof AskRulesExpertInputSchema>;

const AskRulesExpertOutputSchema = z.object({
  answer: z.string().describe("A clear and concise answer to the user's question."),
  source: z.string().optional().describe("The specific rule or document the answer is based on."),
});
export type AskRulesExpertOutput = z.infer<typeof AskRulesExpertOutputSchema>;

// Convert the structured knowledge base into a simplified text format for the AI context.
const knowledgeBaseContext = knowledgeBaseData
  .map(sport => 
    `Категория: ${sport.name}\n` +
    sport.documents.map(doc => `- ${doc.title}`).join('\n')
  )
  .join('\n\n');


const rulesExpertFlow = ai.defineFlow(
  {
    name: 'rulesExpertFlow',
    inputSchema: AskRulesExpertInputSchema,
    outputSchema: AskRulesExpertOutputSchema,
  },
  async ({ question }) => {
    const { output } = await ai.generate({
      prompt: `Ты — AI-Консультант для спортивных судей на платформе ProDvor. 
      Твоя задача — давать быстрые, точные и понятные ответы на вопросы по правилам различных видов спорта, основываясь на предоставленной базе знаний.
      Ответ должен быть кратким, по существу, и, если возможно, ссылаться на конкретный документ из базы.

      Вот доступная база знаний:
      ---
      ${knowledgeBaseContext}
      ---

      Вопрос судьи: "${question}"

      Твой ответ:`,
      output: {
        schema: AskRulesExpertOutputSchema,
      },
       config: {
        temperature: 0.3, // Lower temperature for more factual answers
      }
    });

    return output || { answer: "К сожалению, я не смог найти ответ на ваш вопрос.", source: "N/A" };
  }
);


export async function askRulesExpert(input: AskRulesExpertInput): Promise<AskRulesExpertOutput> {
  return await rulesExpertFlow(input);
}
