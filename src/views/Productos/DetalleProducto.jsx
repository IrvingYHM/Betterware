import Fot from "../../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { CartContext } from "./context/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Barra from "../../components/Navegacion/barra";
import { API_ENDPOINTS } from "../../service/apirest";

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

const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart(CartContext);
  const [producto, setProducto] = useState({ Existencias: 1 });
  const [existencias, setExistencias] = useState(1);
  const [mostrarDetalles, setMostrarDetalles] = useState(true);
  const [usuarioLogueado, setusuarioLogueado] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario
  /*   const [nombreUsuario, setNombreUsuario] = useState(""); */
  const [clienteId, setClienteId] = useState("");

  // URLs centralizadas desde configuración
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          API_ENDPOINTS.productos.getById,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ IdProducto: id }),
          }
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setProducto(data);
        setExistencias(1); // Reset to 1 when product loads
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const incrementarExistencias = () => {
    if (existencias < producto.Existencias) {
      setExistencias(existencias + 1);
    } else {
      toast.error("No hay suficientes productos en existencia.");
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.userType);
      /*       setNombreUsuario(decodedToken.nombre); */
      setClienteId(decodedToken.clienteId);

      setusuarioLogueado(true);
      console.log(clienteId);
      /*  console.log(nombreUsuario) */
    }
  }, [/* nombreUsuario */ clienteId]);

  const decrementarExistencias = () => {
    if (existencias > 0) {
      setExistencias(existencias - 1);
    }
  };


  const [addingToCart, setAddingToCart] = useState(false);

  const agregarAlCarrito = async () => {
    console.log('Datos del carrito:', {
      usuarioLogueado,
      clienteId,
      existencias,
      producto: producto.IdProducto,
      productoExistencias: producto.Existencias
    });

    // Validaciones iniciales
    if (!usuarioLogueado) {
      toast.error("Aún no has iniciado sesión.");
      return;
    }

    if (!clienteId) {
      toast.error("Error: ID de cliente no encontrado.");
      return;
    }

    if (existencias <= 0) {
      toast.error("No hay suficientes productos en existencia.");
      return;
    }

    if (addingToCart) {
      return; // Evitar múltiples clicks
    }

    const cantidadAAgregar = Math.min(existencias, producto.Existencias);
    
    setAddingToCart(true);
    
    try {
      // Crear carrito y detalles en una sola operación optimizada
      const carritoPayload = {
        IdProducto: producto.IdProducto,
        IdCliente: clienteId,
      };

      const carritoResponse = await fetch(API_ENDPOINTS.carrito.crear, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carritoPayload),
      });

      if (!carritoResponse.ok) {
        const errorData = await carritoResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${carritoResponse.status}: ${carritoResponse.statusText}`);
      }

      const carritoData = await carritoResponse.json();
      console.log('Carrito data recibida:', carritoData);
      console.log('IdCarrito obtenido:', carritoData.IdCarrito);

      // Crear detalles del carrito
      const precio = parseFloat(producto.Precio) || 0;
      const detallesPayload = {
        IdProducto: parseInt(producto.IdProducto),
        Precio: parseFloat(precio),
        Descripcion: (producto.vchDescripcion || producto.vchNombreProducto || 'Sin descripción').substring(0, 255),
        SubTotal: parseFloat(precio * cantidadAAgregar),
        Cantidad: parseInt(cantidadAAgregar),
        IdCarrito: parseInt(carritoData.IdCarrito),
      };

      console.log('Payload detalles carrito:', detallesPayload);

      const detallesResponse = await fetch(API_ENDPOINTS.carrito.detalles, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(detallesPayload),
      });

      if (!detallesResponse.ok) {
        const errorData = await detallesResponse.json().catch(() => ({}));
        console.error('Error response from detalles:', errorData);
        console.error('Response status:', detallesResponse.status);
        console.error('Response text:', detallesResponse.statusText);
        throw new Error(errorData.message || `Error ${detallesResponse.status}: ${detallesResponse.statusText}`);
      }

      const detallesData = await detallesResponse.json();
      console.log('Detalle carrito creado exitosamente:', detallesData);

      // Éxito: actualizar estado local
      addToCart({
        ...producto,
        quantity: cantidadAAgregar,
        precioTotal: producto.Precio,
      });

      // Actualizar existencias localmente
      setExistencias(existencias - cantidadAAgregar);
      
      toast.success(`${cantidadAAgregar} producto(s) agregado(s) al carrito.`);
      
      // Navegar después de un breve delay
      setTimeout(() => {
        navigate("/carrito");
      }, 3000);

    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      toast.error(error.message || "Error al agregar producto al carrito.");
    } finally {
      setAddingToCart(false);
    }
  };

  /*   const checkProductInCart = () => {
    return cart.some((item) => item.IdProducto === producto.IdProducto);
  }; */

  // Mostrar estado de loading
  if (loading) {
    return (
      <div>
        <Barra />
        <div className="container mx-auto px-6 my-20 mt-36 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-betterware mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar estado de error
  if (error) {
    return (
      <div>
        <Barra />
        <div className="container mx-auto px-6 my-20 mt-36">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar el producto</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Barra />
      {mostrarDetalles && (
        <div className="container mx-auto px-6 my-20 mt-36">
          <div className="md:flex md:items-center">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                className="max-w-full max-h-96 rounded-md object-contain mx-auto"
                src={producto.vchNomImagen}
                alt={producto.vchNombreProducto}
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 className="text-black uppercase text-lg font-bold">
                {producto.vchNombreProducto}
              </h3>
              <span className="text-black mt-3 font-bold">
                ${producto.Precio}
              </span>
              <h3 className="text-gray-700  text-sm mt-8">
                Productos disponible
              </h3>
              <span className="text-black mt-3 font-bold">
                {producto.Existencias}
              </span>
              <hr className="my-3" />
              <p className="text-gray-700 mt-4">{producto.vchDescripcion}</p>
              <hr className="my-3" />

              <div className="mt-2">
                <label className="text-gray-700 text-sm" htmlFor="count">
                  Cantidad
                </label>
                <div className="flex items-center mt-1">
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                    onClick={decrementarExistencias}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <span className="text-gray-700 text-lg mx-2">
                    {existencias}
                  </span>
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                    onClick={incrementarExistencias}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-6">
                <button
                  onClick={agregarAlCarrito}
                  disabled={addingToCart || producto.Existencias <= 0}
                  className={`px-8 py-2 text-white text-sm font-medium rounded-full focus:outline-none transition-all duration-200 flex items-center gap-2 ${
                    addingToCart || producto.Existencias <= 0
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-600 hover:bg-orange-700 focus:bg-orange-700'
                  }`}
                >
                  {addingToCart && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {addingToCart ? 'Agregando...' : 
                   producto.Existencias <= 0 ? 'Sin existencias' : 
                   'Agregar al carrito'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Fot />

      <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
              className="toast-container"
            />
    </div>
  );
};

export default DetalleProducto;
