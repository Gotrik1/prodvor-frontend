
'use server';
/**
 * @fileOverview Analyzes a match video using a multimodal AI model.
 *
 * - analyzeMatchVideo - A function that handles the video analysis.
 * - AnalyzeMatchVideoInput - The input type for the function.
 * - AnalyzeMatchVideoOutput - The return type for the function.
 */
import { z } from 'zod';
import { ai } from '@/ai/genkit';

const AnalyzeMatchVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a sports match, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(), // Make optional to support embedded analysis without video
  prompt: z.string().describe('A specific question or prompt for the AI to focus on during analysis.'),
});

export type AnalyzeMatchVideoInput = z.infer<typeof AnalyzeMatchVideoInputSchema>;

const AnalyzeMatchVideoOutputSchema = z.object({
  analysis: z.string().optional(),
  error: z.string().optional(),
});

export type AnalyzeMatchVideoOutput = z.infer<typeof AnalyzeMatchVideoOutputSchema>;


const analysisPrompt = ai.definePrompt({
    name: 'videoAnalysisPrompt',
    input: { schema: AnalyzeMatchVideoInputSchema },
    output: { schema: z.string() },
    prompt: `
        Analyze the provided sports match video (if available) and address the user's prompt.
        If no video is provided, analyze the tactical situation based on the prompt alone.
        
        User's prompt: {{{prompt}}}
        
        {{#if videoDataUri}}
        Video for analysis:
        {{media url=videoDataUri}}
        {{/if}}
        
        Provide a concise analysis based on the user's query, highlighting key tactical moments, player performance, or any other relevant aspects.
        Format your response in Markdown.
    `,
});

const analyzeMatchVideoFlow = ai.defineFlow(
  {
    name: 'analyzeMatchVideoFlow',
    inputSchema: AnalyzeMatchVideoInputSchema,
    outputSchema: AnalyzeMatchVideoOutputSchema,
  },
  async (input) => {
    // In a real implementation, you would use a model that supports video analysis.
    // For this prototype, we will return a detailed mock analysis.
    console.log("Mocking Genkit video analysis for prompt:", input.prompt);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis = `
## Краткий обзор матча

Матч прошел в напряженной борьбе с обилием острых моментов. **Красные Ястребы** продемонстрировали отличную командную игру и прессинг, в то время как **Синие Тигры** полагались на индивидуальное мастерство и быстрые контратаки.

### Ключевые моменты
- **15'** - Опасный штрафной в исполнении Синих Тигров, вратарь на высоте.
- **32'** - Красные Ястребы открывают счет после затяжной атаки.
- **58'** - Синие Тигры сравнивают счет благодаря быстрой контратаке.
- **75'** - Спорный момент в штрафной Красных Ястребов, судья не назначил пенальти.

### Тактические советы
**Для Красных Ястребов:**
- Продолжайте использовать высокий прессинг, это приносит плоды.
- Обратите внимание на оборону при контратаках соперника, оставляете слишком много свободных зон.

**Для Синих Тигров:**
- Улучшите реализацию моментов. У вас было несколько отличных шансов.
- Попробуйте использовать больше фланговых атак, центр обороны соперника очень плотный.
    `;
    
    return { analysis: mockAnalysis };
  }
);


export async function analyzeMatchVideo(input: AnalyzeMatchVideoInput): Promise<AnalyzeMatchVideoOutput> {
  return await analyzeMatchVideoFlow(input);
}
