# SportsApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**sportsGet**](#sportsget) | **GET** /sports | Get all sports|
|[**sportsPost**](#sportspost) | **POST** /sports | Create a new sport|

# **sportsGet**
> Array<Sport> sportsGet()


### Example

```typescript
import {
    SportsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SportsApi(configuration);

const { status, data } = await apiInstance.sportsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Sport>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of sports |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **sportsPost**
> Sport sportsPost(newSport)


### Example

```typescript
import {
    SportsApi,
    Configuration,
    NewSport
} from './api';

const configuration = new Configuration();
const apiInstance = new SportsApi(configuration);

let newSport: NewSport; //

const { status, data } = await apiInstance.sportsPost(
    newSport
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newSport** | **NewSport**|  | |


### Return type

**Sport**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Sport created |  -  |
|**400** | Bad Request - The server cannot process the request due to a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

