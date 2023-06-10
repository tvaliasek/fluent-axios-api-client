"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluentApiEndpoint = void 0;
class FluentApiEndpoint extends Function {
    /**
     * Creates an instance of FluentApiEndpoint.
     * @param {AxiosInstance} client
     * @param {(string|null)} [urlPart=null]
     * @param {(string|null)} [urlPrefix=null]
     * @param {FluentApiEndpointConfig[]} [endpoints=[]]
     * @memberof FluentApiEndpoint
     */
    constructor(client, urlPart = null, urlPrefix = null, endpoints = []) {
        super();
        this.client = client;
        this.urlPart = urlPart;
        this.urlPrefix = urlPrefix;
        this.endpoints = endpoints;
        return new Proxy(this, {
            apply: (target, thisArg, args = [null]) => {
                return target.getEndpoints(args[0]);
            }
        });
    }
    /**
     * get url address without leading "/"
     * @readonly
     * @type {string}
     * @memberof FluentApiEndpoint
     */
    get url() {
        var _a;
        const url = `${(_a = this.urlPrefix) !== null && _a !== void 0 ? _a : ''}/${this.urlPart}`.replace(/\/{2,}/g, '/').split('');
        if (url[0] === '/') {
            url[0] = '';
        }
        if (url[url.length - 1] === '/') {
            url[url.length - 1] = '';
        }
        return url.join('');
    }
    /**
     * Generate subresource endpoints with prefixed url
     * @template T
     * @param {(string|number|null)} [id=null]
     * @returns {T}
     * @memberof FluentApiEndpoint
     */
    getEndpoints(id = null) {
        var _a;
        const endpoints = {};
        for (const endpoint of this.endpoints) {
            const ApiEndpointClass = (_a = endpoint.endpointClass) !== null && _a !== void 0 ? _a : FluentApiEndpoint;
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`);
            }
            endpoints[endpoint.property] = new ApiEndpointClass(this.client, endpoint.urlPart || endpoint.property, (id === null) ? this.url : `${this.url}/${id}`, endpoint.endpoints || []);
        }
        return endpoints;
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
    doGetRequest(url, params = {}, customConfig = {}) {
        return this.client.get(url, Object.assign({ params }, customConfig));
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
    doHeadRequest(url, params = {}, customConfig = {}) {
        return this.client.head(url, Object.assign({ params }, customConfig));
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
    doPostRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.post(url, data, Object.assign({ params }, customConfig));
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
    doPutRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.put(url, data, Object.assign({ params }, customConfig));
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
    doPatchRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.patch(url, data, Object.assign({ params }, customConfig));
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
    doDeleteRequest(url, params = {}, customConfig = {}) {
        return this.client.delete(url, Object.assign({ params }, customConfig));
    }
    /**
     * Do a GET request to retrieve all records
     *
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getAll(params = {}) {
        return this.doGetRequest(`/${this.url}`, params);
    }
    /**
     * Do a GET request to retrieve specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    getOne(id, params = {}) {
        return this.doGetRequest(`/${this.url}/${id}`, params);
    }
    /**
     * Do a POST request to create record
     *
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    create(dataset) {
        return this.doPostRequest(`/${this.url}`, dataset);
    }
    /**
     * Do a GET request to retrieve specific record or specific record if you specify ID parameter
     *
     * @param {(string|number|null)} [id=null]
     * @param {Record<string, any>} [params={}]
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    read(id = null, params = {}) {
        if (id === null) {
            return this.getAll(params);
        }
        return this.getOne(id, params);
    }
    /**
     * Do a PATCH request to update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    update(id, dataset) {
        return this.doPatchRequest(`/${this.url}/${id}`, dataset);
    }
    /**
     * Do a DELETE request to delete specific record
     *
     * @param {(string|number)} id
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    delete(id) {
        return this.doDeleteRequest(`/${this.url}/${id}`);
    }
    /**
     * Do a PUT request to replace or update specific record
     *
     * @param {(string|number)} id
     * @param {Record<string, any>} dataset
     * @returns {Promise<AxiosResponse>}
     * @memberof FluentApiEndpoint
     */
    replace(id, dataset) {
        return this.doPutRequest(`/${this.url}/${id}`, dataset);
    }
}
exports.FluentApiEndpoint = FluentApiEndpoint;
//# sourceMappingURL=FluentApiEndpoint.js.map