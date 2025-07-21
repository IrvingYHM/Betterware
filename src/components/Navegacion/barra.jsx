import React, { useState, useEffect, useRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../img/betterware_logo.jpg";
import LogoMini from "../../img/betterware_logo.png";
import burgerMenu from "../../img/user/user-01.png";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import Busqueda from "./Busqueda";
import { FaUser } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa";
import ImageUser from "../../img/user/user-01.png";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { IoIosGlasses } from "react-icons/io";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { AccordionActions } from "@mui/material";
import { FaRegUser } from "react-icons/fa";

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
  //const [fotoUsuario, setfotoUsuario] = useState("");
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const navigate = useNavigate();
  const [menuPerfil, setMenuPerfil] = useState(false);

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  useEffect(() => {
    // Verificar el tipo de usuario al cargar la página
    const token = localStorage.getItem("token");
    let nombreUsuario = "";
    //let fotoUsuario = "";
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.userType);
      nombreUsuario = decodedToken.nombre;
      //fotoUsuario = decodedToken.foto
      setUsuarioLogueado(true);
      setNombreUsuario(decodedToken.nombre);
      //setfotoUsuario(decodedToken.nombre);
    }
  }, []);

  useEffect(() => {
    // Reiniciar el estado del menú al cargar la página de inicio
    if (location.pathname === "/") {
      setMenuVisible(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]);

  const handleClickOutside = (event) => {
    if (menuPerfil && !menuPerfilRef.current.contains(event.target)) {
      setMenuPerfil(false);
    }
  };
  const menuPerfilRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserType(null);
    setUsuarioLogueado(false);
  };

  const handleSearch = async () => {
    if (!busqueda.trim()) {
      console.log("Ingrese un término de búsqueda.");
      return;
    }

    try {
      const response = await fetch(
        `https://backopt-production.up.railway.app/productos/Buscar_productos?busqueda=${busqueda}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setProductosEncontrados(data); // Establecer productos encontrados
        navigate("/productos-encontrados", { state: { productos: data } });
      } else {
        console.log("No se encontraron productos.");
        navigate("/productos-Noencontrados");
        // Podemos mostrar un mensaje al usuario indicando que no se encontraron productos
        setProductosEncontrados([]);
      }
    } catch (error) {
      console.error("Error searching for product:", error);
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
    <>
      <nav className="flex fixed items-center justify-between w-full top-0 bg-betterware_claro lg:text-base z-50">
        <div className="w-18 md:w-25 h-16 md:h-20 flex items-center ml-2 relative">
          <Link to="/" className="flex items-center">
            <img
              className="hidden md:block w-18 h-16 md:w-25 md:h-20 flex-wrap rounded-3xl p-3"
              src={Logo}
              alt="logo"
            />
          </Link>
          <IoIosMenu
            className="z-50 w-12 h-8 cursor-pointer md:hidden"
            src={burgerMenu}
            onClick={toggleMenu}
          />

          <div className="flex-grow mx-auto md:hidden m-3 max-w-[250px] sm:max-w-none">
            <Busqueda
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              handleSearch={handleSearch}
            />
          </div>
          <img
            className="block md:hidden w-16 h-14 ml-4 "
            src={Logo}
            alt="logo2"
          />
        </div>
        {/* MENU DESPLEGABLE */}

        <div className={`md:hidden ${menuVisible ? "block" : "hidden"}`}>
          {/* Fondo semitransparente detrás del menú */}

          {/*<div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div> */}
          {/* Agregar clase 'block' o 'hidden' dependiendo del estado de visibilidad del menú */}
          <div className="flex flex-col items-center mt-20 fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
            <Link
              to="/inicio"
              className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
            >
              <AiOutlineHome size={24} className="mr-2" /> Inicio
            </Link>
            <Link
              to="/productos"
              className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
            >
              <AiFillShopping size={20} className="mr-1" />
              Productos
            </Link>

            {/* Mostrar solo si no esta logueado */}
            {!usuarioLogueado && (
              <>
                <Link
                  to="/inicioS"
                  className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/RegistroPage"
                  className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                >
                  Registrarse
                </Link>
              </>
            )}

            {/* Mostrar opciones solo si está logueado */}
            {usuarioLogueado && (
              <Accordion open={open === 1} className="">
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                >
                  Configuraciones
                </AccordionHeader>
                <AccordionBody>
                  <>
                    <Link
                      to="/Menu"
                      className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                    >
                      <FaUser size={24} className="mr-2" />
                      Mi perfil
                    </Link>
                    <Link
                      to="/configuracion"
                      className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                    >
                      <AiFillSetting size={24} className="mr-2" />
                      Configuración
                    </Link>
                    <Link
                      to="/ver-cita"
                      className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                    >
                      <FaRegCalendarAlt size={24} className="mr-2" />
                      Citas
                    </Link>
                    <Link
                      to="/Pedidos"
                      className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                    >
                      <RiLockPasswordLine size={24} className="mr-2" />
                      Mis pedidos
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="p-4 w-full hover:border-b-2 border-blue-700 font-bold flex items-center"
                    >
                      <IoIosLogOut size={24} className="mr-2" />
                      Cerrar Sesión
                    </button>
                  </>
                </AccordionBody>
              </Accordion>
            )}
          </div>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-between ml-4 md:ml-13">
          <div className="flex items-center justify-center">
            <Busqueda
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              handleSearch={handleSearch}
            />
          </div>

          <div className="w-18 md:w-25 h-16 md:h-20 flex items-center space-x-5">
            {usuarioLogueado && userType === "empleado" && (
              <div className="flex space-x-4">
                <Link
                  to="/dashboard"
                  className="hover:border-b-2 border-blue-700 font-bold flex items-center"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-5 mx-5">
            {/*  <Link
            to="/Agendar-cita"
            className="hover:text-blue-800 text-white rounded-md font-bold flex whitespace-nowrap "
          >
            <FaRegCalendarAlt size={20} className="mr-1 mt-1" />
            Agenda tu cita
          </Link>*/}
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
                        to="/Menu"
                        className="px-4 py-2 flex columns-2 hover:bg-gray-200"
                      >
                        <FaUser size={24} className="mr-2" />
                        {nombreUsuario}
                      </Link>
                      <Link
                        to="/configuracion"
                        className="w-full px-4 py-2 hover:bg-gray-200 flex columns-2"
                      >
                        <AiFillSetting size={24} className="mr-2" />
                        Configuración
                      </Link>
                      <Link
                        to="/ver-cita"
                        className="w-full px-4 py-2 hover:bg-gray-200 flex columns-2"
                      >
                        <FaRegCalendarAlt size={24} className="mr-2" />
                        Citas
                      </Link>
                      <Link
                        to="/Pedidos"
                        className="w-full px-4 py-2 hover:bg-gray-200 flex columns-2"
                      >
                        <RiLockPasswordLine size={24} className="mr-2" />
                        Mis pedidos
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
                  to="/login_empleado"
                  className="hover:bg-blue-900 text-white rounded-md font-bold flex max-w-[152px] whitespace-normal px-2 py-1"
                >
                  <img
                    className="mr-2 mt-3 w-7 h-7"
                    src={LogoMini}
                    alt="logo"
                  />
                  Iniciar Sesión Asociados
                </Link>
                <Link
                  to="/inicioS"
                  className="flex hover:bg-blue-900 columns-2 text-white rounded-md font-bold max-w-[158px] whitespace-normal px-2 py-1"
                >
                  <FaRegUser size={30} className="mr-2 mt-3" />
                  Iniciar Sesión Tienda en Linea
                </Link>
                <Link
                  to="/RegistroPage"
                  className="hover:bg-blue-900 text-white rounded-md font-bold flex whitespace-nowrap px-2 py-1"
                >
                  Registrarse
                </Link>
              </>
            )}

            <Link to="/carrito">
              <FaShoppingCart size={30} className="rounded-md" alt="carrito" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex fixed mt-20 items-center justify-center w-full top-0 bg-betterware py-1.5 lg:text-base z-50">
        <Link
          to="/inicio"
          className="hover:border-b-2 border-blue-700 font-bold flex items-center mr-5"
        >
          <AiOutlineHome size={20} className="mr-1" /> Inicio
        </Link>
        <Link
          to="/productos"
          className="hover:border-b-2 border-blue-700 font-bold flex items-center mr-5"
        >
          <AiFillShopping size={20} className="mr-1" />
          Productos
        </Link>
        <Link
          to="/catalogos"
          className="hover:border-b-2 border-blue-700 font-bold flex items-center mr-5"
        >
          <FaBook size={20} className="mr-1" />
          Catalogos
        </Link>
        <Link
          to="/retos"
          className="hover:border-b-2 border-blue-700 font-bold flex items-center mr-5"
        >
          <FaTrophy size={20} className="mr-1" />
          Retos
        </Link>
        <Link
          to="/unete-al-equipo"
          className="hover:border-b-2 border-blue-700 font-bold flex items-center mr-5"
        >
          <FaBook size={20} className="mr-1" />
          Únete a mi equipo
        </Link>
      </div>
    </>
  );
}

export default Barra;