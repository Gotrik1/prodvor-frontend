'use server';

import { z } from 'zod';
import { sdk } from '@/shared/api/sdkClient';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function loginAction(input: unknown) {
  try {
    const { email, password } = LoginSchema.parse(input);
  
    const res = await sdk.auth.login({ email, password });
  
    return { success: true, data: res.data };
  } catch (error: any) {
    if (error.isAxiosError && error.response) {
      return { success: false, error: error.response.data.message || 'Ошибка входа' };
    }
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Неверный формат данных.' };
    }
    return { success: false, error: 'Произошла непредвиденная ошибка.' };
  }
}
