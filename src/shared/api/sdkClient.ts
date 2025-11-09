import { Configuration } from '@/shared/api/sdk';
import * as SDK from '@/shared/api/sdk';
import { http } from './http';

/**
 * In different generator versions, classes can be named:
 *  - DefaultApi
 *  - AuthApi / AuthenticationApi
 *  - UsersApi / PlaygroundsApi / ...
 *  Below is a universal selection of the first available *Api class.
 */
function pickApiCtor(): new (...args: any[]) => any {
  const prefer = ['AuthApi', 'AuthenticationApi', 'DefaultApi', 'Api'];
  for (const name of prefer) {
    if ((SDK as any)[name]) return (SDK as any)[name] as any;
  }
  const anyApi =
    Object.values(SDK).find(
      (v: any) => typeof v === 'function' && (v.name?.endsWith('Api') || v.name?.endsWith('API'))
    ) ||
    // sometimes it's exported in default
    ((SDK as any).default && typeof (SDK as any).default === 'function' ? (SDK as any).default : null);

  if (!anyApi) {
    // This part is crucial for debugging if the SDK structure changes unexpectedly.
    const availableExports = Object.keys(SDK).join(', ');
    console.error(`Could not find any *Api class in the generated SDK. Available exports: ${availableExports}`);
    throw new Error(`Could not find any *Api class in the SDK.`);
  }
  return anyApi as any;
}


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
  // Method can be named differently: apiV1AuthLoginPost / login / loginPost ...
  const candidateNames = [
    'login',
    'authLogin',
    'loginPost',
    'apiV1AuthLoginPost',
    'postApiV1AuthLogin',
  ];
  for (const m of candidateNames) {
    if (typeof (authApi as any)[m] === 'function') {
      // The generated method expects the body as the first argument.
      // The second argument for options (like headers) might not be needed if `http` instance handles it.
      return (authApi as any)[m](body).then((r: any) => r.data);
    }
  }
  throw new Error(`Login method not found in class ${authApi.constructor.name}. Available methods: ${Object.getOwnPropertyNames(
    Object.getPrototypeOf(authApi)
  ).join(', ')}`);
}
