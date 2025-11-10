
'use server';

import { z } from 'zod';
import { httpPublic } from '@/shared/api/http';

const LoginSchema = z.object({
  email: z.string().email("Неверный формат email."),
  password: z.string().min(1, "Пароль не может быть пустым."),
});

export async function loginAction(input: unknown) {
  try {
    const validatedFields = LoginSchema.parse(input);
    const { data } = await httpPublic.post('/api/v1/auth/login', validatedFields, {
      headers: { 'Content-Type': 'application/json' },
    });
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
