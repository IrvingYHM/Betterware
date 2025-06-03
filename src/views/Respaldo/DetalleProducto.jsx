import Fot from "../../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./hooks/useCart";
/* import { AddToCartIcon, RemoveFromCartIcon } from "../../components/Icons"; */
import { CartContext } from "./context/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart(CartContext);
  const [producto, setProducto] = useState({ Existencias: 1 });
  const [existencias, setExistencias] = useState(producto.Existencias);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/productos/productosId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ IdProducto: id }),
          }
        );
        const data = await response.json();
        setProducto(data);
        /*         setExistencias(data.Existencias); */
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducto();
  }, [id]);

  const incrementarExistencias = () => {
    if (existencias < producto.Existencias) {
      setExistencias(existencias + 1);
    } else {
      toast.error("No hay suficientes productos en existencia.");
    }
  };

  const decrementarExistencias = () => {
    if (existencias > 0) {
      setExistencias(existencias - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (existencias > 0) {
      const cantidadAAgregar =
        existencias > producto.Existencias ? producto.Existencias : existencias;
      addToCart({ ...producto, quantity: cantidadAAgregar });
      setExistencias(existencias - cantidadAAgregar);
      toast.success("Producto(s) agregado(s) al carrito.");
    } else {
      toast.error("No hay suficientes productos en existencia.");
    }
  };

  const checkProductInCart = () => {
    return cart.some((item) => item.IdProducto === producto.IdProducto);
  };

  return (
    <div>
      <div className="container mx-auto px-6 py-20">
        <div className="md:flex md:items-center">
          <div className="w-full h-64 md:w-1/2 lg:h-96">
            <img
              className="h-full w-full rounded-md object-cover max-w-lg mx-auto "
              src={producto.vchNomImagen}
              alt="Lentes"
            />
          </div>
          <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
            <h3 className="text-black uppercase text-lg font-bold">
              {producto.vchNombreProducto}
            </h3>
            <span className="text-black mt-3 font-bold">
              ${producto.Precio}
            </span>
            <h3 className="text-gray-700  text-sm mt-8">
              Productos disponible
            </h3>
            <span className="text-black mt-3 font-bold">
              {producto.Existencias}
            </span>
            <hr className="my-3" />
            <p className="text-gray-700 mt-4">{producto.vchDescripcion}</p>
            <hr className="my-3" />


            <div className="mt-2">
              <label className="text-gray-700 text-sm" htmlFor="count">
                Cantidad
              </label>
              <div className="flex items-center mt-1">
                <button
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                  onClick={decrementarExistencias}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <span className="text-gray-700 text-lg mx-2">
                  {existencias}
                </span>
                <button
                  className="text-gray-500 focus:outline-none focus:text-gray-600"
                  onClick={incrementarExistencias}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <button
                onClick={agregarAlCarrito}
                className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              >
                Agregar al carrito
              </button>
{/*               <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <Fot />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default DetalleProducto;
