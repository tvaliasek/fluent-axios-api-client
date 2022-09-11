"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluentApiEndpoint = void 0;
class FluentApiEndpoint extends Function {
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
     */
    get url() {
        const url = `${this.urlPrefix ?? ''}/${this.urlPart}`.replace(/\/{2,}/g, '/').split('');
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
     */
    getEndpoints(id = null) {
        const endpoints = {};
        for (const endpoint of this.endpoints) {
            const ApiEndpointClass = endpoint.endpointClass || FluentApiEndpoint;
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`);
            }
            endpoints[endpoint.property] = new ApiEndpointClass(this.client, endpoint.urlPart || endpoint.property, (id === null) ? this.url : `${this.url}/${id}`, endpoint.endpoints || []);
        }
        return endpoints;
    }
    /**
     * Generic GET request
     */
    doGetRequest(url, params = {}, customConfig = {}) {
        return this.client.get(url, { params, ...customConfig });
    }
    /**
     * Generic HEAD request
     */
    doHeadRequest(url, params = {}, customConfig = {}) {
        return this.client.head(url, { params, ...customConfig });
    }
    /**
     * Generic POST request
     */
    doPostRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.post(url, data, { params, ...customConfig });
    }
    /**
     * Generic PUT request
     */
    doPutRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.put(url, data, { params, ...customConfig });
    }
    /**
     * Generic PATCH request
     */
    doPatchRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.patch(url, data, { params, ...customConfig });
    }
    /**
     * Generic DELETE request
     */
    doDeleteRequest(url, params = {}, customConfig = {}) {
        return this.client.delete(url, { params, ...customConfig });
    }
    /**
     * Do a GET request to retrieve all records
     */
    getAll(params = {}) {
        return this.doGetRequest(`/${this.url}`, params);
    }
    /**
     * Do a GET request to retrieve specific record
     */
    getOne(id) {
        return this.doGetRequest(`/${this.url}/${id}`);
    }
    /**
     * Do a POST request to create record
     */
    create(dataset) {
        return this.doPostRequest(`/${this.url}`, dataset);
    }
    /**
     * Do a GET request to retrieve specific record or specific record if you specify ID parameter
     */
    read(id = null, params = {}) {
        if (id === null) {
            return this.getAll(params);
        }
        return this.getOne(id);
    }
    /**
     * Do a PATCH request to update specific record
     */
    update(id, dataset) {
        return this.doPatchRequest(`/${this.url}/${id}`, dataset);
    }
    /**
     * Do a DELETE request to delete specific record
     */
    delete(id) {
        return this.doDeleteRequest(`/${this.url}/${id}`);
    }
    /**
     * Do a PUT request to replace or update specific record
     */
    replace(id, dataset) {
        return this.doPutRequest(`/${this.url}/${id}`, dataset);
    }
}
exports.FluentApiEndpoint = FluentApiEndpoint;
