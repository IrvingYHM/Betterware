import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  variant = "default" // "default", "admin", "client"
}) => {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = (page) => {
    onPageChange(page);
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

  // Configuraciones por variante
  const variants = {
    default: {
      container: "bg-gradient-to-r from-gray-50 to-gray-100",
      border: "border-gray-200",
      accent: "blue-500",
      hoverBg: "blue-50"
    },
    admin: {
      container: "bg-gradient-to-r from-blue-50 to-indigo-50",
      border: "border-blue-100",
      accent: "blue-500",
      hoverBg: "blue-50"
    },
    client: {
      container: "bg-gradient-to-r from-teal-50 to-cyan-50",
      border: "border-teal-100",
      accent: "teal-500",
      hoverBg: "teal-50"
    }
  };

  const config = variants[variant] || variants.default;

  return (
    <div className="mt-8">
      <div className={`max-w-4xl mx-auto ${config.container} rounded-2xl p-6 border ${config.border} shadow-sm`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Información de resultados */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
              <Package className={`w-4 h-4 text-${config.accent.split('-')[0]}-500`} />
              <span className="font-medium">
                {startIndex + 1} - {endIndex} de {totalItems}
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <span>Página</span>
              <span className={`font-semibold text-${config.accent.split('-')[0]}-600`}>{currentPage}</span>
              <span>de</span>
              <span className={`font-semibold text-${config.accent.split('-')[0]}-600`}>{totalPages}</span>
            </div>
          </div>
          
          {/* Controles de navegación */}
          <div className="flex items-center justify-center space-x-2">
            {/* Botón Primera Página */}
            {currentPage > 2 && (
              <button
                onClick={() => goToPage(1)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 hover:text-${config.accent.split('-')[0]}-600 hover:bg-${config.hoverBg} shadow-sm transition-all duration-200`}
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
                  : `bg-white text-gray-600 hover:text-${config.accent.split('-')[0]}-600 hover:bg-${config.hoverBg} shadow-sm hover:shadow-md`
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
                        ? `bg-gradient-to-br from-${config.accent} to-${config.accent.split('-')[0]}-600 text-white shadow-lg transform scale-105`
                        : `bg-white text-gray-700 hover:text-${config.accent.split('-')[0]}-600 hover:bg-${config.hoverBg} shadow-sm hover:shadow-md hover:scale-105`
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
                  : `bg-white text-gray-600 hover:text-${config.accent.split('-')[0]}-600 hover:bg-${config.hoverBg} shadow-sm hover:shadow-md`
              }`}
              title="Página siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Botón Última Página */}
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => goToPage(totalPages)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 hover:text-${config.accent.split('-')[0]}-600 hover:bg-${config.hoverBg} shadow-sm transition-all duration-200`}
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
              className={`w-full px-4 py-2 bg-white border border-${config.accent.split('-')[0]}-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-${config.accent} focus:border-transparent shadow-sm`}
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
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'admin', 'client'])
};

export default Pagination;