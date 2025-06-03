import "./App.css";
import { useState, useEffect } from "react";
/* import Barra from "./components/BarraNavegacion"; */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./views/inicio";
import Lentes from "../src/views/Lente/inicio";
import LenteS from "./views/lentesS";
import InicioAd from "../src/views/Admin/inicioadmin";
import Catalogos from "./views/Catalogos/Catalogos";
import Unete from "./views/Unete_Equipo/Unete";

/* import Accesorios from "./views/accesorios"; */
import Accesorios from "../src/views/accesorios"
import AvisoP from "./views/avisoP";
import Cookies from "./views/cookies"; 
import IniciarS from "./views/iniciarS";
import IniciarSEmpleado from "./views/Admin/Empleados/iniciarSEmpleado";
import TerminoC from "./views/terminosC";
import Carrito from "./views/Lente/carrito";


/* import Carrito from "../src/components/err/NotFound"; */
import NotFound from "./components/err/NotFound";
import NotFound500 from "./components/err/error500";
import Recuperar from "./views/Recuperacion/recuperar";
import Registrarse from "./views/Registro/RegistroPage";
import Cambiar from "./views/Recuperacion/cambioCon";

import AgendarCita from "./views/Citas/AgendarCita";
import VerCitas from "./views/Perfil/Citas/verCitas";
import ModificarCita from "./views/Perfil/Citas/modificarCita";
import AdminCitas from "./views/Admin/Citas/verCitas";
import Configuracion from "./views/Perfil/configuracion"

import Barra from "./components/Navegacion/barra";
//Seccion productos del administrador
import Productos from "./views/Admin/productos/productos";
import ProductosEncontrados from "./views/bus/ProductosEncontrados";
import Noencontrados from "./views/bus/noencontrados";
import AgregarProductos from './views/Admin/productos/agregarProductos';
import EditarProducto from './views/Admin/productos/modificarProducto'

//import Piepa from './components/foother';
import Opcion from "./views/Rec2/Opcion";
import { CartProvider } from "./views/Lente/context/cart";
/* import inicioAd from './views/Admin/inicioadmin'; */

import DetalleProducto from "./views/Lente/DetalleProducto";
import VerDireccion from './views/Perfil/verDireccion'
import CambiarContraseñaPerfil from './views/Perfil/CambiarContra'
import { AuthProvider } from "./views/AuthContext";
import AcercaDe from './views/Footer/AcercaDe'
import Matematicas from './views/Calculadora/Mate';
import Matematicas2 from './views/Calculadora/Matematicas';
import Matematicas3 from './views/Respaldo/Mate';
import Menu from './views/Perfil/Menu';
import ClienteAd from './views/Admin/Clientes/Clientes';
import EmpleadoAd from './views/Admin/Empleados/Empleados';
import AgEmpleado from './views/Admin/Empleados/Registro/RegistroPage';
import EditarEmpleado from './views/Admin/Empleados/editarEmpleado';
import CambiarContra from './views/Perfil/cambioCon'
import Pedidos from './views/Perfil/Pedidos';
import PaginaSuccess from './views/Lente/SuccessPage'//cuando se realiza el pago de mercadopago
import Stripe from './views/Metodopago/stripe'






const RutaProtegida = ({ element }) => {
  const usuarioLogueado = localStorage.getItem("token");
  return usuarioLogueado ? element : <Navigate to="/inicioS" />;
};

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal ] = useState(0);
  const [countProducts, setcountProducts] = useState(0);
  return (
    <>
      <BrowserRouter>
        {/*         <Barra /> */}
        {/* <BarraNavegacion /> */}

        <CartProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/inicioAd" element={<InicioAd />} />
              <Route path="/Menu" element={<Menu />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route path="/lentes" element={<Lentes />} />
              <Route path="/catalogos" element={<Catalogos />} />
              <Route path="/unete-al-equipo" element={<Unete />} />
              <Route
                path="/productoDetalle/:id"
                element={<DetalleProducto />}
              />

              <Route path="/Agendar-cita" element={<AgendarCita />} />

              <Route path="/accesorios" element={<Accesorios />} />
              <Route
                path="/lentesS"
                element={
                  <LenteS
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setcountProducts={setcountProducts}
                  />
                }
              />

              <Route
                path="/carrito"
                element={
                  <Carrito
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setcountProducts={setcountProducts}
                  />
                }
              />
              {/* Rutas protegidas */}

              {/* Rutas protegidas */}
              {/* <Route
                path="/Agendar-cita"
                element={<RutaProtegida element={<AgendarCita />} />}
              /> */}
              <Route
                path="/ver-cita"
                element={<RutaProtegida element={<VerCitas />} />}
              />
              <Route
                path="/modificar-cita/:id"
                element={<RutaProtegida element={<ModificarCita />} />}
              />
              <Route
                path="/Admin-citas"
                element={<RutaProtegida element={<AdminCitas />} />}
              />
              {/*<Route
            path="/carrito"
            element={<RutaProtegida element={<Carrito />} />}
          /> */}

              <Route path="/inicio/avisoP" element={<AvisoP />} />
              <Route path="/inicio/cookies" element={<Cookies />} />
              <Route path="/inicioS" element={<IniciarS />} />

              <Route path="/Login_Empleado" element={<IniciarSEmpleado />} />
              <Route path="/inicio/terminosC" element={<TerminoC />} />
              <Route path="/Recuperar" element={<Recuperar />} />
              <Route path="/RegistroPage" element={<Registrarse />} />
              <Route path="/Cambio" element={<Cambiar />} />
              <Route path="/inicio/AcercaDe" element={<AcercaDe />} />
              {/* Agrega la ruta NotFound para manejar errores 404 */}
              <Route path="*" element={<NotFound />} />
              <Route path="500" element={<NotFound500 />} />
              {/* Rutas para productos */}

              <Route path="/" element={<App />} />
              <Route path="/Productos" element={<Productos />} />
              <Route
                path="/productos-encontrados"
                element={<ProductosEncontrados />}
              />
              <Route
                path="/productos-Noencontrados"
                element={<Noencontrados />}
              />

              <Route path="/ProductosAg" element={<AgregarProductos />} />
              <Route
                path="/ModificarProducto/:id"
                element={<EditarProducto />}
              />
              <Route path="/VerDireccion" element={<VerDireccion />} />
              <Route
                path="/CambiarContraseñaPerfil"
                element={<CambiarContraseñaPerfil />}
              />
              <Route path="/CambiarContra" element={<CambiarContra />} />
              <Route path="/Pedidos" element={<Pedidos />} />
              <Route path="/PaginaSuccess" element={<PaginaSuccess />} />

              {/*Rutas para Admin  */}
              <Route path="/ClientesAd" element={<ClienteAd />} />
              <Route path="/EmpleadoAd" element={<EmpleadoAd />} />
              <Route path="/AgEmpleado" element={<AgEmpleado />} />
              <Route path="/inicioAd" element={<inicioAd />} />
              <Route path="/editarEmpleado/:id" element={<EditarEmpleado />} />

              {/* RUta de matematicas */}
              <Route path="/Matematicas" element={<Matematicas />} />
              <Route path="/Mate" element={<Matematicas2 />} />
              <Route path="/Mate3" element={<Matematicas3 />} />

              <Route path="/stripe" element={<Stripe />} />

              <Route path="/Opcion" element={<Opcion />} />
            </Routes>
          </AuthProvider>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
