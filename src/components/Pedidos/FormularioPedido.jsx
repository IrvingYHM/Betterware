import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SelectorDireccion from './SelectorDireccion';
import { ADMIN_CONTACT, crearPedido, generarNumeroPedido, ESTADOS_PEDIDO, ESTADOS_ENVIO, obtenerDatosCliente } from '../../service/pedidos';
import { usePedidos } from '../../context/PedidosContext';
import { API_BASE_URL } from '../../service/apirest';

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

const FormularioPedido = ({ carrito, totalProductos, onPedidoCreado }) => {
  const { agregarPedido } = usePedidos();
  const [loading, setLoading] = useState(false);
  const [clienteId, setClienteId] = useState(null);
  const [direccionEntrega, setDireccionEntrega] = useState(null);
  const [datosCliente, setDatosCliente] = useState(null);
  const [notasAdicionales, setNotasAdicionales] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setClienteId(decodedToken.clienteId);
    }
  }, []);

  useEffect(() => {
    if (clienteId) {
      cargarDatosCliente();
    }
  }, [clienteId]);

  const cargarDatosCliente = async () => {
    try {
      const datos = await obtenerDatosCliente(clienteId);
      setDatosCliente(datos);
    } catch (error) {
      console.error('Error al cargar datos del cliente:', error);
      toast.error('Error al cargar tus datos. Por favor verifica tu perfil.');
    }
  };


  const handleDireccionSeleccionada = (direccion) => {
    setDireccionEntrega(direccion);
  };

  const calcularTotal = () => {
    return totalProductos; // Sin costo de envío hasta que el admin lo determine
  };

  const validarFormulario = () => {
    if (!datosCliente) {
      toast.error('Error al cargar tus datos. Por favor recarga la página.');
      return false;
    }
    if (!direccionEntrega) {
      toast.error('Por favor verifica que tengas una dirección registrada en tu perfil');
      return false;
    }
    if (!datosCliente.vchNomCliente || !datosCliente.vchTelefono) {
      toast.error('Tu perfil necesita tener nombre y teléfono registrados');
      return false;
    }
    return true;
  };

  const crearNuevoPedido = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    
    try {
      const numeroPedido = generarNumeroPedido();
      
      const pedidoData = {
        IdCliente: clienteId,
        TotalPe: calcularTotal(),
        IdMetodoPago: 1, // Pago contra entrega
        IdEstado_Pedido: ESTADOS_PEDIDO.PENDIENTE,
        IdEstado_Envio: ESTADOS_ENVIO.PENDIENTE,
        IdDireccion: direccionEntrega.IdDireccion || 1,
        IdPaqueteria: 1,
        IdEmpleado: 1,
        CostoEnvio: 0, // Será determinado por el admin
        numeroPedido,
        datosEnvio: {
          nombre: datosCliente?.vchNomCliente || 'No disponible',
          apellidos: `${datosCliente?.vchAPaterno || ''} ${datosCliente?.vchAMaterno || ''}`.trim() || 'No disponible',
          telefono: datosCliente?.vchTelefono || 'No disponible',
          email: datosCliente?.vchCorreo || 'No disponible',
          direccionCompleta: direccionEntrega,
          costoEnvio: 0, // Pendiente de determinación por admin
          notas: notasAdicionales
        }
      };

      const resultado = await crearPedido(pedidoData);
      
      if (resultado && resultado.pedido) {
        // Crear detalles del pedido
        for (const item of carrito) {
          await fetch(`${API_BASE_URL}/detallePedido/crear`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              IdProducto: item.producto.IdProducto,
              Precio: item.Precio,
              Descripcion: item.producto.vchDescripcion,
              SubTotal: item.Precio * item.Cantidad,
              Cantidad: item.Cantidad,
              IdPedido: resultado.pedido.IdPedido
            })
          });
        }

        // Agregar al contexto de pedidos
        agregarPedido({
          ...resultado.pedido,
          numeroPedido,
          datosEnvio: pedidoData.datosEnvio,
          detalles: carrito
        });

        toast.success('¡Pedido creado exitosamente!');
        onPedidoCreado && onPedidoCreado(resultado.pedido);
      }
    } catch (error) {
      console.error('Error al crear pedido:', error);
      toast.error('Error al crear el pedido. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Información del Proceso de Pedido */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Información del Proceso de Pedido
        </h2>
        
        <div className="space-y-4">
          <div className="bg-blue-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="mr-2">🔄</span>
              ¿Cómo funciona?
            </h3>
            <div className="space-y-2 text-sm">
              <p>1. <strong>Crea tu pedido:</strong> Selecciona tus productos y completa la información</p>
              <p>2. <strong>Revisión:</strong> Nuestro equipo revisará tu pedido y calculará el costo de envío</p>
              <p>3. <strong>Confirmación:</strong> Te contactaremos para confirmar el total y coordinar el pago</p>
              <p>4. <strong>Entrega:</strong> Una vez confirmado el pago, procesaremos tu pedido para envío</p>
            </div>
          </div>
          
          <div className="bg-yellow-600 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <span className="mr-2">⚠️</span>
              Importante
            </h3>
            <p className="text-sm">
              Los métodos de pago y información de contacto están siendo configurados. 
              Una vez que completes tu pedido, nuestro equipo se pondrá en contacto contigo 
              para coordinar los detalles de pago y entrega.
            </p>
          </div>
        </div>
      </div>

      {/* Selector de Dirección */}
      <SelectorDireccion clienteId={clienteId} onDireccionSeleccionada={handleDireccionSeleccionada} />

      {/* Notas Adicionales (Opcional) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Notas para el Pedido
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instrucciones Especiales (Opcional)
          </label>
          <textarea
            value={notasAdicionales}
            onChange={(e) => setNotasAdicionales(e.target.value)}
            rows="3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Entregar por la tarde, tocar timbre, etc."
          />
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">ℹ️</span>
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Datos de tu perfil que se usarán:</p>
              {datosCliente ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2">
                  <p><strong>Nombre:</strong> {datosCliente.vchNomCliente} {datosCliente.vchAPaterno} {datosCliente.vchAMaterno}</p>
                  <p><strong>Teléfono:</strong> {datosCliente.vchTelefono}</p>
                  {datosCliente.vchCorreo && <p><strong>Email:</strong> {datosCliente.vchCorreo}</p>}
                </div>
              ) : (
                <p>Cargando datos de tu perfil...</p>
              )}
              <p className="mt-2">• Puedes editar tu perfil si necesitas actualizar esta información</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen del Pedido */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Resumen del Pedido
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal productos:</span>
            <span>${totalProductos.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Costo de envío:</span>
            <span className="text-orange-600 font-medium">A determinar por admin</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold">
            <span>Total productos:</span>
            <span>${calcularTotal().toFixed(2)} MXN</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-start">
            <span className="text-yellow-500 mr-2">💡</span>
            <div className="text-xs text-yellow-800">
              <p className="font-medium mb-1">Importante:</p>
              <p>El costo de envío será calculado por el administrador basado en tu ubicación y el pedido. Se te informará el total final antes de procesar el pago.</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={crearNuevoPedido}
          disabled={loading || carrito.length === 0}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creando pedido...' : `Crear Pedido - $${calcularTotal().toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default FormularioPedido;