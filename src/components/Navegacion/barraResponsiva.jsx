import React from "react";
import Logo from "../../img/logo2.jpg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4 mt-24 w-full">
      {/* Logo y enlaces */}
      <div className="w-18 md:w-25 h-16 md:h-20 flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-8" />
        <a href="#" className="hover:text-gray-400">
          Inicio
        </a>
        <a href="#" className="hover:text-gray-400">
          Lentes
        </a>
        <a href="#" className="hover:text-gray-400">
          Accesorios
        </a>
        <a href="#" className="hover:text-gray-400">
          Citas
        </a>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
        />
      </div>

      {/* Botones de autenticación y carrito */}
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-gray-400">
          Iniciar Sesión
        </a>
        <a href="#" className="hover:text-gray-400">
          Registrarse
        </a>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Carrito
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
