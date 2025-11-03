# AuthApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authLoginPost**](#authloginpost) | **POST** /auth/login | User Login (JWT)|
|[**authLogoutPost**](#authlogoutpost) | **POST** /auth/logout | Logout user|
|[**authRefreshPost**](#authrefreshpost) | **POST** /auth/refresh | Refresh access token|
|[**authRegisterPost**](#authregisterpost) | **POST** /auth/register | Register a new user|

# **authLoginPost**
> LoginResponse authLoginPost(userLogin)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserLogin
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userLogin: UserLogin; //

const { status, data } = await apiInstance.authLoginPost(
    userLogin
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userLogin** | **UserLogin**|  | |


### Return type

**LoginResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful login |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authLogoutPost**
> SuccessResponse authLogoutPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SuccessResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success - The request has succeeded. |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRefreshPost**
> TokenRefreshResponse authRefreshPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authRefreshPost();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**TokenRefreshResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Token refreshed successfully |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authRegisterPost**
> User authRegisterPost(userRegistration)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    UserRegistration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let userRegistration: UserRegistration; //

const { status, data } = await apiInstance.authRegisterPost(
    userRegistration
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userRegistration** | **UserRegistration**|  | |


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
|**201** | User created successfully |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |
|**409** | Conflict - This response is sent when a request conflicts with the current state of the server. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

