# TeamsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**teamsGet**](#teamsget) | **GET** /teams | Get all teams|
|[**teamsPost**](#teamspost) | **POST** /teams | Create a new team|
|[**teamsTeamIdApplicationsGet**](#teamsteamidapplicationsget) | **GET** /teams/{team_id}/applications | Get team applications (Captain only)|
|[**teamsTeamIdApplicationsUserIdRespondPost**](#teamsteamidapplicationsuseridrespondpost) | **POST** /teams/{team_id}/applications/{user_id}/respond | Respond to a team application (Captain only)|
|[**teamsTeamIdApplyPost**](#teamsteamidapplypost) | **POST** /teams/{team_id}/apply | Apply to join a team|
|[**teamsTeamIdFollowPost**](#teamsteamidfollowpost) | **POST** /teams/{team_id}/follow | Follow or Unfollow a Team|
|[**teamsTeamIdGet**](#teamsteamidget) | **GET** /teams/{team_id} | Get a team by ID|
|[**teamsTeamIdMembersUserIdDelete**](#teamsteamidmembersuseriddelete) | **DELETE** /teams/{team_id}/members/{user_id} | Remove a member from a team (Captain only)|

# **teamsGet**
> Array<Team> teamsGet()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let expand: 'members'; // (optional) (default to undefined)

const { status, data } = await apiInstance.teamsGet(
    expand
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **expand** | [**&#39;members&#39;**]**Array<&#39;members&#39;>** |  | (optional) defaults to undefined|


### Return type

**Array<Team>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of teams |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsPost**
> Team teamsPost(newTeam)


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    NewTeam
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let newTeam: NewTeam; //

const { status, data } = await apiInstance.teamsPost(
    newTeam
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newTeam** | **NewTeam**|  | |


### Return type

**Team**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Team created |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsTeamIdApplicationsGet**
> Array<User> teamsTeamIdApplicationsGet()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.teamsTeamIdApplicationsGet(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


### Return type

**Array<User>**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of applicants |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |
|**403** | Forbidden - The client does not have access rights to the content. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsTeamIdApplicationsUserIdRespondPost**
> SuccessResponse teamsTeamIdApplicationsUserIdRespondPost()


### Example

```typescript
import {
    TeamsApi,
    Configuration,
    ApplicationResponse
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)
let userId: number; // (default to undefined)
let applicationResponse: ApplicationResponse; // (optional)

const { status, data } = await apiInstance.teamsTeamIdApplicationsUserIdRespondPost(
    teamId,
    userId,
    applicationResponse
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationResponse** | **ApplicationResponse**|  | |
| **teamId** | [**number**] |  | defaults to undefined|
| **userId** | [**number**] |  | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success - The request has succeeded. |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |
|**403** | Forbidden - The client does not have access rights to the content. |  -  |
|**404** | Not Found - The server can not find the requested resource. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsTeamIdApplyPost**
> SuccessResponse teamsTeamIdApplyPost()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.teamsTeamIdApplyPost(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success - The request has succeeded. |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsTeamIdFollowPost**
> FollowToggleResponse teamsTeamIdFollowPost()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.teamsTeamIdFollowPost(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


### Return type

**FollowToggleResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Follow status toggled |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |
|**404** | Not Found - The server can not find the requested resource. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsTeamIdGet**
> Team teamsTeamIdGet()


### Example

```typescript
import {
    TeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsApi(configuration);

let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.teamsTeamIdGet(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|


### Return type

**Team**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team data |  -  |
|**404** | Not Found - The server can not find the requested resource. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **teamsTeamIdMembersUserIdDelete**
> SuccessResponse teamsTeamIdMembersUserIdDelete()


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

const { status, data } = await apiInstance.teamsTeamIdMembersUserIdDelete(
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

**SuccessResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success - The request has succeeded. |  -  |
|**401** | Unauthorized - The client must authenticate itself to get the requested response. |  -  |
|**403** | Forbidden - The client does not have access rights to the content. |  -  |
|**404** | Not Found - The server can not find the requested resource. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

