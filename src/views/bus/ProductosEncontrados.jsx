import { useLocation } from "react-router-dom";
import { useState } from "react";
import Fot from "../../components/Footer";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";
import { Package, Search, ChevronLeft, ChevronRight } from "lucide-react";


function ProductosEncontrados() {
  const location = useLocation();
  const productos = location.state?.productos || [];
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 40;

  // Lógica de paginación
  const totalProducts = productos.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = productos.slice(startIndex, endIndex);

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
      <Barra />
      <div className="mt-20 lg:mt-40 mb-10">
        {/* Header de resultados */}
        <div className="max-w-6xl mx-auto mb-6 px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 bg-gradient-to-r from-blue-50 via-white to-teal-50 px-4 sm:px-6 py-1.5 rounded-lg border border-blue-200 shadow-sm">
            <div className="flex items-center gap-4 text-xs py-1.5">
              <Search className="w-4 h-4 text-teal-500" />
              <h2 className="text-sm sm:text-base font-semibold">Resultados de Búsqueda</h2>
              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                {totalProducts}
              </span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <span className="text-xs sm:text-sm text-green-600 font-medium">
                  🔍 Productos encontrados
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <Link
                to="/productos"
                className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 py-1 rounded-full transition-all duration-200 ease-in-out"
              >
                ✨ Ver todos los productos
              </Link>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="flex flex-row flex-wrap justify-center gap-6 mt-8">
          {paginatedProducts.map((producto) => {
            return (
              <Link
                to={`/productoDetalle/${producto.IdProducto}`}
                key={producto.IdProducto}
                className="group relative w-72 bg-white border-2 border-gray-200 shadow-lg rounded-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Oferta Badge */}
                {producto.EnOferta &&
                  producto.PrecioOferta &&
                  (() => {
                    const precioOriginal = parseFloat(producto.Precio) || 0;
                    const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                    return precioOferta < precioOriginal;
                  })() && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        OFERTA
                      </span>
                    </div>
                  )}

                {/* Discount Percentage */}
                {producto.EnOferta &&
                  producto.PrecioOferta &&
                  (() => {
                    const precioOriginal = parseFloat(producto.Precio) || 0;
                    const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                    return precioOferta < precioOriginal;
                  })() && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                        {(() => {
                          const precioOriginal = parseFloat(producto.Precio) || 0;
                          const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                          const porcentaje = Math.round(
                            ((precioOriginal - precioOferta) / precioOriginal) * 100
                          );
                          return porcentaje;
                        })()}
                        % OFF
                      </span>
                    </div>
                  )}

                <div className="relative h-72 w-full bg-gradient-to-b from-gray-50 to-gray-100">
                  <img
                    src={producto.vchNomImagen}
                    alt={producto.vchNombreProducto}
                    className="h-full w-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-t-lg"></div>
                </div>

                <div className="relative flex flex-col p-4 space-y-2 bg-white flex-grow">
                  <h1 className="font-semibold lg:text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {producto.vchNombreProducto}
                  </h1>

                  {/* Precio Section */}
                  <div className="flex flex-col space-y-1 flex-grow">
                    {producto.EnOferta &&
                    producto.PrecioOferta &&
                    (() => {
                      const precioOriginal = parseFloat(producto.Precio) || 0;
                      const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                      return precioOferta < precioOriginal;
                    })() ? (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ${parseFloat(producto.Precio).toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-red-600">
                          ${parseFloat(producto.PrecioOferta).toFixed(2)}
                        </span>
                        <span className="text-sm text-green-600 font-medium">
                          Ahorras $
                          {(
                            parseFloat(producto.Precio) -
                            parseFloat(producto.PrecioOferta)
                          ).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">
                        ${parseFloat(producto.Precio).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Action indicator */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </button>

            {/* Páginas */}
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      currentPage === pageNumber
                        ? "bg-teal-500 text-white shadow-md"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>

      <Fot />
    </div>
  );
}

export default ProductosEncontrados;
