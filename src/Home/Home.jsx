import '../App.css'
import { useNavigate } from 'react-router-dom';
function Home() {

    const history = useNavigate();

    const handleCapture = () => {
        history(`/captura`)
        console.log('Captura de artículo')
    }
    
    const handlePurchase = () => {
        history(`/articulos`)
        console.log('Compra de artículos')
    }

  return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h1>Carrito de compras</h1>
            <div className='w-1/2 h-1/2 flex flex-col items-center justify-center'>
                <div className='w-1/2 mb-10'>
                    <button onClick={handleCapture} className='w-full bg-slate-500 text-white'>Captura de artículo</button>
                </div>
                <div className='w-1/2'>
                    <button onClick={handlePurchase} className='w-full bg-slate-500 text-white'>Compra de artículos</button>
                </div>
            </div>
        </div>
  )
}

export default Home
