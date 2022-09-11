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
            apply: (target, thisArg, args) => {
                return target.getEndpoints(args[0]);
            }
        });
    }
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
    getEndpoints(id) {
        const endpoints = {};
        for (const endpoint of this.endpoints) {
            const ApiEndpointClass = endpoint.apiClass || FluentApiEndpoint;
            if (!endpoint.property) {
                throw new Error(`Missing or invalid "property" property on API endpoint "${JSON.stringify(endpoint)}" definition.`);
            }
            endpoints[endpoint.property] = new ApiEndpointClass(this.client, endpoint.urlPart || endpoint.property, `${this.url}/${id}`, endpoint.endpoints || []);
        }
        return endpoints;
    }
    doGetRequest(url, params = {}, customConfig = {}) {
        return this.client.get(url, { params, ...customConfig });
    }
    doHeadRequest(url, params = {}, customConfig = {}) {
        return this.client.head(url, { params, ...customConfig });
    }
    doPostRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.post(url, data, { params, ...customConfig });
    }
    doPutRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.put(url, data, { params, ...customConfig });
    }
    doPatchRequest(url, data = {}, params = {}, customConfig = {}) {
        return this.client.patch(url, data, { params, ...customConfig });
    }
    doDeleteRequest(url, params = {}, customConfig = {}) {
        return this.client.delete(url, { params, ...customConfig });
    }
    getAll(params = {}) {
        return this.doGetRequest(`/${this.url}`, params);
    }
    getOne(id) {
        return this.doGetRequest(`/${this.url}/${id}`);
    }
    /**
     * Basic CRUD operations
     */
    create(dataset) {
        return this.doPostRequest(`/${this.url}`, dataset);
    }
    read(id = null, params = {}) {
        if (id === null) {
            return this.getAll(params);
        }
        return this.getOne(id);
    }
    update(id, dataset) {
        return this.doPatchRequest(`/${this.url}/${id}`, dataset);
    }
    delete(id) {
        return this.doDeleteRequest(`/${this.url}/${id}`);
    }
    replace(id, dataset) {
        return this.doPutRequest(`/${this.url}/${id}`, dataset);
    }
}
exports.FluentApiEndpoint = FluentApiEndpoint;
