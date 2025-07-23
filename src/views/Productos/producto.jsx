import Fot from "../../components/Footer";
import { useEffect, useState } from "react";
/* import lentes from "../../img/lentes2.png"; */
import { obtenerProductos } from "./Api";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";
import { API_ENDPOINTS } from "../../service/apirest";
import { ProductSkeletonGrid } from "./ProductSkeleton";


const Lentes = () => {
  const [productos, setProductos] = useState([]);
  const [resultadosCategoria, setResultadosCategoria] = useState([]);
  const [productoAgregado, setProductoAgregado] = useState(null); // Nuevo estado para manejar el producto agregado
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    obtenerProductos()
      .then((data) => {
        setProductos(data);
        setResultadosCategoria(data); // Inicializar resultadosCategoria con todos los productos
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  async function buscarProductos(categoria) {
    let url = `${API_ENDPOINTS.productos.filter}?categoria=${categoria}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setResultadosCategoria(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        {loading ? (
          <ProductSkeletonGrid count={6} />
        ) : (
          <div className="flex flex-row flex-wrap justify-center gap-6 mt-8">
            {resultadosCategoria.map((producto) => {
              return (
                <Link
                  to={`/productoDetalle/${producto.IdProducto}`}
                  key={producto.IdProducto}
                  className="group relative w-80 bg-white border-2 border-gray-200 shadow-lg rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Oferta Badge */}
                  {producto.EnOferta && producto.PrecioOferta && (() => {
                    const precioOriginal = parseFloat(producto.Precio) || 0;
                    const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                    return precioOferta < precioOriginal; // Solo mostrar si hay descuento real
                  })() && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        OFERTA
                      </span>
                    </div>
                  )}
                  
                  {/* Discount Percentage */}
                  {producto.EnOferta && producto.PrecioOferta && (() => {
                    const precioOriginal = parseFloat(producto.Precio) || 0;
                    const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                    return precioOferta < precioOriginal; // Solo mostrar si hay descuento real
                  })() && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {(() => {
                          const precioOriginal = parseFloat(producto.Precio) || 0;
                          const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                          const porcentaje = Math.round(((precioOriginal - precioOferta) / precioOriginal) * 100);
                          return porcentaje;
                        })()}% OFF
                      </span>
                    </div>
                  )}

                  <div className="relative h-64 w-full bg-gradient-to-b from-gray-50 to-gray-100">
                    <img
                      src={producto.vchNomImagen}
                      alt={producto.vchNombreProducto}
                      className="h-full w-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Overlay gradiente en hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-t-lg"></div>
                  </div>
                  
                  <div className="relative flex flex-col p-4 space-y-2 bg-white flex-grow">
                    <h1 className="font-semibold text-gray-800 lg:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {producto.vchNombreProducto}
                    </h1>
                    
                    {/* Precio Section */}
                    <div className="flex flex-col space-y-1 flex-grow">
                      {producto.EnOferta && producto.PrecioOferta && (() => {
                        const precioOriginal = parseFloat(producto.Precio) || 0;
                        const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                        return precioOferta < precioOriginal; // Solo mostrar formato oferta si hay descuento real
                      })() ? (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            ${parseFloat(producto.Precio).toFixed(2)}
                          </span>
                          <span className="text-2xl font-bold text-red-600">
                            ${parseFloat(producto.PrecioOferta).toFixed(2)}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            Ahorras ${(parseFloat(producto.Precio) - parseFloat(producto.PrecioOferta)).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-800">
                          ${parseFloat(producto.Precio).toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {/* Action indicator - positioned at bottom right */}
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Fot />
    </div>
  );
};
export default Lentes;
