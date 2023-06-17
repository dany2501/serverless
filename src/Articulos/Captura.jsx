import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../Components/Alert/Alert'
import { createArticulo } from '../api/controller/ArticulosController';
function Captura() {

    const history = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [sku, setSku] = useState('');
    const [image, setImage] = useState('');
    const [base64Image, setBase64Image] = useState('');

    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('Error');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setBase64Image(base64String);
            setImage(reader.result)
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };

    const handlerSave = async () => {
        if (name === '' || description === '' || price === '' || quantity <= 0 || sku === '' || base64Image === '') {
            setAlertMessage('Todos los campos son obligatorios');
            setError(true);
            setAlertType('Warning');
            return 
        }
        let json = {
            nombre: name,
            descripcion: description,
            precio: price,
            cantidad: quantity,
            sku: sku,
            image: base64Image
        }
        await createArticulo(json).then((response) => {
            if (response.status === 200) {
                setAlertMessage('Artículo creado correctamente');
                setError(true);
                setAlertType('Success');
                setTimeout(() => {
                    history('/articulos')
                }, 2000)
            } else {
                setAlertMessage('Error al crear el artículo');
                setError(true);
                setAlertType('Error');
            }
        })

    }

    const onCloseHandler = () => {
        setError(null)
        setAlertType('Error');
        setAlertMessage('')
    }

  return (
        <div className="w-full h-full flex flex-col items-center mt-10 mb-10">
            <h1>Captura de artículo</h1>
            <div className='w-1/2 h-full flex flex-col items-center justify-center fixed'>
                <div className='w-1/2 h-2/3'>
                    <div className="w-full overflow-hidden mb-5">
                        <Alert type={alertType} show={error != null} title={alertMessage} onClose={onCloseHandler} />
                    </div>
                    <input onChange={(event) => {setName(event.target.value)}} type="text" placeholder="Nombre del artículo" className='w-full border-2 border-slate-500 rounded-lg mb-5'/>
                    <input onChange={(event) => {setDescription(event.target.value)}} type="text" placeholder="Descripción del artículo" className='w-full border-2 border-slate-500 rounded-lg mb-5'/>
                    <input onChange={(event) => {setPrice(event.target.value)}} type="text" placeholder="Precio del artículo" className='w-full border-2 border-slate-500 rounded-lg mb-5'/>
                    <input onChange={(event) => {setQuantity(event.target.value)}} type="text" placeholder="Cantidad del artículo" className='w-full border-2 border-slate-500 rounded-lg mb-5'/>
                    <input onChange={(event) => {setSku(event.target.value)}} type="text" placeholder="SKU" className='w-full border-2 border-slate-500 rounded-lg mb-5'/>
                    <input type="file" accept="image/*" onChange={handleImageChange} className='w-full mb-5'/>
                    {image && <img src={image} alt="Preview" className='h-20 w-20'/>}
                    <button onClick={handlerSave} className='w-full bg-slate-500 text-white'>Guardar</button>
                </div>
            </div>
        </div>
  )
}

export default Captura
