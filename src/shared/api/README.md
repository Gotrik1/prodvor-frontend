# @/shared/api

This directory contains the auto-generated API client from our OpenAPI specification.

## How to use

Import the API classes and the configured axios instance:

```typescript
import { UsersApi, TeamsApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';

const usersApi = new UsersApi(apiConfig);
const teamsApi = new TeamsApi(apiConfig);

// Now you can call API methods
const response = await usersApi.usersGet();
```

## How to update

When the `src/docs/openapi.json` file is updated, you need to regenerate the client by running the following command in the terminal:

```bash
npx openapi-generator-cli generate -i src/docs/openapi.json -g typescript-axios -o src/shared/api
```
