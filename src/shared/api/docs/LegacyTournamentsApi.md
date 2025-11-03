# LegacyTournamentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1TournamentsGet**](#apiv1tournamentsget) | **GET** /api/v1/tournaments | Get all tournaments|
|[**apiV1TournamentsPost**](#apiv1tournamentspost) | **POST** /api/v1/tournaments | Create a new tournament|
|[**apiV1TournamentsTournamentIdGet**](#apiv1tournamentstournamentidget) | **GET** /api/v1/tournaments/{tournament_id} | Get a specific tournament|

# **apiV1TournamentsGet**
> apiV1TournamentsGet()


### Example

```typescript
import {
    LegacyTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyTournamentsApi(configuration);

const { status, data } = await apiInstance.apiV1TournamentsGet();
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
|**200** | A list of tournaments |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TournamentsPost**
> apiV1TournamentsPost(body)


### Example

```typescript
import {
    LegacyTournamentsApi,
    Configuration,
    ApiV1TournamentsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyTournamentsApi(configuration);

let body: ApiV1TournamentsPostRequest; //

const { status, data } = await apiInstance.apiV1TournamentsPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1TournamentsPostRequest**|  | |


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
|**201** | Tournament created successfully |  -  |
|**400** | Missing data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TournamentsTournamentIdGet**
> apiV1TournamentsTournamentIdGet()


### Example

```typescript
import {
    LegacyTournamentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyTournamentsApi(configuration);

let tournamentId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1TournamentsTournamentIdGet(
    tournamentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **tournamentId** | [**number**] |  | defaults to undefined|


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
|**200** | A single tournament |  -  |
|**404** | Tournament not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

