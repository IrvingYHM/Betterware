import Fot from "../../components/Footer";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";
import { Search, Home, Package, AlertCircle, Lightbulb } from "lucide-react";

function ProductosEncontrados() {
  return (
    <div className="flex flex-col min-h-screen">
      <Barra />
      
      <div className="flex-grow flex items-center justify-center px-4 mt-24 lg:mt-40 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 relative overflow-hidden">
            
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-8 left-8 w-16 h-16 bg-teal-300 rounded-full"></div>
              <div className="absolute top-20 right-16 w-8 h-8 bg-blue-300 rounded-full"></div>
              <div className="absolute bottom-16 left-16 w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 bg-teal-200 rounded-full"></div>
            </div>

            {/* Icono principal con animación */}
            <div className="relative mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Search className="w-24 h-24 text-gray-300 animate-pulse" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </div>
              
              {/* Líneas decorativas */}
              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <div className="w-6 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🔍 No se encontraron productos
            </h3>
            
            <p className="text-lg text-gray-600 mb-3">
              Lo sentimos, no encontramos productos que coincidan con tu búsqueda.
            </p>
            
            <p className="text-gray-500 mb-8">
              El producto puede estar agotado o no estar disponible en este momento.
            </p>

            {/* Cards de sugerencias */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Card de sugerencias */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                  <h4 className="font-semibold text-gray-800">Sugerencias</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Verifica la ortografía de tu búsqueda
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Intenta con palabras más generales
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Explora nuestras categorías
                  </li>
                </ul>
              </div>

              {/* Card de alternativas */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-3">
                  <Package className="w-5 h-5 text-teal-500 mr-2" />
                  <h4 className="font-semibold text-gray-800">Alternativas</h4>
                </div>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Revisa nuestras promociones activas
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Descubre productos nuevos
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    Explora productos populares
                  </li>
                </ul>
              </div>
            </div>

            {/* Botones de acción mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/productos"
                className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Package className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Ver todos los productos
              </Link>
              
              <Link
                to="/"
                className="group flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                <Home className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Volver al inicio
              </Link>
            </div>

            {/* Mensaje motivacional */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600 italic">
                💡 <strong>¡No te rindas!</strong> Tenemos miles de productos increíbles esperándote.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Fot />
    </div>
  );
}

export default ProductosEncontrados;
