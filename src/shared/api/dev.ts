import { config } from 'dotenv';
config();

import '@/shared/api/generate-team-logo-variations.ts';
import '@/shared/api/generate-news-digest.ts';
import '@/shared/api/send-tournament-announcement.ts';
