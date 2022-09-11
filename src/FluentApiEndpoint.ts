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
            apply: (target, thisArg, args: string[]|number[]) => {
                return target.getEndpoints(args[0])
            }
        })
    }

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

    getEndpoints<T = { [key: string]: FluentApiEndpoint }> (id: string|number): T  {
        const endpoints: Record<string, any> = {}
        for (const endpoint of this.endpoints) {
            const ApiEndpointClass = endpoint.apiClass || FluentApiEndpoint
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`)
            }
            endpoints[endpoint.property] = new ApiEndpointClass(
                this.client,
                endpoint.urlPart || endpoint.property,
                `${this.url}/${id}`,
                endpoint.endpoints || []
            )
        }
        return endpoints as T
    }

    doGetRequest (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.get(url, { params, ...customConfig })
    }

    doHeadRequest (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.head(url, { params, ...customConfig })
    }

    doPostRequest (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.post(url, data, { params, ...customConfig })
    }

    doPutRequest (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.put(url, data, { params, ...customConfig })
    }

    doPatchRequest (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.patch(url, data, { params, ...customConfig })
    }

    doDeleteRequest (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse> {
        return this.client.delete(url, { params, ...customConfig })
    }

    getAll (params: Record<string, any> = {}): Promise<AxiosResponse> {
        return this.doGetRequest(`/${this.url}`, params)
    }

    getOne (id: string|number): Promise<AxiosResponse> {
        return this.doGetRequest(`/${this.url}/${id}`)
    }

    /**
     * Basic CRUD operations
     */

    create (dataset: Record<string, any>): Promise<AxiosResponse> {
        return this.doPostRequest(`/${this.url}`, dataset)
    }

    read (id: string|number|null = null, params: Record<string, any> = {}): Promise<AxiosResponse> {
        if (id === null) {
            return this.getAll(params)
        }
        return this.getOne(id)
    }

    update (id: string|number, dataset: Record<string, any>): Promise<AxiosResponse> {
        return this.doPatchRequest(`/${this.url}/${id}`, dataset)
    }

    delete (id: string|number): Promise<AxiosResponse> {
        return this.doDeleteRequest(`/${this.url}/${id}`)
    }

    replace (id: string|number, dataset: Record<string, any>): Promise<AxiosResponse> {
        return this.doPutRequest(`/${this.url}/${id}`, dataset)
    }
}
