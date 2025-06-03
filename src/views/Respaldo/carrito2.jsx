
import { useState } from 'react';

const Carrito = () => {
  const [subtotal, setSubtotal] = useState(129.99);
  const [cantidadProducto1, setCantidadProducto1] = useState(2);
  const [cantidadProducto2, setCantidadProducto2] = useState(2);

  const handleChangeCantidad = (producto, cantidad) => {
    if (producto === 1) {
      setCantidadProducto1(cantidad);
    } else if (producto === 2) {
      setCantidadProducto2(cantidad);
    }
  };

  const handleRemoveProducto = (producto) => {
    if (producto === 1) {
      setCantidadProducto1(0);
    } else if (producto === 2) {
      setCantidadProducto2(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Carrito de compras</h1>
      <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0">
        <div className="w-full md:w-2/3">
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-20 md:w-40 rounded-lg" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
                <p className="text-xs text-gray-700">36EU - 4US</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border-gray-100">
                <button onClick={() => handleChangeCantidad(1, cantidadProducto1 - 1)} className="bg-gray-100 text-gray-700 py-1 px-3 rounded-l duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cantidadProducto1} min="1" readOnly />
                <button onClick={() => handleChangeCantidad(1, cantidadProducto1 + 1)} className="bg-gray-100 text-gray-700 py-1 px-3 rounded-r duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">$ 259.000 </p>
                <button onClick={() => handleRemoveProducto(1)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" className="w-20 md:w-40 rounded-lg" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
                <p className="text-xs text-gray-700">36EU - 4US</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center border-gray-100">
                <button onClick={() => handleChangeCantidad(2, cantidadProducto2 - 1)} className="bg-gray-100 text-gray-700 py-1 px-3 rounded-l duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cantidadProducto2} min="1" readOnly />
                <button onClick={() => handleChangeCantidad(2, cantidadProducto2 + 1)} className="bg-gray-100 text-gray-700 py-1 px-3 rounded-r duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">259.000 ₭</p>
                <button onClick={() => handleRemoveProducto(2)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <div className="mb-4 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
