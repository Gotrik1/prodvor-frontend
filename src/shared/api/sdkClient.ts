import { Configuration } from '@/shared/api/sdk';
import * as SDK from '@/shared/api/sdk';
import { http } from './http';

const config = new Configuration({ basePath: process.env.NEXT_PUBLIC_API_BASE_URL });

// All API classes are instantiated here, using the shared http client for requests.
export const sdk = {
  auth: new SDK.AuthApi(config, undefined, http),
  users: new SDK.UsersApi(config, undefined, http),
  teams: new SDK.TeamsApi(config, undefined, http),
  tournaments: new SDK.TournamentsApi(config, undefined, http),
  playgrounds: new SDK.PlaygroundsApi(config, undefined, http),
  posts: new SDK.PostsApi(config, undefined, http),
  sports: new SDK.SportsApi(config, undefined, http),
  uploads: new SDK.UploadsApi(config, undefined, http),
  default: new SDK.DefaultApi(config, undefined, http),
};
