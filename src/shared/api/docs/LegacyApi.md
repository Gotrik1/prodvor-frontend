# LegacyApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1Get**](#apiv1get) | **GET** /api/v1/ | Legacy Index|

# **apiV1Get**
> apiV1Get()


### Example

```typescript
import {
    LegacyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyApi(configuration);

const { status, data } = await apiInstance.apiV1Get();
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
|**200** | Welcome message |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

