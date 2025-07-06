import Fot from "../../components/Footer";
import { useEffect, useState } from "react";
/* import lentes from "../../img/lentes2.png"; */
import { obtenerProductos } from "./Api";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";


const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [resultadosCategoria, setResultadosCategoria] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("all");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [productoAgregado, setProductoAgregado] = useState(null); // Nuevo estado para manejar el producto agregado


  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        setProductos(data);
        setResultadosCategoria(data); // Inicializar resultadosCategoria con todos los productos
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function buscarProductos(categoria) {
    let url = `https://backbetter-production.up.railway.app/productos_Better/filtro_producto?categoria=${categoria}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResultadosCategoria(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex-center">
    <Barra/>
      <div className="mt-40 mb-10">
        <div>
          {productoAgregado && ( // Muestra el mensaje si productoAgregado no es null
            <p className="text-green-500">
              Producto agregado al carrito: {productoAgregado.vchNombreProducto}
            </p>
          )}
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-6 mt-8">
          {resultadosCategoria.map((producto) => {
            return (
              <Link
                to={`/productoDetalle/${producto.IdProducto}`}
                key={producto.IdProducto}
                className="w-80 bg-white hover:bg-blue-200 shadow-xl rounded-xl flex flex-col"
              >
                <div className="h-full w-full flex flex-col justify-between p-4 bg-cover bg-center">
                  <img
                    src={producto.vchNomImagen}
                    alt="Producto"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="pb-4 flex flex-col items-center">
                  <h1 className="text-center font-semibold lg:text-lg">
                    {producto.vchNombreProducto}
                  </h1>
                  {/* <h1 className="text-center mt-1">
                    Categoría: {producto.categoria.NombreCategoria}
                  </h1> */}
                  <p className="text-center font-bold lg:text-lg mt-1">
                    ${producto.Precio}
                  </p>
                  {
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
                      <span className="text-gray-600">
                        {producto.Existencias}
                      </span>
                    </div>
                  }
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Fot />
    </div>
  );
};
export default Lentes;
