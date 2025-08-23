
import { z } from 'zod';

// --- Schemas for analyze-match-video.ts ---

export const AnalyzeMatchVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a sports match, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(), // Make optional to support embedded analysis without video
  prompt: z.string().describe('A specific question or prompt for the AI to focus on during analysis.'),
});
export type AnalyzeMatchVideoInput = z.infer<typeof AnalyzeMatchVideoInputSchema>;

export const AnalyzeMatchVideoOutputSchema = z.object({
  analysis: z.string().optional(),
  error: z.string().optional(),
});
export type AnalyzeMatchVideoOutput = z.infer<typeof AnalyzeMatchVideoOutputSchema>;


// --- Schemas for ask-rules-expert.ts ---

export const AskRulesExpertInputSchema = z.object({
  question: z.string().describe("The user's question about sports rules."),
});
export type AskRulesExpertInput = z.infer<typeof AskRulesExpertInputSchema>;


export const AskRulesExpertOutputSchema = z.object({
  answer: z.string().describe("A clear and concise answer to the user's question."),
  source: z.string().optional().describe("The specific rule or document the answer is based on."),
  error: z.string().optional(),
});
export type AskRulesExpertOutput = z.infer<typeof AskRulesExpertOutputSchema>;
