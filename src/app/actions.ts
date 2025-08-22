
"use server";

import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import type { LogoGenerationInput } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement } from "@/shared/api/send-tournament-announcement";
import type { SendTournamentAnnouncementInput } from "@/shared/api/send-tournament-announcement";
import { generateTournamentImage } from "@/shared/api/generate-tournament-image";
import type { GenerateTournamentImageInput } from "@/shared/api/generate-tournament-image";
import { generateTournamentPromo } from "@/shared/api/generate-tournament-promo";
import type { GenerateTournamentPromoInput } from "@/shared/api/generate-tournament-promo";
import { analyzeMatchVideo } from "@/shared/api/analyze-match-video";
import type { AnalyzeMatchVideoInput, AnalyzeMatchVideoOutput } from "@/shared/api/analyze-match-video";
import { askRulesExpert } from "@/shared/api/ask-rules-expert";
import type { AskRulesExpertInput } from "@/shared/api/ask-rules-expert";


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
