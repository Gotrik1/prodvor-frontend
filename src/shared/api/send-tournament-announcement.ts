
'use server';
/**
 * @fileOverview Sends a tournament announcement.
 */

// This is a stub implementation to avoid breaking the app.
// The original Genkit implementation is temporarily disabled.

export async function sendTournamentAnnouncement(input: { tournamentId: string, subject: string, message: string }) {
  console.log("AI function 'sendTournamentAnnouncement' is temporarily disabled.");
   // Return a structure that matches what the frontend expects, but with an error state.
  return {
    success: false,
    error: "Функция отправки анонсов временно недоступна.",
  };
}
