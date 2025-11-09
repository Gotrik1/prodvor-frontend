'use server';

import { z } from 'zod';
import { api } from '@/shared/api/axios-instance';

const LoginSchema = z.object({
  email: z.string().email("Неверный формат email."),
  password: z.string().min(1, "Пароль не может быть пустым"),
});

export async function loginAction(input: unknown) {
  try {
    const validatedFields = LoginSchema.parse(input);
    
    // Используем axios-инстанс, который уже настроен
    const response = await api.post('/api/v1/auth/login', validatedFields);

    return { success: true, data: response.data };

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
