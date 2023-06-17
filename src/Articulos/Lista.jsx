import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticulo } from "../api/controller/ArticulosController";
import ItemList from "../Components/ItemList/ItemList";
import { agregarCarrito } from "../api/controller/CarritoController";
import Alert from "../Components/Alert/Alert";
function Lista() {
  const history = useNavigate();
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("Error");

  useEffect(() => {
    handleProducts();
  });

  const handlerAgregarCarrito = async (item, quantity) => {
    console.log("handlerAgregarCarrito", item);
    let body = {
      producto_id: item.id_articulo,
      cantidad: quantity,
    };

    console.log("body", body);
    await agregarCarrito(body).then(async (response) => {
        let res = await response.json();
        console.log(response);
        console.log(res);
      if (response.status === 200) {
        setAlertMessage('Artículo agregado correctamente al carrito');
        setError(true);
        setAlertType('Success');
        handleProducts();

      }
    });
  };

  const handleProducts = async () => {
    await getArticulo(value).then(async (response) => {
      if (response.status === 200) {
        let res = await response.json();
        console.log(res.data);
        setProducts(res.data);
      }
    });
  };

  const onCloseHandler = () => {
    setError(null);
    setAlertType("Error");
    setAlertMessage("");
  };

  const handlerVerCarrito = () =>{
    history(`/carrito`)
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-10 mb-10">
      <h1>Lista de artículos</h1>
      <div className="w-1/2 h-1/2 flex flex-col items-center mt-5">
        <div className="w-1/3 mb-10">
          <input
            type="text"
            placeholder="Buscar"
            onChange={(e) => setValue(e.target.value)}
            className="w-full border-2 rounded-lg text-black mb-3 p-1"
          />
          <button
            onClick={handleProducts}
            className="w-full bg-slate-500 text-white"
          >
            Buscar artículos
          </button>
          <button
            onClick={handlerVerCarrito}
            className="w-full bg-slate-500 text-white mt-3"
          >
            Carrito de compras
          </button>
        </div>
        <div className="w-1/2 ">

          <div className="w-full overflow-hidden mb-5">
            <Alert
              type={alertType}
              show={error != null}
              title={alertMessage}
              onClose={onCloseHandler}
            />
          </div>
          <ItemList
            data={products}
            selected={handlerAgregarCarrito}
          />
        </div>
      </div>
    </div>
  );
}

export default Lista;
