# LegacyProfilesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1ProfilesCoachGet**](#apiv1profilescoachget) | **GET** /api/v1/profiles/coach | Get all coach profiles|
|[**apiV1ProfilesPlayerGet**](#apiv1profilesplayerget) | **GET** /api/v1/profiles/player | Get all player profiles|
|[**apiV1ProfilesRefereeGet**](#apiv1profilesrefereeget) | **GET** /api/v1/profiles/referee | Get all referee profiles|

# **apiV1ProfilesCoachGet**
> apiV1ProfilesCoachGet()


### Example

```typescript
import {
    LegacyProfilesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyProfilesApi(configuration);

const { status, data } = await apiInstance.apiV1ProfilesCoachGet();
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
|**200** | A list of coach profiles |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ProfilesPlayerGet**
> apiV1ProfilesPlayerGet()


### Example

```typescript
import {
    LegacyProfilesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyProfilesApi(configuration);

const { status, data } = await apiInstance.apiV1ProfilesPlayerGet();
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
|**200** | A list of player profiles |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ProfilesRefereeGet**
> apiV1ProfilesRefereeGet()


### Example

```typescript
import {
    LegacyProfilesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyProfilesApi(configuration);

const { status, data } = await apiInstance.apiV1ProfilesRefereeGet();
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
|**200** | A list of referee profiles |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

