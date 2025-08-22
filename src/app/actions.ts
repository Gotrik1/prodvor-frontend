
"use server";

import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement } from "@/shared/api/send-tournament-announcement";
import { generateTournamentImage } from "@/shared/api/generate-tournament-image";
import { generateTournamentPromo } from "@/shared/api/generate-tournament-promo";
import { analyzeMatchVideo } from "@/shared/api/analyze-match-video";
import { askRulesExpert } from "@/shared/api/ask-rules-expert";

import type { LogoGenerationInput } from "@/widgets/logo-generator/ui/logo-generator";
import type { SendTournamentAnnouncementInput } from "@/views/tournaments/manage/ui/tabs/announcements-tab";
import type { GenerateTournamentImageInput } from "@/views/tournaments/manage/ui/tabs/promo-tab";
import type { GenerateTournamentPromoInput } from "@/views/tournaments/manage/ui/tabs/promo-tab";
import type { AnalyzeMatchVideoInput, AnalyzeMatchVideoOutput } from "@/views/analysis/match/ui/index";
import type { AskRulesExpertInput } from "@/views/referee-center/ui/index";


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
