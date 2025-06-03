/* import { useState } from "react"; */
import { useCart } from "./hooks/useCart";
import Fot from "../../components/Footer";
/* import lentes from "../../img/lentes2.png"; */
import { CartContext } from "./context/cart";




const Carrito = () => {
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  const total = subtotal + 4.99; // suponiendo que el envío cuesta $4.99


  const { addToCart, removeFromCart } = useCart(CartContext);
  

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Carrito de compras</h1>
      <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0">
        <div className="w-full md:w-2/3">
          {cart.map(producto => (
            <div key={producto.id} className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <img
                  src={producto.vchNomImagen}
                  alt={producto.title}
                  className="w-20 md:w-40 rounded-lg"
                />
                <div className="mx-7">
                  <h2 className="text-lg font-bold text-gray-900">
                    {producto.vchNombreProducto}
                  </h2>
                  <p className="text-xs text-gray-700">{producto.vchDescripcion}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center border-gray-100">
                  <button
                    className="bg-gray-100 text-gray-700 py-1 px-3 rounded-l duration-100 hover:bg-blue-500 hover:text-blue-50"
                    onClick={()=> removeFromCart(producto)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="number"
                    value={producto.quantity}
                    min="1"
                    readOnly
                  />
                  <button
                    className="bg-gray-100 text-gray-700 py-1 px-3 rounded-r duration-100 hover:bg-blue-500 hover:text-blue-50"
                  onClick={()=> addToCart(producto)}
                  disabled={producto.quantity >= producto.Existencias}
                  >
                    {" "}
                    +{" "} 
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">${producto.Precio * producto.quantity}</p>
{/*                   <button
                    onClick={() => clearCart()}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button> */}
                </div>
              </div>
            </div>
            
          ))}
        <button
         onClick={() => clearCart()}
        className="
        mt-6 mb-8 w-64 rounded-md bg-red-500 py-1 font-medium text-blue-50 hover:bg-red-600
      ">
                Eliminar todos los producto
        </button>
        </div>
        <div className="w-full md:w-1/3 mb-8">
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <div className="mb-4 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700"></p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">${total}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 mb-8 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Carrito;
