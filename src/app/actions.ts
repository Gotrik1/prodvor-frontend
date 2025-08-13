"use server";

import {
  generateTeamLogoVariations,
  type GenerateTeamLogoVariationsInput,
} from "@/widgets/logo-generator/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";

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

export async function generateNewsDigestAction() {
  try {
    const result = await generateNewsDigest();
    return result;
  } catch (error) {
    console.error("Error generating news digest:", error);
    return { title: "Ошибка", content: "Не удалось загрузить новостную сводку.", error: true };
  }
}
