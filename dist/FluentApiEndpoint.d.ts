import { FluentApiEndpointConfig } from "./FluentApiClient";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class FluentApiEndpoint extends Function {
    readonly client: AxiosInstance;
    readonly urlPart: string | null;
    readonly urlPrefix: string | null;
    readonly endpoints: FluentApiEndpointConfig[];
    /**
     * Creates an instance of FluentApiEndpoint.
     * @param {AxiosInstance} client
     * @param {(string|null)} [urlPart=null]
     * @param {(string|null)} [urlPrefix=null]
     * @param {FluentApiEndpointConfig[]} [endpoints=[]]
     * @memberof FluentApiEndpoint
     */
    constructor(client: AxiosInstance, urlPart?: string | null, urlPrefix?: string | null, endpoints?: FluentApiEndpointConfig[]);
    /**
     * get url address without leading "/"
     * @readonly
     * @type {string}
     * @memberof FluentApiEndpoint
     */
    get url(): string;
    /**
     * Generate subresource endpoints with prefixed url
     * @template T
     * @param {(string|number|null)} [id=null]
     * @returns {T}
     * @memberof FluentApiEndpoint
     */
    getEndpoints<T = {
        [key: string]: FluentApiEndpoint;
    }>(id?: string | number | null): T;
    /**
     * Generic GET request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doGetRequest(url: string, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse>;
    /**
     * Generic HEAD request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doHeadRequest(url: string, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse>;
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
    doPostRequest(url: string, data?: Record<string, any>, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse>;
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
    doPutRequest(url: string, data?: Record<string, any>, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse>;
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
    doPatchRequest(url: string, data?: Record<string, any>, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse>;
    /**
     * Generic DELETE request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doDeleteRequest(url: string, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse>;
    /**
     * Do a GET request to retrieve all records
     *
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getAll(params?: Record<string, any>): Promise<AxiosResponse>;
    /**
     * Do a GET request to retrieve specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getOne(id: string | number, params?: Record<string, any>): Promise<AxiosResponse>;
    /**
     * Do a POST request to create record
     *
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    create(dataset: Record<string, any>): Promise<AxiosResponse>;
    /**
     * Do a GET request to retrieve specific record or specific record if you specify ID parameter
     *
     * @param {(string|number|null)} [id=null]
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    read(id?: string | number | null, params?: Record<string, any>): Promise<AxiosResponse>;
    /**
     * Do a PATCH request to update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    update(id: string | number, dataset: Record<string, any>): Promise<AxiosResponse>;
    /**
     * Do a DELETE request to delete specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    delete(id: string | number): Promise<AxiosResponse>;
    /**
     * Do a PUT request to replace or update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    replace(id: string | number, dataset: Record<string, any>): Promise<AxiosResponse>;
}
//# sourceMappingURL=FluentApiEndpoint.d.ts.map