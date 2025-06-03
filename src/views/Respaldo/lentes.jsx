import Fot from "../components/Footer";
import { useEffect, useState } from "react";
import lentes from "../img/lentes2.png";
/* import SearchAdvanced from "../views/Busqueda/searchAdvanced"; */

const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [resultadosCategoria, setResultadosCategoria] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState("all");
  const [resultados, setResultados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");


  useEffect(() => {
    fetch("http://localhost:3000/productos/Productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
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
              <label htmlFor="graduacion" className="mx-8">
                Graduación:
              </label>
              <select id="graduacion" className="capitalize border p-2">
                <option>Selecciona </option>
                <option value="all">Todas las graduaciones</option>
                <option value="none">Sin graduación</option>
                <option value="myopia">Miopía</option>
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

        {/* Renderizar productos */}
        <div className="flex flex-row flex-wrap justify-around mt-8">
          {resultadosCategoria.map((producto) => (
            <div
              key={producto.IdProducto}
              className="w-80 bg-white shadow rounded mr-4 mb-4 flex flex-col"
            >
              <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${lentes})` }}
              >
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
                    <span className="text-gray-600">{producto.Existencias}</span>
                  </div>
                }

                <p className="text-center text-gray-800 mt-1">
                  ${producto.Precio}
                </p>
                <button className="py-2 px-4 bg-black text-white rounded active:bg-slate-800 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
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
};

export default Lentes;
