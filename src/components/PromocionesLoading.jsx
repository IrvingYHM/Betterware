import React from 'react';

const PromocionesLoading = ({ visibleCards = 5 }) => {
  const getGridCols = () => {
    if (visibleCards === 1) return 'grid-cols-1';
    if (visibleCards === 2) return 'grid-cols-2';
    if (visibleCards === 3) return 'grid-cols-3';
    if (visibleCards === 4) return 'grid-cols-4';
    return 'grid-cols-5';
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Skeleton Cards */}
      <div className={`grid ${getGridCols()} gap-4 mb-6`}>
        {Array.from({ length: visibleCards }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg relative animate-pulse mx-2"
          >
            {/* Skeleton para la etiqueta de descuento */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full w-12 h-6 z-10"></div>
            
            {/* Skeleton para la imagen */}
            <div className="w-full h-32 sm:h-40 md:h-44 lg:h-40 xl:h-44 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            
            <div className="px-3 py-3 space-y-3">
              {/* Skeleton para el título */}
              <div className="space-y-2">
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-4/5"></div>
                <div className="h-3 sm:h-4 bg-gray-300 rounded w-3/5"></div>
              </div>
              
              {/* Skeleton para los precios */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 sm:h-5 bg-green-200 rounded w-16 sm:w-20"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-12 sm:w-16"></div>
                </div>
                <div className="h-5 sm:h-6 bg-green-100 rounded w-20 sm:w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Skeleton para los puntos indicadores */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-gray-300 animate-pulse"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>
      
      {/* Skeleton para el botón */}
      <div className="flex justify-center mt-6">
        <div className="h-12 bg-gradient-to-r from-teal-200 to-blue-200 rounded-lg w-64 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PromocionesLoading;