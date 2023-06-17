import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
const ItemList = ({ data, selected }) => {

  return (
    <div className="w-full h-full">
      <h2 className="mb-5 font-bold">Artículos disponibles</h2>
      {data?.map((item, index) => (
        <Card key={item.id} item={item} addToCart={selected} />
      ))}
    </div>
  );
};

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.func,
};

const Card = ({ item, addToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);


  return (
    <div>
      <Modal show={showModal} description={item.descripcion} onClose={()=>{setShowModal(false)}}/>
      <div className="w-full border-2 border-slate-500 mb-5 p-5" key={item.id_articulo}>
        <div>
          <img src={item.imagen} alt={item.nombre} />
          <h3>{item.nombre}</h3>
          <p>{item.descripcion}</p>
          <p>Precio: ${item.precio}</p>
          <p>Stock: {item.cantidad}</p>
          <p>SKU: {item.sku}</p>
        </div>
        <div className="w-full p-2">
          <input
            className="w-full text-black mb-3 mt-2 border-2 border-slate-500 p-2 rounded-lg"
            onChange={(e) =>
              setQuantity(parseInt(e.target.value))
            }
            type="number"
            placeholder="Cantidad"
            min={1}
            max={item.cantidad}
          />
          <button
            onClick={() => {
              setShowModal((val)=> !val);
            }}
            className="w-full bg-slate-500 text-white mb-3"
          >
            Ver descripción
          </button>
          <button
            onClick={() => {
              addToCart(item, quantity);
            }}
            className="w-full bg-slate-500 text-white"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
