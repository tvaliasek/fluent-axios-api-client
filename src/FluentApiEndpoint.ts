import { FluentApiEndpointConfig } from "./FluentApiClient"
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class FluentApiEndpoint extends Function {
    /**
     * Creates an instance of FluentApiEndpoint.
     * @param {AxiosInstance} client
     * @param {(string|null)} [urlPart=null]
     * @param {(string|null)} [urlPrefix=null]
     * @param {FluentApiEndpointConfig[]} [endpoints=[]]
     * @memberof FluentApiEndpoint
     */
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
     * @readonly
     * @type {string}
     * @memberof FluentApiEndpoint
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
     * @template T
     * @param {(string|number|null)} [id=null]
     * @returns {T}
     * @memberof FluentApiEndpoint
     */
    getEndpoints<T = { [key: string]: FluentApiEndpoint }> (id: string|number|null = null): T  {
        const endpoints: Record<string, any> = {}
        for (const endpoint of this.endpoints) {
            const ApiEndpointClass = endpoint.endpointClass ?? FluentApiEndpoint
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
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doGetRequest<T = any> (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
        return this.client.get(url, { params, ...customConfig })
    }

    /**
     * Generic HEAD request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doHeadRequest<T = any> (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
        return this.client.head(url, { params, ...customConfig })
    }

    /**
     * Generic POST request
     *
     * @param {string} url
     * @param {Record<string, any>} [data={}]
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doPostRequest<T = any> (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
        return this.client.post(url, data, { params, ...customConfig })
    }

    /**
     * Generic PUT request
     *
     * @param {string} url
     * @param {Record<string, any>} [data={}]
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doPutRequest<T = any> (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
        return this.client.put(url, data, { params, ...customConfig })
    }

    /**
     * Generic PATCH request
     *
     * @param {string} url
     * @param {Record<string, any>} [data={}]
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doPatchRequest<T = any> (url: string, data: Record<string, any> = {}, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
        return this.client.patch(url, data, { params, ...customConfig })
    }

    /**
     * Generic DELETE request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doDeleteRequest<T = any> (url: string, params: Record<string, any> = {}, customConfig: Partial<AxiosRequestConfig> = {}): Promise<AxiosResponse<T>> {
        return this.client.delete(url, { params, ...customConfig })
    }

    /**
     * Do a GET request to retrieve all records
     *
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getAll<T = Array<Record<string, any>>> (params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        return this.doGetRequest(`/${this.url}`, params)
    }

    /**
     * Do a GET request to retrieve specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getOne<T = Record<string, any>> (id: string|number, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        return this.doGetRequest(`/${this.url}/${id}`, params)
    }

    /**
     * Do a POST request to create record
     *
     * @param {Record<string, any>} dataset
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    create<T = Record<string, any>> (dataset: Record<string, any>, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        return this.doPostRequest(`/${this.url}`, dataset)
    }

    /**
     * Do a GET request to retrieve specific record or specific record if you specify ID parameter
     *
     * @param {(string|number|null)} [id=null]
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    read<T = Record<string, any> | Array<Record<string, any>>> (id: string|number|null = null, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        if (id === null) {
            return this.getAll(params)
        }
        return this.getOne(id, params)
    }

    /**
     * Do a PATCH request to update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    update<T = Record<string, any>> (id: string|number, dataset: Record<string, any>, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        return this.doPatchRequest(`/${this.url}/${id}`, dataset)
    }

    /**
     * Do a DELETE request to delete specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    delete<T = Record<string, any>> (id: string|number, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        return this.doDeleteRequest(`/${this.url}/${id}`, params)
    }

    /**
     * Do a PUT request to replace or update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    replace<T = Record<string, any>> (id: string|number, dataset: Record<string, any>, params: Record<string, any> = {}): Promise<AxiosResponse<T>> {
        return this.doPutRequest(`/${this.url}/${id}`, dataset, params)
    }
}
