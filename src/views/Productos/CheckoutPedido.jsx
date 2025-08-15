import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Barra from '../../components/Navegacion/barra';
import Fot from '../../components/Footer';
import FormularioPedido from '../../components/Pedidos/FormularioPedido';
import ConfirmacionPedido from '../../components/Pedidos/ConfirmacionPedido';
import { useCart } from './hooks/useCart';
import { usePedidos } from '../../context/PedidosContext';
import { API_ENDPOINTS } from '../../service/apirest';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

const CheckoutPedido = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { pedidoActual } = usePedidos();
  
  const [paso, setPaso] = useState(1); // 1: Formulario, 2: Confirmación
  const [carrito, setCarrito] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error('Debes iniciar sesión para realizar un pedido');
      navigate('/inicioS');
      return;
    }

    const decodedToken = parseJwt(token);
    setClienteId(decodedToken.clienteId);
  }, [navigate]);

  useEffect(() => {
    if (clienteId) {
      cargarCarrito();
    }
  }, [clienteId]);

  const cargarCarrito = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_ENDPOINTS.carrito.obtenerUno}?userId=${clienteId}`
      );
      
      if (!response.ok) {
        throw new Error("Error al obtener el carrito");
      }
      
      const data = await response.json();
      
      // Agrupar productos duplicados
      const carritoAgrupado = data.reduce((acc, detalle) => {
        const key = detalle.producto.IdProducto;
        if (acc[key]) {
          acc[key].Cantidad += detalle.Cantidad;
          acc[key].SubTotal += detalle.SubTotal;
        } else {
          acc[key] = { ...detalle };
        }
        return acc;
      }, {});
      
      const carritoFinal = Object.values(carritoAgrupado);
      setCarrito(carritoFinal);
      
      // Calcular total
      const total = carritoFinal.reduce(
        (total, detalle) => total + (detalle.Precio * detalle.Cantidad), 
        0
      );
      setTotalProductos(total);
      
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      toast.error('Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  const limpiarCarritoCompleto = async () => {
    try {
      await fetch(API_ENDPOINTS.carrito.eliminarCompleto, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ IdCliente: clienteId }),
      });
      
      // Limpiar también el contexto del carrito
      clearCart();
      
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  };

  const manejarPedidoCreado = async (pedido) => {
    // Limpiar el carrito después de crear el pedido exitosamente
    await limpiarCarritoCompleto();
    
    // Cambiar al paso de confirmación
    setPaso(2);
    
    toast.success('¡Pedido creado exitosamente!');
  };

  const continuarComprando = () => {
    navigate('/productos');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 mt-36">
        <Barra />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando información del pedido...</p>
          </div>
        </div>
        <Fot />
      </div>
    );
  }

  if (!carrito.length && paso === 1) {
    return (
      <div className="min-h-screen bg-gray-100 mt-36">
        <Barra />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-gray-600 mb-6">
              Necesitas agregar productos a tu carrito antes de realizar un pedido.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/productos')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Ver Productos
              </button>
              <button
                onClick={() => navigate('/carrito')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Ir al Carrito
              </button>
            </div>
          </div>
        </div>
        <Fot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-36">
      <Barra />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Indicador de pasos */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${paso >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Datos del Pedido</span>
            </div>
            
            <div className={`w-16 h-1 ${paso >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            
            <div className={`flex items-center ${paso >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paso >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Contenido según el paso */}
        {paso === 1 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Finalizar Pedido
              </h1>
              <p className="text-gray-600">
                Completa los datos para procesar tu pedido con pago contra entrega
              </p>
            </div>

            <FormularioPedido
              carrito={carrito}
              totalProductos={totalProductos}
              onPedidoCreado={manejarPedidoCreado}
            />
          </div>
        )}

        {paso === 2 && (
          <div>
            <ConfirmacionPedido
              pedido={pedidoActual}
              onContinuar={continuarComprando}
            />
          </div>
        )}

        {/* Botón de regresar (solo en el paso 1) */}
        {paso === 1 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/carrito')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              ← Regresar al Carrito
            </button>
          </div>
        )}
      </div>

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

export default CheckoutPedido;