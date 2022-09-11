# Fluent Axios API client

This library provides simple fluent interface and wrapper functions for REST API CRUD operations. It is meant to be
used with the Axios client library, or anything else providing compatible interface. And yes, I know there are other, possibly better modern alternatives, but I'll keep using it for now.

## Usage
Client assumes url scheme: `/<optional prefix>/<resource>[/<resource id>[/<subresource>[/<subresource id>]]]`

But you can use it also differently, see last example.

``` ts
import { create } from 'axios'
import { createClient, FluentApiEndpoint } from '@tvaliasek/fluent-axios-api-client'

// create axios client ínstance
const axiosClient = create({ baseURL: 'https://some.api' })

// define structure of your API
const endpointsDefinition = [
    {
        // under which property should be this endpoint available in api instance
        property: 'someResources',
        // optional url part of this endpoint in url, if omitted, property value is used
        urlPart: 'some-resources',
        // optinal custom class constructor for this endpoint, extend FluentApiEndpoint class and add your methods etc.
        endpointClass: CustomEndpointClass
        // you can add subresource endpoints with the same config
        endpoints: [
            {
                property: 'subresources'
            }    
        ]
    }
]

// create api client instance
const apiClient = createClient(
    // axios client instance
    axiosClient,
    // optional global prefix of your api
    'api',
    // definition of endpoints
    endpointsDefinition
)

// now you can use your client 
// do a POST request on /api/some-resources
let axiosResponse = await apiClient.someResources.create({ foo: 'bar' })

// or GET request to read specific record
// url: /api/some-resources/1
axiosResponse = await apiClient.someResources.read(1)

// or do specific request like a GET request with query param "some" and with custom request config
// url: /api/some-resources?some=param
const endpointUrl = `/${apiClient.someResources.url}`
const queryParams = { some: 'param' }
axiosResponse = await apiClient.someResources.doGetRequest(endpointUrl, queryParams, { withCredentials: true })

// or do something similar for resource with ID 1
// url: /api/some-resources/1/subresources/2
axiosResponse = await apiClient.someResources(1).subresources.update(2, { update: 'data' })

// you can also skip ID and get url without resource id url part
// url: /api/some-resources/subresources/2
axiosResponse = await apiClient.someResources().subresources.update(2, { update: 'data' })

```
