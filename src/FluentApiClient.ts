import { AxiosInstance } from 'axios'
import { FluentApiEndpoint } from './FluentApiEndpoint'

type ConstructorType<T> = new (...args : any[]) => T;
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
    property: string,
    /**
     * Subresource endpoints config
     */
    endpoints?: FluentApiEndpointConfig[],
    /**
     * Custom url part for this endpoint
     */
    urlPart?: string,
    /**
     * Custom endpoint class constructor
     */
    endpointClass?: ConstructorType<T>
}

export class FluentApiClient {
    /**
     * 
     * @param {AxiosInstance} client 
     * @param {string|null} urlPrefix 
     * @param {FluentApiEndpointConfig[]} endpoints 
     */
    constructor (
        public readonly client: AxiosInstance,
        urlPrefix?: string,
        endpoints: FluentApiEndpointConfig[] = []
    ) {
        const endpointProps: Record<string, any> = {}
        for (const endpoint of endpoints) {
            const ApiEndpointClass = endpoint.endpointClass ?? FluentApiEndpoint
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`)
            }
            endpointProps[endpoint.property] = new ApiEndpointClass(
                this.client,
                endpoint.urlPart ?? endpoint.property,
                urlPrefix,
                endpoint.endpoints ?? []
            )
        }
        Object.assign(this, endpointProps)
    }
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
export function createClient<T = { [key: string]: FluentApiEndpoint }> (client: AxiosInstance, urlPrefix?: string, endpoints: FluentApiEndpointConfig[] = []) {
    return new FluentApiClient(client, urlPrefix, endpoints) as FluentApiClient & T
}
