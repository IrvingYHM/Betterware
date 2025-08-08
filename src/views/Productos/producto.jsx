import Fot from "../../components/Footer";
import { useEffect, useState } from "react";
/* import lentes from "../../img/lentes2.png"; */
import { obtenerProductos } from "./Api";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";
// import { API_ENDPOINTS } from "../../service/apirest";
import { ProductSkeletonGrid } from "./ProductSkeleton";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";


const Lentes = () => {
  const [, setProductos] = useState([]);
  const [resultadosCategoria, setResultadosCategoria] = useState([]);
  const [productoAgregado] = useState(null); // Nuevo estado para manejar el producto agregado
  const [loading, setLoading] = useState(true);
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 40; // Mostrar 40 productos por página en el cliente


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

  // Lógica de paginación
  const totalProducts = resultadosCategoria.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = resultadosCategoria.slice(startIndex, endIndex);

  // Funciones de navegación de páginas
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

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
          <ProductSkeletonGrid count={12} />
        ) : (
          <>
            <div className="flex flex-row flex-wrap justify-center gap-6 mt-8">
              {paginatedProducts.map((producto) => {
              return (
                <Link
                  to={`/productoDetalle/${producto.IdProducto}`}
                  key={producto.IdProducto}
                  className="group relative w-72 bg-white border-2 border-gray-200 shadow-lg rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 overflow-hidden"
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

                  <div className="relative h-72 w-full bg-gradient-to-b from-gray-50 to-gray-100">
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

            {/* Componente de Paginación para Cliente */}
            {totalPages > 1 && (
              <div className="mt-12 mb-8">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 shadow-sm">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Información de resultados */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Package className="w-4 h-4 text-teal-500" />
                        <span className="font-medium">
                          {startIndex + 1} - {Math.min(endIndex, totalProducts)} de {totalProducts} productos
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                        <span>Página</span>
                        <span className="font-semibold text-teal-600">{currentPage}</span>
                        <span>de</span>
                        <span className="font-semibold text-teal-600">{totalPages}</span>
                      </div>
                    </div>
                    
                    {/* Controles de navegación */}
                    <div className="flex items-center justify-center space-x-2">
                      {/* Botón Primera Página */}
                      {currentPage > 2 && (
                        <button
                          onClick={() => goToPage(1)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 hover:text-teal-600 hover:bg-teal-50 shadow-sm transition-all duration-200"
                          title="Primera página"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <ChevronLeft className="w-4 h-4 -ml-2" />
                        </button>
                      )}

                      {/* Botón Anterior */}
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-600 hover:text-teal-600 hover:bg-teal-50 shadow-sm hover:shadow-md'
                        }`}
                        title="Página anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Números de página */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum = i + 1;
                          if (totalPages > 5) {
                            if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                          }

                          if (pageNum < 1 || pageNum > totalPages) return null;

                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                                pageNum === currentPage
                                  ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg transform scale-105'
                                  : 'bg-white text-gray-700 hover:text-teal-600 hover:bg-teal-50 shadow-sm hover:shadow-md hover:scale-105'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Botón Siguiente */}
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-600 hover:text-teal-600 hover:bg-teal-50 shadow-sm hover:shadow-md'
                        }`}
                        title="Página siguiente"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Botón Última Página */}
                      {currentPage < totalPages - 1 && (
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 hover:text-teal-600 hover:bg-teal-50 shadow-sm transition-all duration-200"
                          title="Última página"
                        >
                          <ChevronRight className="w-4 h-4" />
                          <ChevronRight className="w-4 h-4 -ml-2" />
                        </button>
                      )}
                    </div>

                    {/* Selector rápido de página (solo móvil) */}
                    <div className="lg:hidden w-full max-w-xs">
                      <select
                        value={currentPage}
                        onChange={(e) => goToPage(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-white border border-teal-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      >
                        {Array.from({ length: totalPages }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Página {i + 1} de {totalPages}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Fot />
    </div>
  );
};
export default Lentes;
