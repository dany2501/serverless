import apiClient from '../client';
import config_env from '../config/apiConfig';
var config = config_env.default;

export const create = async (formData) =>{
    const objApi = apiClient('CreateProduct?code='+config.key);
    try {
        var response = await objApi.post(formData)
        return response;
    } catch (e) {
        console.log("Error ===>", e)
    }
}

export const get = async (value) =>{
    const objApi = apiClient('GetProducts?value='+value+'&code='+config.key);
    try {
        var response = await objApi.get()
        return response;
    } catch (e) {
        console.log("Error ===>", e)
    }
}