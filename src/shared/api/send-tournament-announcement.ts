'use server';
/**
 * @fileOverview Sends an announcement to all tournament participants.
 *
 * - sendTournamentAnnouncement - A function that handles sending the announcement.
 */

import {ai} from '@/shared/api/genkit';
import { SendTournamentAnnouncementInputSchema, SendTournamentAnnouncementOutputSchema, type SendTournamentAnnouncementInput, type SendTournamentAnnouncementOutput } from './schemas/tournament-announcement-schema';

export async function sendTournamentAnnouncement(
  input: SendTournamentAnnouncementInput
): Promise<SendTournamentAnnouncementOutput> {
  return sendTournamentAnnouncementFlow(input);
}

const sendTournamentAnnouncementFlow = ai.defineFlow(
  {
    name: 'sendTournamentAnnouncementFlow',
    inputSchema: SendTournamentAnnouncementInputSchema,
    outputSchema: SendTournamentAnnouncementOutputSchema,
  },
  async input => {
    // In a real application, this is where you would integrate with an
    // email/notification service to send the message to all participants.
    console.log('Sending announcement for tournament:', input.tournamentId);
    console.log('Subject:', input.subject);
    console.log('Message:', input.message);
    
    // For now, we just simulate a successful send.
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {success: true};
  }
);
