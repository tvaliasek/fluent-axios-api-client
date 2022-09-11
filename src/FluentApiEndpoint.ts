import { FluentApiEndpointConfig } from "./FluentApiClient"
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class FluentApiEndpoint extends Function {
    constructor (
        public readonly client: AxiosInstance,
        public readonly urlPart: string|null = null,
        public readonly urlPrefix: string|null = null,
        public readonly endpoints: FluentApiEndpointConfig[] = []
    ) {
        super()
        return new Proxy(this, {
            apply: (target, thisArg, args: string[]|number[]|null[] = [null]) => {
                return target.getEndpoints(args[0])
            }
        })
    }

    /**
     * get url address without leading "/"
     */
    get url (): string {
        const url = `${this.urlPrefix ?? ''}/${this.urlPart}`.replace(/\/{2,}/g, '/').split('')
        if (url[0] === '/') {
            url[0] = ''
        }
        if (url[url.length - 1] === '/') {
            url[url.length - 1] = ''
        }
        return url.join('')
    }

    /**
     * Generate subresource endpoints with prefixed url 
     */
    getEndpoints<T = { [key: string]: FluentApiEndpoint }> (id: string|number|null = null): T  {
        const endpoints: Record<string, any> = {}
        for (const endpoint of this.endpoints) {
            const ApiEndpointClass = endpoint.endpointClass || FluentApiEndpoint
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`)
            }
            endpoints[endpoint.property] = new ApiEndpointClass(
                this.client,
                endpoint.urlPart || endpoint.property,
                (id === null) ? this.url : `${this.url}/${id}`,
                endpoint.endpoints || []
            )
        }
        return endpoints as T
    }

    /**
     * Generic GET request
     */
    doGetRequest (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.get(url, { params, ...customConfig })
    }

    /**
     * Generic HEAD request
     */
    doHeadRequest (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.head(url, { params, ...customConfig })
    }

    /**
     * Generic POST request
     */
    doPostRequest (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.post(url, data, { params, ...customConfig })
    }

    /**
     * Generic PUT request
     */
    doPutRequest (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.put(url, data, { params, ...customConfig })
    }

    /**
     * Generic PATCH request
     */
    doPatchRequest (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.patch(url, data, { params, ...customConfig })
    }

    /**
     * Generic DELETE request
     */
    doDeleteRequest (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.delete(url, { params, ...customConfig })
    }

    /**
     * Do a GET request to retrieve all records
     */
    getAll (params: Record<string, any> = {}): Promise<AxiosResponse> {
        return this.doGetRequest(`/${this.url}`, params)
    }

    /**
     * Do a GET request to retrieve specific record
     */
    getOne (id: string|number): Promise<AxiosResponse> {
        return this.doGetRequest(`/${this.url}/${id}`)
    }

    /**
     * Do a POST request to create record
     */
    create (dataset: Record<string, any>): Promise<AxiosResponse> {
        return this.doPostRequest(`/${this.url}`, dataset)
    }

    /**
     * Do a GET request to retrieve specific record or specific record if you specify ID parameter
     */
    read (id: string|number|null = null, params: Record<string, any> = {}): Promise<AxiosResponse> {
        if (id === null) {
            return this.getAll(params)
        }
        return this.getOne(id)
    }

    /**
     * Do a PATCH request to update specific record
     */
    update (id: string|number, dataset: Record<string, any>): Promise<AxiosResponse> {
        return this.doPatchRequest(`/${this.url}/${id}`, dataset)
    }

    /**
     * Do a DELETE request to delete specific record
     */
    delete (id: string|number): Promise<AxiosResponse> {
        return this.doDeleteRequest(`/${this.url}/${id}`)
    }

    /**
     * Do a PUT request to replace or update specific record
     */
    replace (id: string|number, dataset: Record<string, any>): Promise<AxiosResponse> {
        return this.doPutRequest(`/${this.url}/${id}`, dataset)
    }
}
