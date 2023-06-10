import { AxiosInstance } from 'axios';
import { FluentApiEndpoint } from './FluentApiEndpoint';
type ConstructorType<T> = new (...args: any[]) => T;
/**
 * @export
 * @interface FluentApiEndpointConfig
 * @template T
 * @property {string} property
 * @property {FluentApiEndpointConfig[]|[]} endpoints
 * @property {string|null} urlPart
 * @property {FluentApiEndpoint|T} endpointClass
 */
export interface FluentApiEndpointConfig<T = FluentApiEndpoint> {
    /**
     * Under which property will be created endpoint instance
     */
    property: string;
    /**
     * Subresource endpoints config
     */
    endpoints?: FluentApiEndpointConfig[];
    /**
     * Custom url part for this endpoint
     */
    urlPart?: string;
    /**
     * Custom endpoint class constructor
     */
    endpointClass?: ConstructorType<T>;
}
export declare class FluentApiClient {
    readonly client: AxiosInstance;
    /**
     *
     * @param {AxiosInstance} client
     * @param {string|null} urlPrefix
     * @param {FluentApiEndpointConfig[]} endpoints
     */
    constructor(client: AxiosInstance, urlPrefix?: string, endpoints?: FluentApiEndpointConfig[]);
}
/**
 * Client class factory function
 *
 * @export
 * @template T
 * @param {AxiosInstance} client
 * @param {string} [urlPrefix]
 * @param {FluentApiEndpointConfig[]} [endpoints=[]]
 * @returns {FluentApiClient}
 */
export declare function createClient<T = {
    [key: string]: FluentApiEndpoint;
}>(client: AxiosInstance, urlPrefix?: string, endpoints?: FluentApiEndpointConfig[]): FluentApiClient & T;
export {};
//# sourceMappingURL=FluentApiClient.d.ts.map