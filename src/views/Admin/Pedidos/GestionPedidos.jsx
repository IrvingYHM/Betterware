import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Barra from '../../../components/Navegacion/barraAdmin';
import Fot from '../../../components/Footer';
import EditorCostoEnvio from '../../../components/Pedidos/EditorCostoEnvio';
import { formatearEstadoPedido, ADMIN_CONTACT, ESTADOS_PEDIDO, ESTADOS_ENVIO } from '../../../service/pedidos';
import { API_BASE_URL } from '../../../service/apirest';
import "react-toastify/dist/ReactToastify.css";

const GestionPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [pedidoParaEditarEnvio, setPedidoParaEditarEnvio] = useState(null);
  const [actualizandoPedido, setActualizandoPedido] = useState(null);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/pedido/todos`);
      
      if (!response.ok) {
        throw new Error('Error al cargar pedidos');
      }

      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const actualizarEstadoPedido = async (pedidoId, nuevoEstado, tipoEstado = 'pedido') => {
    setActualizandoPedido(pedidoId);
    
    try {
      const endpoint = tipoEstado === 'pedido' ? 'IdEstado_Pedido' : 'IdEstado_Envio';
      
      const response = await fetch(`${API_BASE_URL}/pedido/actualizar/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          [endpoint]: nuevoEstado
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el pedido');
      }

      // Actualizar el estado local
      setPedidos(prevPedidos => 
        prevPedidos.map(pedido => 
          pedido.IdPedido === pedidoId 
            ? { ...pedido, [endpoint]: nuevoEstado }
            : pedido
        )
      );

      toast.success(`Estado ${tipoEstado === 'pedido' ? 'del pedido' : 'de envío'} actualizado correctamente`);
      
      // Si hay un pedido seleccionado, actualizarlo también
      if (pedidoSeleccionado && pedidoSeleccionado.IdPedido === pedidoId) {
        setPedidoSeleccionado(prev => ({
          ...prev,
          [endpoint]: nuevoEstado
        }));
      }

    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      toast.error('Error al actualizar el pedido');
    } finally {
      setActualizandoPedido(null);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pedidosFiltrados = pedidos.filter(pedido => {
    const cumpleFiltroEstado = filtroEstado === 'todos' || pedido.IdEstado_Pedido.toString() === filtroEstado;
    const cumpleBusqueda = !busqueda || 
      (pedido.numeroPedido && pedido.numeroPedido.toLowerCase().includes(busqueda.toLowerCase())) ||
      pedido.IdPedido.toString().includes(busqueda) ||
      (pedido.datosEnvio?.nombre && pedido.datosEnvio.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    
    return cumpleFiltroEstado && cumpleBusqueda;
  });

  const contarPedidosPorEstado = (estado) => {
    return pedidos.filter(p => p.IdEstado_Pedido === estado).length;
  };

  const manejarCostoActualizado = (pedidoId, costoEnvio, notasEnvio) => {
    // Actualizar el pedido en la lista local
    setPedidos(prevPedidos => 
      prevPedidos.map(pedido => 
        pedido.IdPedido === pedidoId 
          ? { 
              ...pedido, 
              CostoEnvio: costoEnvio, 
              NotasEnvio: notasEnvio,
              TotalPe: (pedido.TotalPe || 0) + costoEnvio 
            }
          : pedido
      )
    );

    // Si el pedido seleccionado es el que se actualizó, actualizarlo también
    if (pedidoSeleccionado && pedidoSeleccionado.IdPedido === pedidoId) {
      setPedidoSeleccionado(prev => ({
        ...prev,
        CostoEnvio: costoEnvio,
        NotasEnvio: notasEnvio,
        TotalPe: (prev.TotalPe || 0) + costoEnvio
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-36">
        <Barra />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando pedidos...</p>
          </div>
        </div>
        <Fot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-36">
      <Barra />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Pedidos</h1>
          <p className="text-gray-600">Administra y da seguimiento a todos los pedidos</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-900">{contarPedidosPorEstado(1)}</p>
              </div>
              <span className="text-yellow-500 text-2xl">⏳</span>
            </div>
          </div>
          
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Confirmados</p>
                <p className="text-2xl font-bold text-blue-900">{contarPedidosPorEstado(2)}</p>
              </div>
              <span className="text-blue-500 text-2xl">✅</span>
            </div>
          </div>
          
          <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">En Camino</p>
                <p className="text-2xl font-bold text-purple-900">{contarPedidosPorEstado(4)}</p>
              </div>
              <span className="text-purple-500 text-2xl">🚚</span>
            </div>
          </div>
          
          <div className="bg-green-100 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Entregados</p>
                <p className="text-2xl font-bold text-green-900">{contarPedidosPorEstado(5)}</p>
              </div>
              <span className="text-green-500 text-2xl">✅</span>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar pedido
              </label>
              <input
                type="text"
                placeholder="Buscar por número de pedido o nombre del cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos los estados</option>
                <option value="1">Pendientes</option>
                <option value="2">Confirmados</option>
                <option value="3">En Preparación</option>
                <option value="4">En Camino</option>
                <option value="5">Entregados</option>
                <option value="6">Cancelados</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={cargarPedidos}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-4">
          {pedidosFiltrados.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No se encontraron pedidos
              </h2>
              <p className="text-gray-600">
                {busqueda || filtroEstado !== 'todos' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay pedidos registrados aún'
                }
              </p>
            </div>
          ) : (
            pedidosFiltrados.map((pedido) => {
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
                        {(pedido.datosEnvio?.nombre || pedido.datosEnvio?.apellidos) && (
                          <p className="text-sm text-gray-600">
                            Cliente: {pedido.datosEnvio.nombre} {pedido.datosEnvio.apellidos}
                          </p>
                        )}
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {pedido.datosEnvio && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Entrega:</p>
                          <p className="font-medium text-gray-800">
                            {pedido.datosEnvio.ciudad}, {pedido.datosEnvio.estado}
                          </p>
                          {pedido.datosEnvio.telefono && (
                            <p className="text-sm text-gray-600">
                              Tel: {pedido.datosEnvio.telefono}
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Método de pago:</p>
                        <p className="font-medium text-gray-800">Contra entrega</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Envío:</p>
                        {pedido.CostoEnvio > 0 ? (
                          <p className="font-medium text-green-600">${pedido.CostoEnvio}.00</p>
                        ) : (
                          <p className="font-medium text-orange-600">Pendiente</p>
                        )}
                      </div>
                    </div>

                    {/* Acciones rápidas de estado */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <select
                        value={pedido.IdEstado_Pedido}
                        onChange={(e) => actualizarEstadoPedido(pedido.IdPedido, parseInt(e.target.value), 'pedido')}
                        disabled={actualizandoPedido === pedido.IdPedido}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={ESTADOS_PEDIDO.PENDIENTE}>⏳ Pendiente</option>
                        <option value={ESTADOS_PEDIDO.CONFIRMADO}>✅ Confirmado</option>
                        <option value={ESTADOS_PEDIDO.PREPARACION}>📦 En Preparación</option>
                        <option value={ESTADOS_PEDIDO.EN_CAMINO}>🚚 En Camino</option>
                        <option value={ESTADOS_PEDIDO.ENTREGADO}>✅ Entregado</option>
                        <option value={ESTADOS_PEDIDO.CANCELADO}>❌ Cancelado</option>
                      </select>

                      <select
                        value={pedido.IdEstado_Envio}
                        onChange={(e) => actualizarEstadoPedido(pedido.IdPedido, parseInt(e.target.value), 'envio')}
                        disabled={actualizandoPedido === pedido.IdPedido}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={ESTADOS_ENVIO.PENDIENTE}>📋 Pendiente</option>
                        <option value={ESTADOS_ENVIO.PROCESANDO}>⚙️ Procesando</option>
                        <option value={ESTADOS_ENVIO.EN_TRANSITO}>🚛 En Tránsito</option>
                        <option value={ESTADOS_ENVIO.ENTREGADO}>📦 Entregado</option>
                        <option value={ESTADOS_ENVIO.DEVUELTO}>↩️ Devuelto</option>
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setPedidoSeleccionado(pedido)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Ver Detalles Completos
                      </button>
                      
                      <button
                        onClick={() => setPedidoParaEditarEnvio(pedido)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        💰 {pedido.CostoEnvio > 0 ? 'Editar' : 'Calcular'} Envío
                      </button>
                      
                      {pedido.datosEnvio?.telefono && (
                        <a
                          href={`tel:${pedido.datosEnvio.telefono}`}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm text-center transition-colors"
                        >
                          📞 Llamar Cliente
                        </a>
                      )}
                      
                      <a
                        href={`https://wa.me/${pedido.datosEnvio?.telefono?.replace(/\s+/g, '').replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm text-center transition-colors"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <Fot />

      {/* Modal de Detalle del Pedido */}
      {pedidoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {pedidoSeleccionado.numeroPedido ? `Pedido #${pedidoSeleccionado.numeroPedido}` : `Pedido #${pedidoSeleccionado.IdPedido}`}
                </h2>
                <button
                  onClick={() => setPedidoSeleccionado(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Información del pedido */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Estado:</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).color}-100 text-${formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).color}-800`}>
                      {formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).icono} {formatearEstadoPedido(pedidoSeleccionado.IdEstado_Pedido).texto}
                    </div>
                  </div>

                  {pedidoSeleccionado.datosEnvio && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Datos del Cliente:</h3>
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
                </div>

                {/* Productos del pedido */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Productos:</h3>
                  {pedidoSeleccionado.detalles && pedidoSeleccionado.detalles.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
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
                  ) : (
                    <p className="text-gray-600 text-sm">No hay productos registrados</p>
                  )}

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        {pedidoSeleccionado.datosEnvio?.costoEnvio && (
                          <p className="text-sm text-gray-600">
                            Envío: ${pedidoSeleccionado.datosEnvio.costoEnvio}.00
                          </p>
                        )}
                      </div>
                      <p className="text-xl font-bold text-gray-800">
                        Total: ${pedidoSeleccionado.TotalPe?.toFixed(2) || '0.00'} MXN
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setPedidoSeleccionado(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                
                {pedidoSeleccionado.datosEnvio?.telefono && (
                  <a
                    href={`tel:${pedidoSeleccionado.datosEnvio.telefono}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    📞 Llamar
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor de Costo de Envío */}
      {pedidoParaEditarEnvio && (
        <EditorCostoEnvio
          pedido={pedidoParaEditarEnvio}
          onCostoActualizado={manejarCostoActualizado}
          onCerrar={() => setPedidoParaEditarEnvio(null)}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default GestionPedidos;