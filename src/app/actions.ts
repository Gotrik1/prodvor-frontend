
"use server";

import { generateTeamLogoVariations, type LogoGenerationInput } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement, type SendTournamentAnnouncementInput } from "@/shared/api/send-tournament-announcement";
import { generateTournamentImage, type GenerateTournamentImageInput } from "@/shared/api/generate-tournament-image";
import { generateTournamentPromo, type GenerateTournamentPromoInput } from "@/shared/api/generate-tournament-promo";
import { analyzeMatchVideo, type AnalyzeMatchVideoInput, type AnalyzeMatchVideoOutput } from "@/shared/api/analyze-match-video";
import { askRulesExpert, type AskRulesExpertInput } from "@/shared/api/ask-rules-expert";


export async function generateLogosAction(
  input: LogoGenerationInput
) {
    return await generateTeamLogoVariations(input);
}

export async function generateNewsDigestAction() {
    return await generateNewsDigest();
}


export async function sendTournamentAnnouncementAction(input: SendTournamentAnnouncementInput) {
    return await sendTournamentAnnouncement(input);
}

export async function generateTournamentImageAction(input: GenerateTournamentImageInput) {
  return await generateTournamentImage(input);
}

export async function generateTournamentPromoAction(input: GenerateTournamentPromoInput) {
    return await generateTournamentPromo(input);
}

export async function analyzeMatchVideoAction(input: AnalyzeMatchVideoInput): Promise<AnalyzeMatchVideoOutput> {
    return await analyzeMatchVideo(input);
}

export async function askRulesExpertAction(input: AskRulesExpertInput) {
    return await askRulesExpert(input);
}

