import { Configuration } from '@/shared/api/sdk';
import * as SDK from '@/shared/api/sdk';
import { http } from './http';

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Instantiate all available API classes from the SDK
const apiClasses = Object.entries(SDK).filter(
    ([name, value]) => typeof value === 'function' && name.endsWith('Api')
);

type SdkType = {
    [key: string]: InstanceType<any>;
};

export const sdk: SdkType = apiClasses.reduce((acc, [name, ApiClass]) => {
    // a key for the sdk object, e.g. 'users' from 'UsersApi'
    const key = name.charAt(0).toLowerCase() + name.slice(1).replace('Api', '');
    acc[key] = new (ApiClass as any)(config, undefined, http);
    return acc;
}, {} as SdkType);


/** Wrapper for login to ensure typing is smoother */
export async function sdkLoginJSON(body: { email: string; password: string }) {
  const authApi = sdk.auth || sdk.default;
  if (!authApi) {
    throw new Error('AuthApi or DefaultApi not found in SDK client.');
  }

  const candidateNames = [
    'login',
    'authLogin',
    'loginPost',
    'apiV1AuthLoginPost',
    'postApiV1AuthLogin',
  ];
  for (const m of candidateNames) {
    if (typeof (authApi as any)[m] === 'function') {
      const response = await (authApi as any)[m](body);
      return response.data;
    }
  }
  throw new Error(`Login method not found in class ${authApi.constructor.name}. Available methods: ${Object.getOwnPropertyNames(
    Object.getPrototypeOf(authApi)
  ).join(', ')}`);
}
