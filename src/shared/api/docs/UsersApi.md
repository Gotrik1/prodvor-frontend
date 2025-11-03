# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1UsersGet**](#apiv1usersget) | **GET** /api/v1/users | Get all users|
|[**apiV1UsersMeGet**](#apiv1usersmeget) | **GET** /api/v1/users/me | Get current user|
|[**apiV1UsersPost**](#apiv1userspost) | **POST** /api/v1/users | Create a new user|
|[**apiV1UsersUserIdAvatarPost**](#apiv1usersuseridavatarpost) | **POST** /api/v1/users/{user_id}/avatar | Upload an avatar for a user|
|[**apiV1UsersUserIdCoverPost**](#apiv1usersuseridcoverpost) | **POST** /api/v1/users/{user_id}/cover | Upload a cover image for a user|
|[**apiV1UsersUserIdGet**](#apiv1usersuseridget) | **GET** /api/v1/users/{user_id} | Get a user by ID|
|[**apiV1UsersUserIdPut**](#apiv1usersuseridput) | **PUT** /api/v1/users/{user_id} | Update a user|

# **apiV1UsersGet**
> apiV1UsersGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.apiV1UsersGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns a list of all users |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersMeGet**
> apiV1UsersMeGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let authorization: string; //The user\'s JWT token. (default to 'Bearer YOUR_JWT_TOKEN')
let includeTeams: boolean; //Include teams in the response (optional) (default to undefined)
let includeFollows: boolean; //Include followed teams in the response (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1UsersMeGet(
    authorization,
    includeTeams,
    includeFollows
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] | The user\&#39;s JWT token. | defaults to 'Bearer YOUR_JWT_TOKEN'|
| **includeTeams** | [**boolean**] | Include teams in the response | (optional) defaults to undefined|
| **includeFollows** | [**boolean**] | Include followed teams in the response | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns the current user |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersPost**
> apiV1UsersPost(body)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ApiV1UsersPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let body: ApiV1UsersPostRequest; //

const { status, data } = await apiInstance.apiV1UsersPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1UsersPostRequest**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | User created successfully |  -  |
|**400** | Missing data or nickname/email already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersUserIdAvatarPost**
> apiV1UsersUserIdAvatarPost()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let avatar: File; // (default to undefined)

const { status, data } = await apiInstance.apiV1UsersUserIdAvatarPost(
    userId,
    avatar
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **avatar** | [**File**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Avatar uploaded successfully |  -  |
|**400** | No avatar file provided |  -  |
|**500** | An internal error occurred during avatar upload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersUserIdCoverPost**
> apiV1UsersUserIdCoverPost()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let cover: File; // (default to undefined)

const { status, data } = await apiInstance.apiV1UsersUserIdCoverPost(
    userId,
    cover
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **cover** | [**File**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Cover image uploaded successfully |  -  |
|**400** | No cover file provided |  -  |
|**500** | An internal error occurred during cover upload |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersUserIdGet**
> apiV1UsersUserIdGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let includeTeams: boolean; //Include teams in the response (optional) (default to undefined)
let includeFollows: boolean; //Include followed teams in the response (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1UsersUserIdGet(
    userId,
    includeTeams,
    includeFollows
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **includeTeams** | [**boolean**] | Include teams in the response | (optional) defaults to undefined|
| **includeFollows** | [**boolean**] | Include followed teams in the response | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Returns a single user |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersUserIdPut**
> apiV1UsersUserIdPut(body)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    ApiV1UsersUserIdPutRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let body: ApiV1UsersUserIdPutRequest; //

const { status, data } = await apiInstance.apiV1UsersUserIdPut(
    userId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1UsersUserIdPutRequest**|  | |
| **userId** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User updated successfully |  -  |
|**400** | No data provided or nickname/email already exists |  -  |
|**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

