import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticulo } from "../api/controller/ArticulosController";
import CarritoList from "../Components/ItemList/CarritoList";
import { agregarCarrito, getCarrito, eliminarCarrito, eliminarProductoCarrito } from "../api/controller/CarritoController";
import Alert from "../Components/Alert/Alert";
import ModalDelete from "../Components/Modal/ModalDelete";
function Carrito() {
  const history = useNavigate();
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("Error");

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    handleProducts();
  }, []);

  const handlerAgregarCarrito = async (item, quantity) => {
    let body = {
      producto_id: item.id_articulo,
      cantidad: quantity,
    };
    await agregarCarrito(body).then(async (response) => {
        let res = await response.json();
        console.log(response);
        console.log(res);
      if (response.status === 200) {
        setAlertMessage('Articulo modificado correctamente en el carrito');
        setError(true);
        setAlertType('Success');
        handleProducts();

      }
    });
  };

  const handleProducts = async () => {
    await getCarrito(value).then(async (response) => {
      if (response.status === 200) {
        let res = await response.json();
        console.log(res.data);
        setProducts(res.data);
      }
    });
  };

  const handlerArticulos = () => {
    history(`/articulos`)
    console.log('Compra de artículos')
}

  const handleDropCarrito = async () => {

    await eliminarCarrito().then(async (response) => {
        if (response.status === 200) {
            let res = await response.json();
            console.log(res.data);
            setProducts(res.data);
            setAlertMessage('Carrito vaciado correctamente');
            setError(true);
            setAlertType('Success');
            handleProducts();
        }
    })
    
  }

  const handlerDeleteFromCart = async (item) => {
    await eliminarProductoCarrito(item.id_articulo).then(async (response) => {
        if (response.status === 200) {
            let res = await response.json();
            console.log(res.data);
            setProducts(res.data);
            setAlertMessage('Artículo eliminado correctamente del carrito');
            setError(true);
            setAlertType('Success');
            handleProducts();
        }
    })
  }

  const onCloseHandler = () => {
    setError(null);
    setAlertType("Error");
    setAlertMessage("");
  };

  const onCancelHandler = ( )=>{
    setShowModal(false)
  }
  
  const onConfirmHandler = ()=>{
    handleDropCarrito();
    setShowModal(false)
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-10 mb-10">
        
        <ModalDelete show={showModal} description={'¿Está seguro que deseas vaciar el carrito?'} onClose={()=>{setShowModal(false)}} onCancel={onCancelHandler} onConfirm={onConfirmHandler}/>
      <h1>Mi carrito</h1>
      <div className="w-1/2 h-1/2 flex flex-col items-center mt-5">
        <div className="w-1/3 mb-10">
          <button
            onClick={()=>{setShowModal(true)}}
            className="w-full bg-slate-500 text-white mt-3"
          >
            Vaciar carrito
          </button>
          <button
            onClick={handlerArticulos}
            className="w-full bg-slate-500 text-white mt-3"
          >
            Seguir comprando
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
          <CarritoList
            data={products}
            selected={(handlerAgregarCarrito)}
            deleteFromCart={handlerDeleteFromCart}
          />
        </div>
      </div>
    </div>
  );
}

export default Carrito;
