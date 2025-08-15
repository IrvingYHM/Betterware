import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Barra from '../components/Navegacion/barra';
import Fot from '../components/Footer';
import { usePedidos } from '../context/PedidosContext';
import { formatearEstadoPedido, ADMIN_CONTACT } from '../service/pedidos';
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

const MisPedidos = () => {
  const { pedidos, loading, error, cargarPedidosCliente } = usePedidos();
  const [clienteId, setClienteId] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setClienteId(decodedToken.clienteId);
    } else {
      // Redirigir al login si no hay token
      window.location.href = '/inicioS';
    }
  }, []);

  useEffect(() => {
    if (clienteId) {
      cargarPedidosCliente(clienteId);
    }
  }, [clienteId, cargarPedidosCliente]);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const abrirDetallePedido = (pedido) => {
    setPedidoSeleccionado(pedido);
  };

  const cerrarDetallePedido = () => {
    setPedidoSeleccionado(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 mt-36">
        <Barra />
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando tus pedidos...</p>
          </div>
        </div>
        <Fot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-36">
      <Barra />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Pedidos</h1>
          <p className="text-gray-600">Aquí puedes ver el estado de todos tus pedidos</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {pedidos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No tienes pedidos aún
            </h2>
            <p className="text-gray-600 mb-6">
              ¡Explora nuestros productos y haz tu primer pedido!
            </p>
            <a
              href="/productos"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
            >
              Ver Productos
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido) => {
              const estado = formatearEstadoPedido(pedido.IdEstado_Pedido);
              
              return (
                <div key={pedido.IdPedido} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {pedido.numeroPedido ? `Pedido #${pedido.numeroPedido}` : `Pedido #${pedido.IdPedido}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Creado: {formatearFecha(pedido.FechaPedido || pedido.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${estado.color}-100 text-${estado.color}-800`}>
                          {estado.icono} {estado.texto}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            ${pedido.TotalPe?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pedido.datosEnvio && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Entrega en:</p>
                            <p className="font-medium text-gray-800">
                              {pedido.datosEnvio.ciudad}, {pedido.datosEnvio.estado}
                            </p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Método de pago:</p>
                          <p className="font-medium text-gray-800">Pago contra entrega</p>
                        </div>
                        
                        {pedido.datosEnvio?.costoEnvio && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Costo de envío:</p>
                            <p className="font-medium text-gray-800">${pedido.datosEnvio.costoEnvio}.00</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button
                        onClick={() => abrirDetallePedido(pedido)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Ver Detalles
                      </button>
                      
                      <div className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm text-center cursor-default">
                        📞 Contacto en configuración
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Información de Contacto */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
            <span className="mr-2">⚠️</span>
            Información de Contacto
          </h2>
          
          <div className="text-center">
            <div className="text-yellow-700 mb-4">
              <p className="text-sm mb-2">Los datos de contacto están siendo configurados.</p>
              <p className="text-sm">Una vez que tengas un pedido, nuestro equipo se pondrá en contacto contigo para coordinar los detalles.</p>
            </div>
            
            <div className="bg-yellow-100 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Estado:</strong> Sistema en configuración - Pronto tendrás acceso completo a todas las opciones de contacto y pago.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalle del Pedido */}
      {pedidoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {pedidoSeleccionado.numeroPedido ? `Pedido #${pedidoSeleccionado.numeroPedido}` : `Pedido #${pedidoSeleccionado.IdPedido}`}
                </h2>
                <button
                  onClick={cerrarDetallePedido}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Estado */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Estado del Pedido:</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).color}-100 text-${formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).color}-800`}>
                    {formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).icono} {formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).texto}
                  </div>
                </div>

                {/* Productos */}
                {pedidoSeleccionado.detalles && pedidoSeleccionado.detalles.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Productos:</h3>
                    <div className="space-y-3">
                      {pedidoSeleccionado.detalles.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.producto?.vchNombreProducto || item.Descripcion}
                            </p>
                            <p className="text-sm text-gray-600">
                              Cantidad: {item.Cantidad} x ${item.Precio}
                            </p>
                          </div>
                          <p className="font-medium text-gray-800">
                            ${(item.Precio * item.Cantidad).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Datos de Envío */}
                {pedidoSeleccionado.datosEnvio && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Datos de Entrega:</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                      <p><strong>Nombre:</strong> {pedidoSeleccionado.datosEnvio.nombre}</p>
                      <p><strong>Teléfono:</strong> {pedidoSeleccionado.datosEnvio.telefono}</p>
                      {pedidoSeleccionado.datosEnvio.email && (
                        <p><strong>Email:</strong> {pedidoSeleccionado.datosEnvio.email}</p>
                      )}
                      <p><strong>Ubicación:</strong> {pedidoSeleccionado.datosEnvio.ciudad}, {pedidoSeleccionado.datosEnvio.estado}</p>
                      <p><strong>Dirección:</strong> {pedidoSeleccionado.datosEnvio.direccion}</p>
                      {pedidoSeleccionado.datosEnvio.referencias && (
                        <p><strong>Referencias:</strong> {pedidoSeleccionado.datosEnvio.referencias}</p>
                      )}
                      {pedidoSeleccionado.datosEnvio.notas && (
                        <p><strong>Notas:</strong> {pedidoSeleccionado.datosEnvio.notas}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      {pedidoSeleccionado.datosEnvio?.costoEnvio && (
                        <p className="text-sm text-gray-600">
                          Incluye envío: ${pedidoSeleccionado.datosEnvio.costoEnvio}.00
                        </p>
                      )}
                    </div>
                    <p className="text-xl font-bold text-gray-800">
                      Total: ${pedidoSeleccionado.TotalPe?.toFixed(2) || '0.00'} MXN
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={cerrarDetallePedido}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cerrar
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

export default MisPedidos;