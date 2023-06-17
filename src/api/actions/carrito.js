import apiClient from '../client';
import config_env from '../config/apiConfig';
var config = config_env.default;

export const agregarCarrito = async (formData) =>{
    const objApi = apiClient('AgregarCarrito?code='+config.key);
    try {
        var response = await objApi.post(formData)
        return response;
    } catch (e) {
        console.log("Error ===>", e)
    }
}

export const getCarrito = async () =>{
    const objApi = apiClient('VerCarrito?code='+config.key);
    try {
        var response = await objApi.get()
        return response;
    } catch (e) {
        console.log("Error ===>", e)
    }

}

export const eliminarCarrito = async () =>{
    const objApi = apiClient('DropCarrito?code='+config.key);
    try {
        var response = await objApi.del()
        return response;
    } catch (e) {
        console.log("Error ===>", e)
    }
}

export const eliminarProductoCarrito = async (id) =>{
    const objApi = apiClient('DeleteCarrito?code='+config.key+"&id_articulo="+id);
    try {
        var response = await objApi.del(id)
        return response;
    } catch (e) {
        console.log("Error ===>", e)
    }
}