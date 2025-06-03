import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import imagen from "../img/logo.jpg";
import carrito from "../img/carrit.png";
import burgerMenu from "../img/burgerMenu.png";

function App() {
  return (
    <div className="container mt-5">
      <nav className="flex flex-col md:flex-row fixed w-full top-0 bg-turquesa py-1" style={{ zIndex: 1000 }}>
        <div className="flex items-center justify-between w-full md:w-auto md:pl-8 pr-8 md:pr-0">
          <Link to="/" className="flex items-center">
            <img className="w-18 md:w-25 h-16 md:h-20 flex-wrap rounded-md" src={imagen} alt="logo" />
          </Link>
          <img className="w-16 h-16 cursor-pointer sm:hidden ml-auto" src={burgerMenu} alt="Menu hamburguesa" />
        </div>

        <div className="hidden md:flex flex-grow items-center justify-between ml-4 md:ml-13">
          <div className="flex items-center">
            <div className="hidden md:flex items-center">
              <input type="text" placeholder="Barra de búsqueda" className="rounded-md px-2 py-1" />
              <button type="button" onClick={() => console.log("Realizar búsqueda")}>
                <AiOutlineSearch className="text-white ml-2 bg-black w-6 h-6 rounded-md" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-8">
            <Link to="/inicio" className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"> <AiOutlineHome size={20} className="mr-1" /> Inicio </Link>
            <Link to="/lentes" className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"> Lentes </Link>
            <Link to="/lentesS" className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"> Lentes solares </Link>
            <Link to="/accesorios" className="hover:bg-blue-900 text-black rounded-md px-2 py-2 font-bold flex items-center"> Accesorios </Link>
          </div>

          <div className="hidden md:flex items-center gap-4 ml-4 md:ml-32 -translate-x-16">
            <Link
            to="/gestionarCi"
            className="bg-aRey hover:bg-blue-900 text-black rounded-md px-3 py-1 font-bold flex text-center"> 
            Gestionar Cita
            </Link>
            <Link
            to="/inicioS"
            className="bg-aRey hover:bg-blue-900 text-black rounded-md px-3 py-1 font-bold flex"> Iniciar Sesión </Link>
            <Link
            to="/registrarseL"
            className="bg-aRey hover:bg-blue-900 text-black rounded-md px-4 py-2 font-bold flex"> Registrarse </Link>
            <Link to="/carrito">
              <img src={carrito} className="w-20 h-16 ml-2 rounded-md m-3" alt="carrito"/>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
