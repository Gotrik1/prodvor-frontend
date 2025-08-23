
"use server";

import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement } from "@/shared/api/send-tournament-announcement";
import { generateTournamentImage, type GenerateTournamentImageInput } from "@/shared/api/generate-tournament-image";
import { generateTournamentPromo, type GenerateTournamentPromoInput } from "@/shared/api/generate-tournament-promo";
import { analyzeMatchVideo, AnalyzeMatchVideoInputSchema, AnalyzeMatchVideoOutput } from "@/shared/api/analyze-match-video";
import { askRulesExpert, AskRulesExpertInput, AskRulesExpertOutput } from "@/shared/api/ask-rules-expert";
import { users } from "@/mocks"; // Mock user data for access control

import type { LogoGenerationInput } from "@/widgets/logo-generator/ui/logo-generator";
import type { SendTournamentAnnouncementInput } from "@/views/tournaments/manage/ui/tabs/announcements-tab";


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

export async function analyzeMatchVideoAction(input: unknown): Promise<AnalyzeMatchVideoOutput> {
    // 1. Validate input on the server
    const validation = AnalyzeMatchVideoInputSchema.safeParse(input);
    if (!validation.success) {
        return { error: "Неверные входные данные." };
    }
    const validatedInput = validation.data;

    // 2. Enforce access control on the server
    // This is a mock implementation. In a real app, you'd get the current user from the session.
    const currentUser = users.find(u => u.role === 'Тренер'); // Mocking a PRO user for demonstration
    const proRoles = ['Тренер', 'Менеджер', 'Администратор'];
    
    if (!currentUser || !proRoles.includes(currentUser.role)) {
        return { error: "У вас нет доступа к этой функции." };
    }
    
    // 3. Proceed with the action
    return await analyzeMatchVideo(validatedInput);
}

export async function askRulesExpertAction(input: AskRulesExpertInput): Promise<AskRulesExpertOutput> {
    return await askRulesExpert(input);
}
