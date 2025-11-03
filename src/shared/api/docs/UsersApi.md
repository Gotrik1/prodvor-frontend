# UsersApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**usersGet**](#usersget) | **GET** /users | Get all users|
|[**usersMeGet**](#usersmeget) | **GET** /users/me | Get current user\&#39;s profile|
|[**usersPost**](#userspost) | **POST** /users | Create a new user|
|[**usersUserIdAvatarPost**](#usersuseridavatarpost) | **POST** /users/{user_id}/avatar | Upload a user avatar|
|[**usersUserIdCoverPost**](#usersuseridcoverpost) | **POST** /users/{user_id}/cover | Upload a user cover image|
|[**usersUserIdGet**](#usersuseridget) | **GET** /users/{user_id} | Get a user by ID|
|[**usersUserIdPut**](#usersuseridput) | **PUT** /users/{user_id} | Update a user\&#39;s profile|

# **usersGet**
> Array<User> usersGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.usersGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<User>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of users |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersMeGet**
> User usersMeGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let includeTeams: boolean; // (optional) (default to undefined)
let includeFollows: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.usersMeGet(
    includeTeams,
    includeFollows
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **includeTeams** | [**boolean**] |  | (optional) defaults to undefined|
| **includeFollows** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**User**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Current user data |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersPost**
> User usersPost(newUser)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    NewUser
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let newUser: NewUser; //

const { status, data } = await apiInstance.usersPost(
    newUser
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newUser** | **NewUser**|  | |


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | User created |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersUserIdAvatarPost**
> User usersUserIdAvatarPost()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let avatar: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.usersUserIdAvatarPost(
    userId,
    avatar
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **avatar** | [**File**] |  | (optional) defaults to undefined|


### Return type

**User**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Avatar uploaded |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersUserIdCoverPost**
> User usersUserIdCoverPost()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let cover: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.usersUserIdCoverPost(
    userId,
    cover
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **cover** | [**File**] |  | (optional) defaults to undefined|


### Return type

**User**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Cover uploaded |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersUserIdGet**
> User usersUserIdGet()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let includeTeams: boolean; // (optional) (default to undefined)
let includeFollows: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.usersUserIdGet(
    userId,
    includeTeams,
    includeFollows
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **includeTeams** | [**boolean**] |  | (optional) defaults to undefined|
| **includeFollows** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User data |  -  |
|**404** | Not Found - The server can not find the requested resource. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersUserIdPut**
> User usersUserIdPut()


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UserUpdate
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; // (default to undefined)
let userUpdate: UserUpdate; //Fields to update (optional)

const { status, data } = await apiInstance.usersUserIdPut(
    userId,
    userUpdate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userUpdate** | **UserUpdate**| Fields to update | |
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**User**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User updated |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |
|**404** | Not Found - The server can not find the requested resource. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

