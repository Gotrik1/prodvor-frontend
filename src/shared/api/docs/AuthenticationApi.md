# AuthenticationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1AuthLoginPost**](#apiv1authloginpost) | **POST** /api/v1/auth/login | Login a user|
|[**apiV1AuthLogoutPost**](#apiv1authlogoutpost) | **POST** /api/v1/auth/logout | Logout a user|
|[**apiV1AuthRefreshPost**](#apiv1authrefreshpost) | **POST** /api/v1/auth/refresh | Refresh access token|
|[**apiV1AuthRegisterPost**](#apiv1authregisterpost) | **POST** /api/v1/auth/register | Register a new user|

# **apiV1AuthLoginPost**
> apiV1AuthLoginPost(body)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ApiV1AuthLoginPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let body: ApiV1AuthLoginPostRequest; //

const { status, data } = await apiInstance.apiV1AuthLoginPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1AuthLoginPostRequest**|  | |


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
|**200** | User logged in successfully |  -  |
|**400** | Missing email or password |  -  |
|**401** | Invalid credentials |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthLogoutPost**
> apiV1AuthLogoutPost(body)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ApiV1AuthLogoutPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let body: ApiV1AuthLogoutPostRequest; //

const { status, data } = await apiInstance.apiV1AuthLogoutPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1AuthLogoutPostRequest**|  | |


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
|**200** | User logged out successfully |  -  |
|**400** | Missing refresh token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthRefreshPost**
> apiV1AuthRefreshPost(body)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ApiV1AuthLogoutPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let body: ApiV1AuthLogoutPostRequest; //

const { status, data } = await apiInstance.apiV1AuthRefreshPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1AuthLogoutPostRequest**|  | |


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
|**200** | Access token refreshed successfully |  -  |
|**400** | Missing refresh token |  -  |
|**401** | Invalid or expired refresh token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthRegisterPost**
> apiV1AuthRegisterPost(body)


### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ApiV1AuthRegisterPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let body: ApiV1AuthRegisterPostRequest; //

const { status, data } = await apiInstance.apiV1AuthRegisterPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1AuthRegisterPostRequest**|  | |


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
|**201** | User registered successfully |  -  |
|**400** | Missing data |  -  |
|**409** | Email or nickname already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

