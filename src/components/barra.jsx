import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import imagen from "../img/logo.png";
import burgerMenu from "../img/burgerMenu.png";
import { FaShoppingCart } from "react-icons/fa";
import { BiGlassesAlt } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
/* import { FaUserCircle } from "react-icons/fa"; */
import { IoLogOutSharp } from "react-icons/io5";
import ProductosEncontrados from "../views/bus/ProductosEncontrados";

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

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation();
  const [usuarioLogueado, setUsuarioLogueado] = useState(false); // Estado para almacenar si el usuario está logueado
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [productos, setProductos] = useState([]);

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

  const handleLogout = () => {
    // Cerrar sesión del usuario
    localStorage.removeItem("token");
    setUserType(null);
    setUsuarioLogueado(false); // Actualizar estado de usuario logueado
  };

  const lentes = [
    { id: 1, nombre: "Lente 1", seccion: "lente1" },
    { id: 2, nombre: "Lente 2", seccion: "lente2" },
    // ... otros productos
  ];
  const navigate = useNavigate();

  useEffect(() => {
    // Reiniciar el estado del menú al cargar la página de inicio
    if (location.pathname === "/") {
      setMenuVisible(false);
    }
  }, [location.pathname]);


  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productos/Buscar_productos?busqueda=${busqueda}`);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching productos:', error);
        setProductos([]);
      }
    };
  
    obtenerProductos();
  }, [busqueda]);
  
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/productos/Buscar_productos?busqueda=${busqueda}`);
      const data = await response.json();
      if (data.length > 0) {
        navigate("/productos-encontrados", { state: { productos: data } });
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error('Error searching for product:', error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Cambiar el estado de visibilidad del menú
  };

  return (
    <div className="container mt-80">
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
          <img
            className="w-16 h-16 cursor-pointer md:hidden ml-auto"
            src={burgerMenu}
            alt="Menu hamburguesa"
            onClick={toggleMenu}
          />
        </div>
        <div className={`md:hidden ${menuVisible ? "block" : "hidden"}`}>
          {" "}
          {/* Agregar clase 'block' o 'hidden' dependiendo del estado de visibilidad del menú */}
          <div className="flex flex-col items-center mt-4">
            <Link
              to="/inicio"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              <AiOutlineHome size={20} className="mr-1" /> Inicio{" "}
            </Link>
            <Link
              to="/lentes"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              Lentes{" "}
            </Link>
            {/* <Link
              to="/lentesS"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              Lentes solares{" "}
            </Link> */}
            <Link
              to="/accesorios"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              Accesorios{" "}
            </Link>
            <Link
              to="/gestionarCi"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              Cita{" "}
            </Link>
            <Link
              to="/inicioS"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              Iniciar Sesión{" "}
            </Link>
            <Link
              to="/RegistroPage"
              className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"
            >
              {" "}
              Registrarse{" "}
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-grow items-center justify-between ml-4 md:ml-13 gap-4">
          {/* Aqui va la barra de busqueda */}
          <div className="flex items-center">
            <div className="sm:flex items-center">
              <input
                type="text"
                placeholder="Barra de búsqueda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="rounded-md px-2 py-1"
              />
              <button type="button" onClick={handleSearch}>
                <AiOutlineSearch className="text-white ml-2 bg-black w-6 h-6 rounded-md" />
              </button>

            </div>
          </div>

          <div className="flex items-center justify-end gap-8">
            <Link
              to="/inicio"
              className=" hover:border-b-2 border-blue-700 text-black px-2 py-2 font-bold flex items-center text-xl"
            >
              {" "}
              <AiOutlineHome size={20} className="mr-1" /> Inicio{" "}
            </Link>
            <Link
              to="/lentes"
              className=" hover:border-b-2 border-blue-700 text-black px-2 py-2 font-bold flex items-center text-xl"
            >
              {" "}
              <BiGlassesAlt size={20} className="mr-1" />
              Lentes{" "}
            </Link>
            <Link
              to="/accesorios"
              className=" hover:border-b-2 border-blue-700 text-black px-2 py-2 font-bold flex items-center text-xl"
            >
              {" "}
              <AiOutlineAppstoreAdd size={20} className="mr-1" />
              Accesorios{" "}
            </Link>

            {usuarioLogueado && userType === "empleado" && (
              <div>
                <Link to="/Productos" className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center whitespace-nowrap">
                  Dar de alta producto
                </Link>
              </div>
            )}
{/*             {usuarioLogueado && userType === "empleado" && (
              <>
                <Link to="/alta-producto" className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center whitespace-nowrap">
                  Dar de alta cliente
                </Link>
              </>
            )} */}
          </div>

          <div className="hidden md:flex items-center gap-4 ml-4 md:ml-32 -translate-x-16">
            <Link
              to="/gestionarCi"
              className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap text-lg"
            >
              Cita
            </Link>
            {usuarioLogueado ? (
              <>
                <p className="text-white"> {nombreUsuario}</p>
                
                {userType === "cliente" ? (
                  <Link to="/perfil" className="text-white">
                    Perfil Cliente
                    
                  </Link>



                ) : userType === "empleado" ? (
                  <Link to="/perfil" className="text-white">
                    Perfil Empleado
                  </Link>
                ) : null}
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUserType(null);
                    setUsuarioLogueado(false);
                    navigate("/");
                  }}
                  className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap"
                >
                  <IoLogOutSharp size={24} />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/inicioS"
                  className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap text-lg"
                >
                  {" "}
                  Iniciar Sesión{" "}
                </Link>
                <Link
                  to="/RegistroPage"
                  className="hover:bg-blue-900 text-white rounded-md px-2 py-2 font-bold flex whitespace-nowrap text-lg"
                >
                  {" "}
                  Registrarse{" "}
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

export default App;
