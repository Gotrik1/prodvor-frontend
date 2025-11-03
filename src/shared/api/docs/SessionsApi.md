# SessionsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1UsersMeSessionsAllExceptCurrentDelete**](#apiv1usersmesessionsallexceptcurrentdelete) | **DELETE** /api/v1/users/me/sessions/all-except-current | Delete all sessions except the current one|
|[**apiV1UsersMeSessionsGet**](#apiv1usersmesessionsget) | **GET** /api/v1/users/me/sessions | Get all active sessions for the current user|
|[**apiV1UsersMeSessionsSessionIdDelete**](#apiv1usersmesessionssessioniddelete) | **DELETE** /api/v1/users/me/sessions/{session_id} | Delete a specific session|

# **apiV1UsersMeSessionsAllExceptCurrentDelete**
> apiV1UsersMeSessionsAllExceptCurrentDelete()


### Example

```typescript
import {
    SessionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SessionsApi(configuration);

const { status, data } = await apiInstance.apiV1UsersMeSessionsAllExceptCurrentDelete();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | All other sessions have been deleted. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersMeSessionsGet**
> Array<ApiV1UsersMeSessionsGet200ResponseInner> apiV1UsersMeSessionsGet()


### Example

```typescript
import {
    SessionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SessionsApi(configuration);

const { status, data } = await apiInstance.apiV1UsersMeSessionsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ApiV1UsersMeSessionsGet200ResponseInner>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of active user sessions. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1UsersMeSessionsSessionIdDelete**
> apiV1UsersMeSessionsSessionIdDelete()


### Example

```typescript
import {
    SessionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SessionsApi(configuration);

let sessionId: number; //The ID of the session to delete. (default to undefined)

const { status, data } = await apiInstance.apiV1UsersMeSessionsSessionIdDelete(
    sessionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sessionId** | [**number**] | The ID of the session to delete. | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Session deleted successfully. |  -  |
|**400** | Cannot delete the currently active session. |  -  |
|**404** | Session not found or permission denied. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

