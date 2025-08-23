
"use server";

import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import { generateNewsDigest } from "@/shared/api/generate-news-digest";
import { sendTournamentAnnouncement } from "@/shared/api/send-tournament-announcement";
import { generateTournamentImage, type GenerateTournamentImageInput } from "@/shared/api/generate-tournament-image";
import { generateTournamentPromo, type GenerateTournamentPromoInput } from "@/shared/api/generate-tournament-promo";
import { analyzeMatchVideo } from "@/shared/api/analyze-match-video";
import { askRulesExpert } from "@/shared/api/ask-rules-expert";
import { users } from "@/mocks"; // Mock user data for access control
import { AnalyzeMatchVideoInputSchema, type AnalyzeMatchVideoOutput, AskRulesExpertInputSchema, type AskRulesExpertOutput } from "@/shared/lib/schemas";


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
    const validation = AnalyzeMatchVideoInputSchema.safeParse(input);
    if (!validation.success) {
        return { error: "Неверные входные данные." };
    }
    const validatedInput = validation.data;

    // This is a mock for the currently logged-in user. In a real app, you'd get this from the session.
    const currentUser = users.find(u => u.role === 'Тренер'); // Simulating a PRO user
    const proRoles = ['Тренер', 'Менеджер', 'Администратор'];
    
    if (!currentUser || !proRoles.includes(currentUser.role)) {
        return { error: "У вас нет доступа к этой функции." };
    }
    
    return await analyzeMatchVideo(validatedInput);
}

export async function askRulesExpertAction(input: unknown): Promise<AskRulesExpertOutput> {
    const validation = AskRulesExpertInputSchema.safeParse(input);
    if (!validation.success) {
        return { answer: 'Произошла ошибка валидации запроса.', error: "Неверные входные данные." };
    }
    return await askRulesExpert(validation.data);
}
