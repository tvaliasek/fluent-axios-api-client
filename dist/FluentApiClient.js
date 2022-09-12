"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.FluentApiClient = void 0;
const FluentApiEndpoint_1 = require("./FluentApiEndpoint");
class FluentApiClient {
    /**
     *
     * @param {AxiosInstance} client
     * @param {string|null} urlPrefix
     * @param {FluentApiEndpointConfig[]} endpoints
     */
    constructor(client, urlPrefix, endpoints = []) {
        var _a, _b, _c;
        this.client = client;
        const endpointProps = {};
        for (const endpoint of endpoints) {
            const ApiEndpointClass = (_a = endpoint.endpointClass) !== null && _a !== void 0 ? _a : FluentApiEndpoint_1.FluentApiEndpoint;
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`);
            }
            endpointProps[endpoint.property] = new ApiEndpointClass(this.client, (_b = endpoint.urlPart) !== null && _b !== void 0 ? _b : endpoint.property, urlPrefix, (_c = endpoint.endpoints) !== null && _c !== void 0 ? _c : []);
        }
        Object.assign(this, endpointProps);
    }
}
exports.FluentApiClient = FluentApiClient;
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
function createClient(client, urlPrefix, endpoints = []) {
    return new FluentApiClient(client, urlPrefix, endpoints);
}
exports.createClient = createClient;
