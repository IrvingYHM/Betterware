import { useLocation } from "react-router-dom";
import Fot from "../../components/Footer";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra"


function ProductosEncontrados() {
  const location = useLocation();
  const productos = location.state.productos;

  return (
    <div className="flex-center">
          <Barra/>
      <div className="my-32">
        <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">Productos encontrados</p>

        {/* Renderizar productos */}
        <div className="flex flex-row flex-wrap justify-around mt-8">
          {productos.map((producto) => (
            <div
              key={producto.IdProducto}
              className="w-80 bg-white shadow rounded mr-4 mb-4 flex flex-col"
            >
              <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${producto.vchNomImagen})` }}
              >
              </div>
              <div className="p-2 flex flex-col items-center">
                <h1 className="text-gray-800 text-center mt-1">
                  {producto.vchNombreProducto}
                </h1>
{/*                 <h1 className="text-gray-800 text-center mt-1">
                    Categoría: {producto.categoria.NombreCategoria}
                  </h1>
                  <h1 className="text-gray-800 text-center mt-1">
                    Marca: {producto.marca.NombreMarca}
                  </h1> */}

                {/* Existencia */}
                <div className="flex items-center justify-center bg-gray-100 rounded-full py-1 px-3 mt-2">
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
                  <span className="text-gray-600">{producto.Existencias}</span>
                </div>

                <p className="text-center text-gray-800 mt-1">
                  ${producto.Precio}
                </p>
                <Link
                    to={`/productoDetalle/${producto.IdProducto}`}
                    className="py-2 px-4 disabled:opacity-50 mt-4 w-full flex items-center justify-center   bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                  >
                    Ver producto
                  </Link>
                  <div className="flex justify-between w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Fot />
    </div>
  );
}

export default ProductosEncontrados;
