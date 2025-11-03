# LegacyPlaygroundsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1PlaygroundsGet**](#apiv1playgroundsget) | **GET** /api/v1/playgrounds | Get all playgrounds|
|[**apiV1PlaygroundsPost**](#apiv1playgroundspost) | **POST** /api/v1/playgrounds | Create a new playground|

# **apiV1PlaygroundsGet**
> apiV1PlaygroundsGet()


### Example

```typescript
import {
    LegacyPlaygroundsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyPlaygroundsApi(configuration);

const { status, data } = await apiInstance.apiV1PlaygroundsGet();
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
|**200** | A list of playgrounds |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1PlaygroundsPost**
> apiV1PlaygroundsPost(body)


### Example

```typescript
import {
    LegacyPlaygroundsApi,
    Configuration,
    ApiV1PlaygroundsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyPlaygroundsApi(configuration);

let body: ApiV1PlaygroundsPostRequest; //

const { status, data } = await apiInstance.apiV1PlaygroundsPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1PlaygroundsPostRequest**|  | |


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
|**201** | Playground created successfully |  -  |
|**400** | Missing data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

