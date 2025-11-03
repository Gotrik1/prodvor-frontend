# LegacyPostsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1PostsGet**](#apiv1postsget) | **GET** /api/v1/posts | Get all posts|
|[**apiV1PostsPost**](#apiv1postspost) | **POST** /api/v1/posts | Create a new post|
|[**apiV1PostsPostIdCommentsGet**](#apiv1postspostidcommentsget) | **GET** /api/v1/posts/{post_id}/comments | Get all comments for a post|
|[**apiV1PostsPostIdCommentsPost**](#apiv1postspostidcommentspost) | **POST** /api/v1/posts/{post_id}/comments | Create a new comment on a post|

# **apiV1PostsGet**
> apiV1PostsGet()


### Example

```typescript
import {
    LegacyPostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyPostsApi(configuration);

const { status, data } = await apiInstance.apiV1PostsGet();
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
|**200** | A list of posts |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1PostsPost**
> apiV1PostsPost(body)


### Example

```typescript
import {
    LegacyPostsApi,
    Configuration,
    ApiV1PostsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyPostsApi(configuration);

let body: ApiV1PostsPostRequest; //

const { status, data } = await apiInstance.apiV1PostsPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1PostsPostRequest**|  | |


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
|**201** | Post created successfully |  -  |
|**400** | Missing data |  -  |
|**404** | Author or Team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1PostsPostIdCommentsGet**
> apiV1PostsPostIdCommentsGet()


### Example

```typescript
import {
    LegacyPostsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyPostsApi(configuration);

let postId: number; // (default to undefined)

const { status, data } = await apiInstance.apiV1PostsPostIdCommentsGet(
    postId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **postId** | [**number**] |  | defaults to undefined|


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
|**200** | A list of comments for a post |  -  |
|**404** | Post not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1PostsPostIdCommentsPost**
> apiV1PostsPostIdCommentsPost(body)


### Example

```typescript
import {
    LegacyPostsApi,
    Configuration,
    ApiV1PostsPostIdCommentsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new LegacyPostsApi(configuration);

let postId: number; // (default to undefined)
let body: ApiV1PostsPostIdCommentsPostRequest; //

const { status, data } = await apiInstance.apiV1PostsPostIdCommentsPost(
    postId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ApiV1PostsPostIdCommentsPostRequest**|  | |
| **postId** | [**number**] |  | defaults to undefined|


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
|**201** | Comment created successfully |  -  |
|**400** | Missing data |  -  |
|**404** | Post or Author not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

