import config_env from './config/apiConfig';

var config = config_env.default;
const apiClient = (endpoint) => {
    const customFetch = async (
        url,
        method,
        body = undefined,
        token = undefined,
    ) => {
        const options = {
            method: method,
        };

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        options.headers = { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"}
        
        return await fetch(config.host + url, options)
            .then(response => {
                return response
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    };
    const get = (body = undefined, token = undefined) => {
        var response = customFetch(endpoint, "GET", body, token);
        return response;
    };
    const post = async (body = undefined, token = undefined) => {
        if (!body) throw new Error("to make a post you must provide a body");
        return await customFetch(endpoint, "POST", body, token);
    };

    const del = async (id = false, token = undefined) => {
        const url = `${endpoint}`;
        return await customFetch(url, "DELETE", undefined, token);
    };


    return {
        get,
        post,
        del
    };
};

export default apiClient;