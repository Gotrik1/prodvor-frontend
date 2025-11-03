# LegacyQuestsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1QuestsGet**](#apiv1questsget) | **GET** /api/v1/quests | Get all quests|

# **apiV1QuestsGet**
> apiV1QuestsGet()


### Example

```typescript
import {
    LegacyQuestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyQuestsApi(configuration);

const { status, data } = await apiInstance.apiV1QuestsGet();
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
|**200** | A list of quests |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

