
'use server';

import { z } from 'zod';
import { httpPublic } from '@/shared/api/http';
import axios from 'axios';

const LoginSchema = z.object({
  email: z.string().email("Неверный формат email."),
  password: z.string().min(1, "Пароль не может быть пустым."),
});

export async function loginAction(input: unknown) {
  try {
    const validatedFields = LoginSchema.parse(input);

    const params = new URLSearchParams();
    params.append('username', validatedFields.email);
    params.append('password', validatedFields.password);

    const { data } = await httpPublic.post('/api/v1/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    // After getting tokens, immediately fetch user data
    const userResponse = await httpPublic.get('/api/v1/users/me', {
        headers: {
            'Authorization': `Bearer ${data.access_token}`
        }
    });

    return { success: true, data: { ...data, user: userResponse.data } };
  } catch (error: any) {
    let errorMessage = 'Произошла непредвиденная ошибка.';
    if (axios.isAxiosError(error) && error.response) {
      // Handle validation errors from backend
      if (error.response.data && error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
            errorMessage = error.response.data.detail.map((d: any) => d.msg).join(', ');
          } else {
            errorMessage = error.response.data.detail;
          }
      } else {
        errorMessage = error.response.data.message || 'Ошибка входа. Проверьте email и пароль.';
      }
    } else if (error instanceof z.ZodError) {
      errorMessage = 'Неверный формат данных.';
    }
    console.error('[Login Action Error]', error);
    return { success: false, error: errorMessage };
  }
}
