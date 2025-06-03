import Fot from "../components/Footer";
import { useEffect, useState } from "react";
import lentes from "../img/lentes2.png";

const Lentes = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://backendopti-production.up.railway.app/productos/Productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex-center">
      <div className="my-32">
        <p className="text-center">¡Descubre nuestra colección de lentes!</p>

        {/* Renderizar productos */}
        <div className="flex flex-row flex-wrap justify-around mt-8">
          {productos.map((producto) => (
            <div
              key={producto.IdProducto}
              className="w-80 bg-white shadow rounded mr-4 mb-4 flex flex-col"
            >
              <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${lentes})` }}
              >
                <div className="flex justify-between">
                  <input type="checkbox" />
                  <button className="text-white hover:text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                    available
                  </span>
                </div>
              </div>
              <div className="p-2 flex flex-col items-center">
                <p className="text-gray-400 font-light text-xs text-center">
                  Hammond robotics
                </p>
                <h1 className="text-gray-800 text-center mt-1">
                  {producto.vchNombreProducto}
                </h1>

                {/* Existencia */}
{                <div className="flex items-center justify-center bg-gray-100 rounded-full py-1 px-3 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 112 0 1 1 0 01-2 0zM5 9a1 1 0 112 0 1 1 0 01-2 0zm10 0a1 1 0 112 0 1 1 0 01-2 0zM6.293 7.293a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600">{producto.Existencia}</span>
                </div>}


                <p className="text-center text-gray-800 mt-1">
                  ${producto.Precio}
                </p>
                <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
                  Agregar al carrito
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
                <div className="flex justify-between w-full mt-4">
                  <div className="flex items-center text-gray-500">
                    <input id="input1" type="checkbox" className="mr-2" />
                    <label
                      htmlFor="input1"
                      className="select-none cursor-pointer"
                    >
                      Compare
                    </label>
                  </div>
                  <div>
                    <button className="py-1 px-4 bg-white text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
                      Add to List
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Fot />
    </div>
  );
};

export default Lentes;
