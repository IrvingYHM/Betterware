import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import imagen from "../img/logo.jpg";
import carrito from "../img/carrit.png";

function App() {
  return (
    <div className="container mt-5">
      <nav className="flex fixed w-full top-0 bg-turquesa py-6">
        <Link to="/" className="flex items-center ml-8">
          <img
            className="w-30 h-20 flex-wrap rounded-md"
            src={imagen}
            alt="logo"
          />
        </Link>

        <div className="flex-row items-end justify-end gap-4 ml-16">
          <div>
            {/* Aquí puedes agregar tu componente de barra de búsqueda */}
            <input
              type="text"
              placeholder="Barra de búsqueda"
              className="rounded-md px-2 py-1"
            />
          </div>
          <div className="flex items-end justify-end gap-2">
            <div className="flex items-end justify-end ml-auto gap-2 ml-16">
              <NavLink to="/inicio">
                <AiOutlineHome size={20} className="mr-2" /> Inicio
              </NavLink>
              <NavLink to="/lentes">Lentes</NavLink>
              <NavLink to="/lentesS">Lentes solares</NavLink>
              <NavLink to="/accesorios">Accesorios</NavLink>
            </div>
            <div className="flex items-end justify-end gap-2 ml-32">
              <a
                className="bg-aRey hover:bg-blue-900 text-black rounded-md px-4 py-2 font-bold"
                href=""
              >
                Gestionar Cita
              </a>
              <a
                className="bg-aRey hover:bg-blue-900 text-black rounded-md px-4 py-2 font-bold"
                href=""
              >
                Iniciar Sesión
              </a>
              <a
                className="bg-aRey hover:bg-blue-900 text-black rounded-md px-4 py-2 font-bold"
                href=""
              >
                Registrarse
              </a>
              <NavLink to="/carrito">
                <img
                  src={carrito}
                  className="w-10 h-10 ml-2 rounded-md m-1"
                  alt="carrito"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

// Componente NavLink que resalta la ruta activa
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="hover:bg-blue-900 text-black rounded-md px-4 py-2 font-bold flex items-center"
  >
    {children}
  </Link>
);

export default App;
