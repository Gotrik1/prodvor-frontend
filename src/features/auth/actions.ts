'use server';

import { z } from 'zod';
import { sdkLoginJSON } from '@/shared/api/sdkClient';

const LoginSchema = z.object({
  email: z.string().email("Неверный формат email."),
  password: z.string().min(1, "Пароль не может быть пустым"),
});

export async function loginAction(input: unknown) {
  try {
    const validatedFields = LoginSchema.parse(input);
    const data = await sdkLoginJSON(validatedFields);
    return { success: true, data };
  } catch (error: any) {
    if (error.isAxiosError && error.response) {
      // Бэкенд возвращает ошибку в поле message
      return { success: false, error: error.response.data.message || 'Ошибка входа' };
    }
    if (error instanceof z.ZodError) {
      // Ошибки валидации Zod
      return { success: false, error: 'Неверный формат данных.' };
    }
    // Другие непредвиденные ошибки
    console.error('[Login Action Error]', error);
    return { success: false, error: 'Произошла непредвиденная ошибка.' };
  }
}
