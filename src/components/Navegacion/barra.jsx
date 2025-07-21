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
import { LiaUsersSolid } from "react-icons/lia";
import { MdLogin, MdPersonAdd } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
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
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [userType, setUserType] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const navigate = useNavigate();
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [open, setOpen] = React.useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Function to check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Function to get active class for navigation items
  const getActiveClass = (path) => {
    return isActiveRoute(path) 
      ? "border-b-4 border-white bg-white/20 text-white font-bold" 
      : "text-white hover:bg-white/10";
  };

  // Function to get active class for mobile menu items
  const getMobileActiveClass = (path) => {
    return isActiveRoute(path) 
      ? "text-betterware border-r-4 border-betterware font-bold" 
      : "text-gray-700 hover:text-betterware hover:bg-gray-50";
  };

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
        setProductosEncontrados(data);
        navigate("/productos-encontrados", { state: { productos: data } });
      } else {
        console.log("No se encontraron productos.");
        navigate("/productos-Noencontrados");
        setProductosEncontrados([]);
      }
    } catch (error) {
      console.error("Error searching for product:", error);
      setProductosEncontrados([]);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleMenuPerfil = () => {
    setMenuPerfil(!menuPerfil);
  };

  return (
    <>
      {/* Mobile Navigation - Solo renderizar en móvil */}
      {isMobile && (
        <nav className="flex fixed items-center w-full top-0 bg-betterware_claro/95 lg:text-base h-16 px-2 z-50">
          <IoIosMenu
            className="w-8 h-8 cursor-pointer flex-shrink-0 mr-2"
            src={burgerMenu}
            onClick={toggleMenu}
          />

          <div className="flex-1 max-w-none">
            <Busqueda
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              handleSearch={handleSearch}
            />
          </div>
        </nav>
      )}

      {/* Desktop Navigation - Solo renderizar en desktop */}
      {!isMobile && (
        <nav className="flex fixed items-center w-full top-0 bg-betterware_claro/95 lg:text-base h-16 md:h-20 z-50">
          <div className="w-18 md:w-25 h-16 md:h-20 flex items-center ml-2">
            <Link to="/" className="flex items-center">
              <img
                className="w-18 h-16 md:w-25 md:h-20 flex-wrap rounded-3xl p-3"
                src={Logo}
                alt="logo"
              />
            </Link>
          </div>

          <div className="flex flex-grow items-center justify-between ml-4 md:ml-13">
            <div className="flex items-center justify-center">
              <Busqueda
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                handleSearch={handleSearch}
              />
            </div>

            <div className="flex items-center space-x-5 mx-5">
              {usuarioLogueado && userType === "empleado" && (
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard"
                    className={`font-bold flex items-center px-3 py-2 rounded-md transition-colors ${getActiveClass(
                      "/dashboard"
                    )}`}
                  >
                    <AiFillSetting size={20} className="mr-2" />
                    Dashboard
                  </Link>
                </div>
              )}
              {usuarioLogueado ? (
                <div className="flex items-center gap-4" ref={menuPerfilRef}>
                  <div className="relative">
                    <button
                      onClick={toggleMenuPerfil}
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
                    {menuPerfil && (
                      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
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
                <FaShoppingCart
                  size={30}
                  className="rounded-md"
                  alt="carrito"
                />
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* MENU DESPLEGABLE - Solo en móvil */}
      {isMobile && (
        <div className={`${menuVisible ? "block" : "hidden"}`}>
          <div className="flex flex-col fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 overflow-y-auto">
            {/* Header del menú móvil con logo y botón cerrar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to="/" className="flex items-center">
                <img
                  className="w-16 h-12 rounded-xl"
                  src={Logo}
                  alt="Betterware Logo"
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <IoMdClose size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col pt-4">
              <Link
                to="/inicio"
                className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                  "/inicio"
                )}`}
              >
                <AiOutlineHome size={24} className="mr-3" /> Inicio
              </Link>
              <Link
                to="/productos"
                className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                  "/productos"
                )}`}
              >
                <AiFillShopping size={24} className="mr-3" />
                Productos
              </Link>
              <Link
                to="/catalogos"
                className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                  "/catalogos"
                )}`}
              >
                <FaBook size={24} className="mr-3" />
                Catálogos
              </Link>
              <Link
                to="/retos"
                className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                  "/retos"
                )}`}
              >
                <FaTrophy size={24} className="mr-3" />
                Retos
              </Link>
              <Link
                to="/unete-al-equipo"
                className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                  "/unete-al-equipo"
                )}`}
              >
                <LiaUsersSolid size={24} className="mr-3" />
                Únete al equipo
              </Link>

              {usuarioLogueado && userType === "empleado" && (
                <Link
                  to="/dashboard"
                  className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                    "/dashboard"
                  )}`}
                >
                  <AiFillSetting size={24} className="mr-3" />
                  Dashboard
                </Link>
              )}
            </div>

            {/* Mostrar solo si no esta logueado */}
            {!usuarioLogueado && (
              <>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/inicioS"
                    className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                      "/inicioS"
                    )}`}
                  >
                    <MdLogin size={24} className="mr-3" />
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/RegistroPage"
                    className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                      "/RegistroPage"
                    )}`}
                  >
                    <MdPersonAdd size={24} className="mr-3" />
                    Registrarse
                  </Link>
                  <Link
                    to="/login_empleado"
                    className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                      "/login_empleado"
                    )}`}
                  >
                    <img
                      className="mr-3 w-6 h-6 rounded"
                      src={LogoMini}
                      alt="empleado"
                    />
                    Asociados
                  </Link>
                </div>
              </>
            )}

            {/* Mostrar opciones solo si está logueado */}
            {usuarioLogueado && (
              <Accordion open={open === 1} className="">
                <Link
                  to="/carrito"
                  className={`p-4 w-full font-bold flex items-center transition-all ${getMobileActiveClass(
                    "/carrito"
                  )}`}
                >
                  <FaShoppingCart size={20} className="mr-3" />
                  Carrito
                </Link>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="p-4 w-full hover:bg-gray-100 font-bold flex items-center border-none shadow-none"
                >
                  Configuraciones
                </AccordionHeader>
                <AccordionBody>
                  <>
                    <div className="pl-4">
                      <Link
                        to="/Menu"
                        className={`p-3 w-full font-medium flex items-center transition-all ${getMobileActiveClass(
                          "/Menu"
                        )}`}
                      >
                        <FaUser size={20} className="mr-3" />
                        Mi perfil
                      </Link>
                      <Link
                        to="/configuracion"
                        className={`p-3 w-full font-medium flex items-center transition-all ${getMobileActiveClass(
                          "/configuracion"
                        )}`}
                      >
                        <AiFillSetting size={20} className="mr-3" />
                        Configuración
                      </Link>
                      <Link
                        to="/Pedidos"
                        className={`p-3 w-full font-medium flex items-center transition-all ${getMobileActiveClass(
                          "/Pedidos"
                        )}`}
                      >
                        <RiLockPasswordLine size={20} className="mr-3" />
                        Mis pedidos
                      </Link>
                    </div>

                    <div className="pl-4 border-t border-gray-200 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="p-3 w-full font-medium flex items-center hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <IoIosLogOut size={20} className="mr-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                </AccordionBody>
              </Accordion>
            )}
          </div>
        </div>
      )}

      {/* Barra de navegación inferior - Solo en desktop */}
      {!isMobile && (
        <div className="flex fixed mt-20 items-center justify-center w-full top-0 bg-betterware/95 py-1.5 lg:text-base z-40">
          <Link
            to="/inicio"
            className={`font-bold flex items-center mr-5 px-3 py-1 rounded-md transition-colors text-white ${getActiveClass(
              "/inicio"
            )}`}
          >
            <AiOutlineHome size={20} className="mr-1" /> Inicio
          </Link>
          <Link
            to="/productos"
            className={`font-bold flex items-center mr-5 px-3 py-1 rounded-md transition-colors text-white ${getActiveClass(
              "/productos"
            )}`}
          >
            <AiFillShopping size={20} className="mr-1" />
            Productos
          </Link>
          <Link
            to="/catalogos"
            className={`font-bold flex items-center mr-5 px-3 py-1 rounded-md transition-colors text-white ${getActiveClass(
              "/catalogos"
            )}`}
          >
            <FaBook size={20} className="mr-1" />
            Catálogos
          </Link>
          <Link
            to="/retos"
            className={`font-bold flex items-center mr-5 px-3 py-1 rounded-md transition-colors text-white ${getActiveClass(
              "/retos"
            )}`}
          >
            <FaTrophy size={20} className="mr-1" />
            Retos
          </Link>
          <Link
            to="/unete-al-equipo"
            className={`font-bold flex items-center mr-5 px-3 py-1 rounded-md transition-colors text-white ${getActiveClass(
              "/unete-al-equipo"
            )}`}
          >
            <LiaUsersSolid size={26} className="mr-1" />
            Únete al equipo
          </Link>
        </div>
      )}
    </>
  );
}

export default Barra;