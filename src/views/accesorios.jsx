import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [precio, setPrecio] = useState('');
    const [producto, setProducto] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/procesar-pago', {
                precio,
                producto,
            });
            window.location.href = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='py-32'>
            <h1>Pasarela de Pago de Mercado Pago</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Precio:
                    <input type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </label>
                <label>
                    Producto:
                    <input type="text" value={producto} onChange={(e) => setProducto(e.target.value)} />
                </label>
                <button type="submit">Pagar</button>
            </form>
        </div>
    );
};

export default App;
