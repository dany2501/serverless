import * as articulosActions from '../actions/articulos'

export const createArticulo = async (formData) =>{
    return await articulosActions.create(formData).then((response) => {
        return response;
    });
}

export const getArticulo = async (value) =>{
    return await articulosActions.get(value).then((response) => {
        return response;
    });
}