"use server";

import {
  generateTeamLogoVariations,
  type GenerateTeamLogoVariationsInput,
} from "@/ai/flows/generate-team-logo-variations";

export async function generateLogosAction(
  input: GenerateTeamLogoVariationsInput
) {
  try {
    const result = await generateTeamLogoVariations(input);
    return result;
  } catch (error) {
    console.error("Error generating logos:", error);
    // In a real app, you might want to return a more structured error
    return { logoDataUris: [], error: "Failed to generate logos." };
  }
}
