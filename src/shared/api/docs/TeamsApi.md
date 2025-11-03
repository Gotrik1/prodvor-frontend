# TeamsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1TeamsGet**](#apiv1teamsget) | **GET** /api/v1/teams | Get all teams|
|[**apiV1TeamsPost**](#apiv1teamspost) | **POST** /api/v1/teams | Create a new team|
|[**apiV1TeamsTeamIdApplicationsGet**](#apiv1teamsteamidapplicationsget) | **GET** /api/v1/teams/{team_id}/applications | Get team applications|
|[**apiV1TeamsTeamIdApplicationsUserIdRespondPost**](#apiv1teamsteamidapplicationsuseridrespondpost) | **POST** /api/v1/teams/{team_id}/applications/{user_id}/respond | Respond to a team application|
|[**apiV1TeamsTeamIdApplyPost**](#apiv1teamsteamidapplypost) | **POST** /api/v1/teams/{team_id}/apply | Apply to a team|
|[**apiV1TeamsTeamIdFollowPost**](#apiv1teamsteamidfollowpost) | **POST** /api/v1/teams/{team_id}/follow | Toggle follow a team|
|[**apiV1TeamsTeamIdGet**](#apiv1teamsteamidget) | **GET** /api/v1/teams/{team_id} | Get a team by ID|
|[**apiV1TeamsTeamIdMembersUserIdDelete**](#apiv1teamsteamidmembersuseriddelete) | **DELETE** /api/v1/teams/{team_id}/members/{user_id} | Remove a team member|

# **apiV1TeamsGet**
> apiV1TeamsGet()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let city: string; //Filter by city (optional) (default to undefined)
let sortBy: string; //Sort by attribute (name, followers, rank, createdAt) (optional) (default to undefined)
let order: string; //Sort order (asc, desc) (optional) (default to undefined)
let limit: number; //Limit number of results (optional) (default to undefined)
let expand: string; //Expand members (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1TeamsGet(
    city,
    sortBy,
    order,
    limit,
    expand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **city** | [**string**] | Filter by city | (optional) defaults to undefined|
| **sortBy** | [**string**] | Sort by attribute (name, followers, rank, createdAt) | (optional) defaults to undefined|
| **order** | [**string**] | Sort order (asc, desc) | (optional) defaults to undefined|
| **limit** | [**number**] | Limit number of results | (optional) defaults to undefined|
| **expand** | [**string**] | Expand members | (optional) defaults to undefined|


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
|**200** | Returns a list of all teams |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsPost**
> apiV1TeamsPost(body)


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    ApiV1TeamsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let body: ApiV1TeamsPostRequest; //

const { status, data } = await apiInstance.apiV1TeamsPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1TeamsPostRequest**|  | |


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
|**201** | Team created successfully |  -  |
|**400** | Missing data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsTeamIdApplicationsGet**
> apiV1TeamsTeamIdApplicationsGet()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1TeamsTeamIdApplicationsGet(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


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
|**200** | Returns a list of applicants |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsTeamIdApplicationsUserIdRespondPost**
> apiV1TeamsTeamIdApplicationsUserIdRespondPost(body)


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    ApiV1TeamsTeamIdApplicationsUserIdRespondPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)
let userId: number; // (default to undefined)
let body: ApiV1TeamsTeamIdApplicationsUserIdRespondPostRequest; //

const { status, data } = await apiInstance.apiV1TeamsTeamIdApplicationsUserIdRespondPost(
    teamId,
    userId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1TeamsTeamIdApplicationsUserIdRespondPostRequest**|  | |
| **teamId** | [**number**] |  | defaults to undefined|
| **userId** | [**number**] |  | defaults to undefined|


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
|**200** | Response sent successfully |  -  |
|**400** | Invalid action |  -  |
|**403** | Forbidden |  -  |
|**404** | Application not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsTeamIdApplyPost**
> apiV1TeamsTeamIdApplyPost()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1TeamsTeamIdApplyPost(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


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
|**200** | Application sent successfully |  -  |
|**400** | You have already applied or are a member |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsTeamIdFollowPost**
> apiV1TeamsTeamIdFollowPost()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1TeamsTeamIdFollowPost(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


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
|**200** | Follow status toggled |  -  |
|**404** | Team or user not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsTeamIdGet**
> apiV1TeamsTeamIdGet()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1TeamsTeamIdGet(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


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
|**200** | Returns a single team |  -  |
|**404** | Team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1TeamsTeamIdMembersUserIdDelete**
> apiV1TeamsTeamIdMembersUserIdDelete()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)
let userId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1TeamsTeamIdMembersUserIdDelete(
    teamId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|
| **userId** | [**number**] |  | defaults to undefined|


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
|**200** | Member removed successfully |  -  |
|**400** | Captain cannot remove themselves |  -  |
|**403** | Only the captain can remove members |  -  |
|**404** | Team or member not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

