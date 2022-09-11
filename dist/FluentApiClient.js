"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.FluentApiClient = void 0;
const FluentApiEndpoint_1 = require("./FluentApiEndpoint");
class FluentApiClient {
    constructor(client, urlPrefix, endpoints = []) {
        this.client = client;
        const endpointProps = {};
        for (const endpoint of endpoints) {
            const ApiEndpointClass = endpoint.apiClass ?? FluentApiEndpoint_1.FluentApiEndpoint;
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`);
            }
            endpointProps[endpoint.property] = new ApiEndpointClass(this.client, endpoint.urlPart ?? endpoint.property, urlPrefix, endpoint.endpoints ?? []);
        }
        Object.assign(this, endpointProps);
    }
}
exports.FluentApiClient = FluentApiClient;
function createClient(client, urlPrefix, endpoints = []) {
    return new FluentApiClient(client, urlPrefix, endpoints);
}
exports.createClient = createClient;
