import * as articulosActions from '../actions/articulos'

export const createArticulo = async (formData) =>{
    return await articulosActions.create(formData).then((response) => {
        return response;
    });
}