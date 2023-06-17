import * as carritoActions from '../actions/carrito'

export const agregarCarrito = async (formData) =>{
    return await carritoActions.agregarCarrito(formData).then((response) => {
        return response;
    });
}

export const getCarrito = async () =>{
    return await carritoActions.getCarrito().then((response) => {
        return response;
    });
}

export const eliminarCarrito = async () =>{
    return await carritoActions.eliminarCarrito().then((response) => {
        return response;
    });
}

export const eliminarProductoCarrito = async (id) =>{
    return await carritoActions.eliminarProductoCarrito(id).then((response) => {
        return response;
    });
}