import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './Home/Home';
import Capture from './Articulos/Captura';
import Purchase from './Articulos/Lista';
import Carrito from './Carrito/Carrito';
function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/captura" element={<Capture />}/>
          <Route path="/articulos" element={<Purchase />}/>
          <Route path="/carrito" element={<Carrito />}/>
        </Routes>
      </div>
    </BrowserRouter>
    )
}

export default App;
