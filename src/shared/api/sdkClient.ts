
import { Configuration } from '@/shared/api/sdk';
import * as SDK from '@/shared/api/sdk';
import { httpAuth, httpPublic } from './http';

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const apiClasses = Object.entries(SDK).filter(
    ([name, value]) => typeof value === 'function' && name.endsWith('Api')
);

type SdkType = {
    [key: string]: InstanceType<any>;
};

export const sdk: SdkType = apiClasses.reduce((acc, [name, ApiClass]) => {
    const key = name.charAt(0).toLowerCase() + name.slice(1).replace('Api', '');
    // Используем httpAuth, который умеет подставлять токен на клиенте
    acc[key] = new (ApiClass as any)(config, undefined, httpAuth);
    return acc;
}, {} as SdkType);

export async function sdkLoginJSON(body: { email: string; password: string }) {
  const response = await httpPublic.post('/api/v1/auth/login', body);
  return response.data;
}
