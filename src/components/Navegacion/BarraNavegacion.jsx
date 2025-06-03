import React, { useState, useEffect, useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import imagen from "../../img/logo.png";
import burgerMenu from "../../img/burgerMenu.png";
import { FaShoppingCart } from "react-icons/fa";
import { BiGlassesAlt } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";
import Busqueda from "./Busqueda";
import { FaUser } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import ProductosEncontrados from "../../views/bus/ProductosEncontrados";
import ImageUser from "../../img/user/user-01.png";

// Función para decodificar JWT
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function Barra() {
  const [busqueda, setBusqueda] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation();
  const [usuarioLogueado, setUsuarioLogueado] = useState(false); // Estado para almacenar si el usuario está logueado
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const navigate = useNavigate();
  const [menuPerfil, setMenuPerfil] = useState(false);

  useEffect(() => {
    // Verificar el tipo de usuario al cargar la página
    const token = localStorage.getItem("token");
    let nombreUsuario = "";
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.userType);
      nombreUsuario = decodedToken.nombre;
      setUsuarioLogueado(true);
      setNombreUsuario(decodedToken.nombre);
    }
  }, []);

  useEffect(() => {
    // Reiniciar el estado del menú al cargar la página de inicio
    if (location.pathname === "/") {
      setMenuVisible(false);
    }

    // Agregar event listener para cerrar el menú del perfil al hacer clic fuera de él
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]);

  const handleClickOutside = (event) => {
    // Si el clic ocurre fuera del menú del perfil, ocultarlo
    if (menuPerfil && !menuPerfilRef.current.contains(event.target)) {
      setMenuPerfil(false);
    }
  };
  const menuPerfilRef = useRef(null);

  const handleLogout = () => {
    // Cerrar sesión del usuario
    localStorage.removeItem("token");
    setUserType(null);
    setUsuarioLogueado(false); // Actualizar estado de usuario logueado
  };

  const handleSearch = async () => {
    // Verificar si se ha ingresado algo en el campo de búsqueda
    if (!busqueda.trim()) {
      console.log("Ingrese un término de búsqueda.");
      // Podemos mostrar una alerta o mensaje al usuario indicando que debe ingresar un término de búsqueda
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/productos/Buscar_productos?busqueda=${busqueda}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setProductosEncontrados(data); // Establecer productos encontrados
        navigate("/productos-encontrados", { state: { productos: data } });
      } else {
        console.log("No se encontraron productos.");
        // Podemos mostrar un mensaje al usuario indicando que no se encontraron productos
        setProductosEncontrados([]);
      }
    } catch (error) {
      console.error("Error searching for product:", error);
      // En caso de error, limpiamos los productos encontrados
      setProductosEncontrados([]);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Cambiar el estado de visibilidad del menú
  };

  const toggleMenuPerfil = () => {
    setMenuPerfil(!menuPerfil); // Cambiar el estado de visibilidad del menú del perfil
  };

  return (
    <div className="container mt-8">
      <nav
        className="flex flex-col md:flex-row fixed w-full top-0 bg-turquesa py-1"
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center justify-between w-full md:w-auto md:pl-8 pr-8 md:pr-0">
          <Link to="/" className="flex items-center">
            <img
              className="w-18 md:w-25 h-16 md:h-20 flex-wrap rounded-md"
              src={imagen}
              alt="logo"
            />
          </Link>
          <div className="pl-6 md:hidden">
            <Busqueda
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              handleSearch={handleSearch}
            />
          </div>
          <img
            className="w-16 h-16 cursor-pointer md:hidden ml-auto"
            src={burgerMenu}
            alt="Menu hamburguesa"
            onClick={toggleMenu}
          />
        </div>
        {/* MENU DESPLEGABLE */}
        <div className={`md:hidden ${menuVisible ? "block" : "hidden"}`}>
          {/* Agregar clase 'block' o 'hidden' dependiendo del estado de visibilidad del menú */}
          <div className="flex flex-col items-center mt-4">
            <Link
              to="/inicio"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              <AiOutlineHome size={20} className="mr-1" /> Inicio
            </Link>
            <Link
              to="/lentes"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              Lentes
            </Link>
            <Link
              to="/lentesS"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              Lentes solares
            </Link>
            <Link
              to="/accesorios"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              Accesorios
            </Link>
            <Link
              to="/gestionarCi"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              Cita
            </Link>
            <Link
              to="/inicioS"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/RegistroPage"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              Registrarse
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-between ml-4 md:ml-13 gap-4">
          <Busqueda
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            handleSearch={handleSearch}
          />

          <div className="flex items-center justify-end gap-8">
            <Link
              to="/inicio"
              className=" hover:border-b-2 border-blue-700 text-black px-2 py-2 font-bold flex items-center text-xl"
            >
              <AiOutlineHome size={20} className="mr-1" /> Inicio
            </Link>
            <Link
              to="/lentes"
              className=" hover:border-b-2 border-blue-700 text-black px-2 py-2 font-bold flex items-center text-xl"
            >
              <BiGlassesAlt size={20} className="mr-1" />
              Lentes
            </Link>
            <Link
              to="/accesorios"
              className=" hover:border-b-2 border-blue-700 text-black px-2 py-2 font-bold flex items-center text-xl"
            >
              <AiOutlineAppstoreAdd size={20} className="mr-1" />
              Accesorios
            </Link>

            {usuarioLogueado && userType === "empleado" && (
              <div>
                <Link
                  to="/Productos"
                  className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center whitespace-nowrap"
                >
                  Dar de alta producto
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4 ml-4 md:ml-32 -translate-x-16">
            <Link
              to="/gestionarCi"
              className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap text-lg"
            >
              Cita
            </Link>
            {usuarioLogueado ? (
              <div className="flex items-center gap-4" ref={menuPerfilRef}>
                <div className="relative">
                  <button
                    onClick={toggleMenuPerfil} // Llama a la función toggleMenu para controlar la visibilidad del menú del perfil
                    className="rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white w-12 h-12"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="rounded-full"
                      src={ImageUser}
                      alt="userImage"
                    />
                  </button>
                  {/* Menú del perfil */}
                  {menuPerfil && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
                      {/* Opciones del menú del perfil */}
                      <Link
                        to="/configuracion-Perfil"
                        className="px-4 py-2 flex columns-2 hover:bg-gray-200"
                      >
                        <FaUser size={24} className="mr-2" />
                        {nombreUsuario}
                      </Link>
                      <Link
                        to=""
                        className="w-full px-4 py-2 hover:bg-gray-200 flex columns-2"
                      >
                        <AiFillSetting size={24} className="mr-2" />
                        Configuración
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 hover:bg-gray-200 flex columns-2"
                      >
                        <IoLogOutSharp size={24} className="mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/inicioS"
                  className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap text-lg"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/RegistroPage"
                  className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap text-lg"
                >
                  Registrarse
                </Link>
              </>
            )}

            <Link to="/carrito" className="relative inline-block">
              <FaShoppingCart
                size={30}
                className="rounded-md text-black"
                alt="carrito"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Barra;
