# LegacyAchievementsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1AchievementsGet**](#apiv1achievementsget) | **GET** /api/v1/achievements | Get all achievements|

# **apiV1AchievementsGet**
> apiV1AchievementsGet()


### Example

```typescript
import {
    LegacyAchievementsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyAchievementsApi(configuration);

const { status, data } = await apiInstance.apiV1AchievementsGet();
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
|**200** | A list of achievements |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

