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

  async function buscarProductos(categoria, marca) {
    let url = `http://localhost:3000/productos/filtro_producto?categoria=${categoria}&marca=${marca}`;
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
      <div className="my-32">
        <div className="flex justify-center">
          <div className="p-4 flex items-center flex-col  sm:flex-row ">
            <div className="mb-4 mr-4">
              <label htmlFor="category" className="mx-8">
                Categoría:
              </label>
              <select
                id="category"
                className="capitalize border p-2 mb-2"
                onChange={(e) => {
                  setCategoriaSeleccionada(e.target.value);
                  buscarProductos(e.target.value, selectedMarca);
                }}
              >
                <option value="" disabled>
                  Selecciona{" "}
                </option>
                <option value="all">Todas las categorías</option>
                <option value="Lentes de sol">Lentes de sol</option>
                <option value="Lentes graduados">Lentes graduados</option>
              </select>
            </div>
            <div className="mb-4 mr-4">
              <label htmlFor="marca" className="mx-8">
                Marca:
              </label>
              <select
                id="marca"
                className="capitalize border p-2"
                value={selectedMarca}
                onChange={(e) => {
                  setSelectedMarca(e.target.value);
                  buscarProductos(categoriaSeleccionada, e.target.value);
                }}
              >
                <option value="all">Todas las marcas</option>
                <option value="casio">Casio</option>
                <option value="ray-ban">Ray-Ban</option>
                <option value="oakley">Oakley</option>
              </select>
            </div>
          </div>
        </div>
        <p className="text-center">¡Descubre nuestra colección de lentes!</p>
        <div>
          {productoAgregado && ( // Muestra el mensaje si productoAgregado no es null
            <p className="text-green-500">
              Producto agregado al carrito: {productoAgregado.vchNombreProducto}
            </p>
          )}
        </div>
        <div className="flex flex-row flex-wrap justify-around mt-8 mx-4">
          {resultadosCategoria.map((producto) => {
            return (
              <div
                key={producto.IdProducto}
                className="w-80 bg-blue-100 shadow-xl rounded-xl mr-4 mb-4 flex flex-col"
              >
                <div
                  className="h-48 w-full flex flex-col justify-between p-4 bg-cover bg-center"
                >
                  <img
                    src={producto.vchNomImagen}
                    alt="Producto"
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-2 flex flex-col items-center">
                  <h1 className="text-gray-800 text-center mt-1">
                    Nombre: {producto.vchNombreProducto}
                  </h1>
                  <h1 className="text-gray-800 text-center mt-1">
                    Categoría: {producto.categoria.NombreCategoria}
                  </h1>
                  <h1 className="text-gray-800 text-center mt-1">
                    Marca: {producto.marca.NombreMarca}
                  </h1>
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
                  <p className="text-center text-gray-800 mt-1">
                    ${producto.Precio}
                  </p>
                  <Link
                    to={`/productoDetalle/${producto.IdProducto}`}
                    className="py-2 px-4 rounded-lg disabled:opacity-50 mt-4 w-full flex items-center justify-center   bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                  >
                    Ver producto
                  </Link>
                  <div className="flex justify-between w-full mt-4"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Fot />
    </div>
  );
};
export default Lentes;
