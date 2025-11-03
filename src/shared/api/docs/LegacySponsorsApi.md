# LegacySponsorsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1SponsorsGet**](#apiv1sponsorsget) | **GET** /api/v1/sponsors | Get all sponsors|
|[**apiV1SponsorsPost**](#apiv1sponsorspost) | **POST** /api/v1/sponsors | Create a new sponsor|

# **apiV1SponsorsGet**
> apiV1SponsorsGet()


### Example

```typescript
import {
    LegacySponsorsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacySponsorsApi(configuration);

const { status, data } = await apiInstance.apiV1SponsorsGet();
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
|**200** | A list of sponsors |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1SponsorsPost**
> apiV1SponsorsPost(body)


### Example

```typescript
import {
    LegacySponsorsApi,
    Configuration,
    ApiV1SponsorsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacySponsorsApi(configuration);

let body: ApiV1SponsorsPostRequest; //

const { status, data } = await apiInstance.apiV1SponsorsPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1SponsorsPostRequest**|  | |


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
|**201** | Sponsor created successfully |  -  |
|**400** | Missing data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

