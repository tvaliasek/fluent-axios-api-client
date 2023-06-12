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
    doGetRequest<T = any>(url: string, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
    /**
     * Generic HEAD request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doHeadRequest<T = any>(url: string, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
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
    doPostRequest<T = any>(url: string, data?: Record<string, any>, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
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
    doPutRequest<T = any>(url: string, data?: Record<string, any>, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
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
    doPatchRequest<T = any>(url: string, data?: Record<string, any>, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
    /**
     * Generic DELETE request
     *
     * @param {string} url
     * @param {Record<string, any>} [params={}]
     * @param {Partial<AxiosRequestConfig>} [customConfig={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    doDeleteRequest<T = any>(url: string, params?: Record<string, any>, customConfig?: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>>;
    /**
     * Do a GET request to retrieve all records
     *
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getAll<T = Array<Record<string, any>>>(params?: Record<string, any>): Promise<AxiosResponse<T>>;
    /**
     * Do a GET request to retrieve specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getOne<T = Record<string, any>>(id: string | number, params?: Record<string, any>): Promise<AxiosResponse<T>>;
    /**
     * Do a POST request to create record
     *
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    create<T = Record<string, any>>(dataset: Record<string, any>): Promise<AxiosResponse<T>>;
    /**
     * Do a GET request to retrieve specific record or specific record if you specify ID parameter
     *
     * @param {(string|number|null)} [id=null]
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    read<T = Record<string, any> | Array<Record<string, any>>>(id?: string | number | null, params?: Record<string, any>): Promise<AxiosResponse<T>>;
    /**
     * Do a PATCH request to update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    update<T = Record<string, any>>(id: string | number, dataset: Record<string, any>): Promise<AxiosResponse<T>>;
    /**
     * Do a DELETE request to delete specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    delete<T = Record<string, any>>(id: string | number): Promise<AxiosResponse<T>>;
    /**
     * Do a PUT request to replace or update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    replace<T = Record<string, any>>(id: string | number, dataset: Record<string, any>): Promise<AxiosResponse<T>>;
}
//# sourceMappingURL=FluentApiEndpoint.d.ts.map