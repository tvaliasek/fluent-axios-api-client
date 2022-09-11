import { AxiosInstance } from 'axios'
import { FluentApiEndpoint } from './FluentApiEndpoint'

type ConstructorType<T> = new (...args : any[]) => T;

export interface FluentApiEndpointConfig<T = FluentApiEndpoint> {
    property: string,
    endpoints: FluentApiEndpointConfig[],
    urlPart?: string,
    apiClass?: ConstructorType<T>
}

export class FluentApiClient {
    constructor (
        public readonly client: AxiosInstance,
        urlPrefix?: string,
        endpoints: FluentApiEndpointConfig[] = []
    ) {
        const endpointProps: Record<string, any> = {}
        for (const endpoint of endpoints) {
            const ApiEndpointClass = endpoint.apiClass ?? FluentApiEndpoint
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

export function createClient<T = { [key: string]: FluentApiEndpoint }> (client: AxiosInstance, urlPrefix?: string, endpoints: FluentApiEndpointConfig[] = []) {
    return new FluentApiClient(client, urlPrefix, endpoints) as FluentApiClient & T
}
