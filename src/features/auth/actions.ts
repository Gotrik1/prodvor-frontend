'use server';

import { z } from 'zod';
import { sdkLoginJSON } from '@/shared/api/sdkClient';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function loginAction(input: unknown) {
  try {
    const { email, password } = LoginSchema.parse(input);
  
    const data = await sdkLoginJSON({ email, password });
  
    return { success: true, data };
  } catch (error: any) {
    if (error.isAxiosError && error.response) {
      return { success: false, error: error.response.data.message || 'Ошибка входа' };
    }
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Неверный формат данных.' };
    }
    console.error('[Login Action Error]', error);
    return { success: false, error: 'Произошла непредвиденная ошибка.' };
  }
}
