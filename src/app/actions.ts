
"use server";

import {
  generateTeamLogoVariations,
  type GenerateTeamLogoVariationsInput,
} from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement } from "@/shared/api/send-tournament-announcement";
import type { SendTournamentAnnouncementInput } from "@/shared/api/schemas/tournament-announcement-schema";
import { generateTournamentPromo } from "@/shared/api/generate-tournament-promo";
import type { GenerateTournamentPromoInput } from "@/shared/api/schemas/tournament-promo-schema";

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


export async function sendTournamentAnnouncementAction(input: SendTournamentAnnouncementInput) {
    try {
        const result = await sendTournamentAnnouncement(input);
        return result;
    } catch (error) {
        console.error("Error sending announcement:", error);
        return { success: false, error: "Failed to send announcement." };
    }
}

export async function generateTournamentPromoAction(input: GenerateTournamentPromoInput) {
  try {
    const result = await generateTournamentPromo(input);
    return result;
  } catch (error) {
    console.error("Error generating promo:", error);
    return { videoDataUri: null, error: "Failed to generate promo video." };
  }
}

