import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";
import SkeletonProductCard from "../../../components/SkeletonProductCard";
import { API_ENDPOINTS } from "../../../service/apirest";

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [mostrarDescripcion, setMostrarDescripcion] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.productos.getAllAdmin)
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        const categoriasMap = {};
        data.forEach((producto) => {
          categoriasMap[producto.IdCategoria] =
            producto.categoria.NombreCategoria;
        });
        setCategorias(categoriasMap);
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // ✅ TERMINA LA CARGA
      });
  }, []);

  const toggleDescripcion = (id) => {
    setMostrarDescripcion((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 mt-6 mb-10">
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-row flex-wrap justify-center gap-6">
              {productos.map((producto) => (
                <div
                  key={producto.IdProducto}
                  className="w-72 bg-white rounded-xl shadow-md flex flex-col justify-between"
                >
                  <div className="relative w-full rounded-t overflow-hidden">
                    <img
                      src={producto.vchNomImagen}
                      alt={producto.vchNombreProducto}
                      className="w-full object-cover"
                    />

                    {/* Texto AGOTADO en diagonal */}
                    {producto.Existencias <= 0 && (
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-red-600 bg-opacity-75 text-white font-bold text-3xl px-6 py-1
                      rotate-[-45deg] pointer-events-none select-none"
                        style={{ userSelect: "none" }}
                      >
                        AGOTADO
                      </div>
                    )}
                  </div>

                  <div className="flex-grow p-5 -mt-4">
                    <h2 className="font-bold mb-1">
                      {producto.vchNombreProducto}
                    </h2>
                    {/* Descripción oculta/desplegable */}
                    {mostrarDescripcion[producto.IdProducto] ? (
                      <p className="text-sm mb-1">{producto.vchDescripcion}</p>
                    ) : (
                      <button
                        onClick={() => toggleDescripcion(producto.IdProducto)}
                        className="text-sm font-semibold text-blue-600 underline mb-1"
                      >
                        Ver descripción
                      </button>
                    )}

                    {mostrarDescripcion[producto.IdProducto] && (
                      <button
                        onClick={() => toggleDescripcion(producto.IdProducto)}
                        className="text-sm font-semibold text-blue-600 underline mb-1"
                      >
                        Ocultar descripción
                      </button>
                    )}
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Precio:</span>{" "}
                      {producto.EnOferta && producto.PrecioOferta ? (
                        <>
                          <span className="line-through text-red-500 mr-2">
                            ${producto.Precio}
                          </span>
                          <span className="text-green-600 font-bold">
                            ${producto.PrecioOferta}
                          </span>
                        </>
                      ) : (
                        `$${producto.Precio}`
                      )}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Existencias:</span>{" "}
                      {producto.Existencias > 0
                        ? producto.Existencias
                        : "Agotado"}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Categoría:</span>{" "}
                      {categorias[producto.IdCategoria] || "Sin categoría"}
                    </p>
                    {producto.empleado && (
                      <p className="text-sm italic">
                        <span className="font-semibold">Agregado por:</span>{" "}
                        {`${producto.empleado.vchNombre} ${producto.empleado.vchAPaterno} ${producto.empleado.vchAMaterno}`}
                      </p>
                    )}

                    <div className="mt-4">
                      <Link
                        to={`/ModificarProducto/${producto.IdProducto}`}
                        className="inline-block font-semibold bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón flotante visible siempre */}
            <Link
              to="/ProductosAg"
              className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              + Nuevo producto
            </Link>
          </>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        className="toast-container"
      />
    </>
  );  
}

export default ProductsList;
