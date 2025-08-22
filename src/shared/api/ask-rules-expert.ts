
'use server';
/**
 * @fileOverview An AI agent that answers questions about sports rules.
 *
 * - askRulesExpert - A function that handles the question-answering process.
 * - AskRulesExpertInput - The input type for the function.
 * - AskRulesExpertOutput - The return type for the function.
 */
import { z } from 'zod';

const AskRulesExpertInputSchema = z.object({
  question: z.string().describe("The user's question about sports rules."),
});
export type AskRulesExpertInput = z.infer<typeof AskRulesExpertInputSchema>;

const AskRulesExpertOutputSchema = z.object({
  answer: z.string().describe("A clear and concise answer to the user's question."),
  source: z.string().optional().describe("The specific rule or document the answer is based on."),
});
export type AskRulesExpertOutput = z.infer<typeof AskRulesExpertOutputSchema>;


export async function askRulesExpert(input: AskRulesExpertInput): Promise<AskRulesExpertOutput> {
  console.log("Mocking rules expert for question:", input.question);

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (input.question.toLowerCase().includes('офсайд')) {
      return {
          answer: "В мини-футболе (футзале) положение 'вне игры' (офсайд) отсутствует. Игрок может находиться в любой точке площадки в любой момент времени.",
          source: "Правила мини-футбола (Футзала)"
      };
  }

  return { 
    answer: "Я — моковая версия AI-Консультанта. В реальной версии я бы дал точный ответ на ваш вопрос, основываясь на базе знаний. Сейчас я могу ответить только на вопрос про офсайд в мини-футболе.",
    source: "N/A"
  };
}
