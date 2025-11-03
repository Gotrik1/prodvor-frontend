# IndexApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**openapiJsonGet**](#openapijsonget) | **GET** /openapi.json | Serve the static openapi.json file|
|[**rootGet**](#rootget) | **GET** / | Redirect to API docs|

# **openapiJsonGet**
> openapiJsonGet()


### Example

```typescript
import {
    IndexApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IndexApi(configuration);

const { status, data } = await apiInstance.openapiJsonGet();
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
|**200** | The openapi.json file |  -  |
|**404** | File not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rootGet**
> rootGet()


### Example

```typescript
import {
    IndexApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new IndexApi(configuration);

const { status, data } = await apiInstance.rootGet();
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
|**302** | Redirect to /apidocs/ |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

