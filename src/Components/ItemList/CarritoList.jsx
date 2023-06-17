import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalDelete from "../Modal/ModalDelete";
const CarritoList = ({ data, selected, deleteFromCart }) => {

  return (
    <div className="w-full h-full">
      <h2 className="mb-5 font-bold">Mis artículos</h2>
      {data?.map((item, index) => (
        <Card key={item.id} item={item} addToCart={selected} deleteFromCart={deleteFromCart}/>
      ))}
    </div>
  );
};

CarritoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const Card = ({ item, addToCart, deleteFromCart }) => {
  const [quantity, setQuantity] = useState(item.cantidad);
  const [showModal, setShowModal] = useState(false);

  const onCancelHandler = ( )=>{
    setShowModal(false)
  }
  
  const onConfirmHandler = ()=>{
    deleteFromCart(item.articulo);
    setShowModal(false)
  }

  return (
    <div>
      <ModalDelete show={showModal} description={"¿Estás seguro que lo quieres eliminar?"} onClose={()=>{setShowModal(false)}} onCancel={onCancelHandler} onConfirm={onConfirmHandler}/>
      <div className="w-full border-2 border-slate-500 mb-5 p-5" key={item.articulo.id_articulo}>
        <div>
          <img src={item.imagen} alt={item.articulo.nombre} />
          <h3>{item.articulo.nombre}</h3>
          <p>{item.articulo.descripcion}</p>
          <p>Precio: ${item.articulo.precio}</p>
          <p>Disponibles: {item.cantidad}</p>
          <p>SKU: {item.articulo.sku}</p>
          <p>Costo: ${quantity*item.articulo.precio}</p>
        </div>
        <div className="w-full p-2">
          <input
            className="w-full text-black mb-3 mt-2 border-2 border-slate-500 p-2 rounded-lg"
            value={quantity}
            onChange={(e) =>
              setQuantity(parseInt(e.target.value))
            }
            type="number"
            placeholder="Cantidad"
            min={1}
            max={item.articulo.cantidad+item.cantidad}
          />
          <button
            onClick={() => {
              addToCart(item.articulo, quantity);
            }}
            className="w-full bg-slate-500 text-white"
          >
            Agregar al carrito
          </button>
          <button
            onClick={() => {
              setShowModal(true);
              //deleteFromCart(item.articulo);
            }}
            className="w-full bg-slate-500 text-white mt-3"
          >
            Eliminar del carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarritoList;
