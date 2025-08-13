
"use server";

import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement } from "@/shared/api/send-tournament-announcement";
// import { generateTournamentPromo } from "@/shared/api/generate-tournament-promo";


export async function generateLogosAction(
  input: any
) {
    return await generateTeamLogoVariations(input);
}

export async function generateNewsDigestAction() {
    return await generateNewsDigest();
}


export async function sendTournamentAnnouncementAction(input: any) {
    return await sendTournamentAnnouncement(input);
}

export async function generateTournamentPromoAction(input: any) {
  console.log("generateTournamentPromoAction called with:", input);
  // Returning an error state to be handled by the component.
  return { videoDataUri: null, error: "AI functionality is temporarily disabled." };
}
