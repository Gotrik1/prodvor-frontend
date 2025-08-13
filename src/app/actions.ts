
"use server";

// All Genkit-related actions have been removed to resolve build issues.
// You can re-implement these with a different AI provider or library.

export async function generateLogosAction(
  input: any
) {
    console.log("generateLogosAction called with:", input);
    // Returning an empty array to prevent breaking the calling component.
    return { logoDataUris: [], error: "AI functionality is temporarily disabled." };
}

export async function generateNewsDigestAction() {
    console.log("generateNewsDigestAction called");
    // Returning an error state to be handled by the component.
    return { title: "Ошибка", content: "AI-дайджест временно недоступен.", error: true };
}


export async function sendTournamentAnnouncementAction(input: any) {
    console.log("sendTournamentAnnouncementAction called with:", input);
    // Returning a success state to prevent breaking the calling component.
    return { success: true };
}

export async function generateTournamentPromoAction(input: any) {
  console.log("generateTournamentPromoAction called with:", input);
  // Returning an error state to be handled by the component.
  return { videoDataUri: null, error: "AI functionality is temporarily disabled." };
}
