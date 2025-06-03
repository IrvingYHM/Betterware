import { useLocation } from "react-router-dom";
import Fot from "../../components/Footer";
import { Link } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";
import Noencontrado from "../../img/noEncontrados.png";

function ProductosEncontrados() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Barra />
      
      <div className="my-32 text-center ">
        <img
          src={Noencontrado}
          alt="Imagen de productos no encontrados"
          className="mx-auto w-full max-w-xs md:max-w-sm lg:max-w-md mb-6"
        />
        <p className="text-lg font-semibold text-gray-700 mb-4">
          No hemos encontrado productos que coincidan con tu búsqueda.
        </p>
        <p className="text-gray-500 mb-6">
          Puede que el producto esté agotado o que no esté disponible en este momento.
        </p>
        
        <Link
          to="/"
          className="py-4 px-2 rounded-lg disabled:opacity-50 mt-4 w-full flex items-center justify-center   bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
          Volver al Inicio
        </Link>
      </div>

      {/* Footer */}
      <Fot />
    </div>
  );
}

export default ProductosEncontrados;
