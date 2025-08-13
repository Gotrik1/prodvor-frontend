
"use server";

import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement, SendTournamentAnnouncementInput } from "@/shared/api/send-tournament-announcement";
import { generateTournamentPromo, GenerateTournamentPromoInput } from "@/shared/api/generate-tournament-promo";


export async function generateLogosAction(
  input: any
) {
    return await generateTeamLogoVariations(input);
}

export async function generateNewsDigestAction() {
    return await generateNewsDigest();
}


export async function sendTournamentAnnouncementAction(input: SendTournamentAnnouncementInput) {
    return await sendTournamentAnnouncement(input);
}

export async function generateTournamentPromoAction(input: GenerateTournamentPromoInput) {
  return await generateTournamentPromo(input);
}
