import { useState } from 'react';
import { toast } from 'react-toastify';
import { actualizarCostoEnvioPedido } from '../../service/pedidos';

const EditorCostoEnvio = ({ pedido, onCostoActualizado, onCerrar }) => {
  const [costoEnvio, setCostoEnvio] = useState(pedido.CostoEnvio || 0);
  const [notasEnvio, setNotasEnvio] = useState(pedido.NotasEnvio || '');
  const [guardando, setGuardando] = useState(false);

  const formatearDireccion = (direccion) => {
    if (!direccion) return 'No disponible';
    
    const partes = [
      direccion.Calle,
      direccion.Colonia,
      direccion.Municipio,
      direccion.Estado,
      direccion.CP
    ].filter(Boolean);
    
    return partes.join(', ');
  };

  const calcularTotalConEnvio = () => {
    const totalProductos = pedido.TotalPe || 0;
    const envio = parseFloat(costoEnvio) || 0;
    return totalProductos + envio;
  };

  const guardarCostoEnvio = async () => {
    if (!costoEnvio || costoEnvio < 0) {
      toast.error('Por favor ingresa un costo de envío válido');
      return;
    }

    setGuardando(true);
    
    try {
      await actualizarCostoEnvioPedido(pedido.IdPedido, parseFloat(costoEnvio), notasEnvio);
      
      toast.success('Costo de envío actualizado correctamente');
      
      // Notificar al componente padre
      if (onCostoActualizado) {
        onCostoActualizado(pedido.IdPedido, parseFloat(costoEnvio), notasEnvio);
      }
      
      // Cerrar el modal
      if (onCerrar) {
        onCerrar();
      }
      
    } catch (error) {
      console.error('Error al actualizar costo de envío:', error);
      toast.error('Error al actualizar el costo de envío');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Editar Costo de Envío
            </h2>
            <button
              onClick={onCerrar}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            {/* Información del pedido */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Información del Pedido:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Número:</strong> {pedido.numeroPedido || `#${pedido.IdPedido}`}</p>
                  <p><strong>Cliente:</strong> {pedido.datosEnvio?.nombre} {pedido.datosEnvio?.apellidos || 'No disponible'}</p>
                  <p><strong>Teléfono:</strong> {pedido.datosEnvio?.telefono || 'No disponible'}</p>
                </div>
                <div>
                  <p><strong>Total productos:</strong> ${pedido.TotalPe?.toFixed(2) || '0.00'}</p>
                  <p><strong>Estado:</strong> {pedido.datosEnvio?.direccionCompleta?.Estado || 'No disponible'}</p>
                  <p><strong>Ciudad:</strong> {pedido.datosEnvio?.direccionCompleta?.Municipio || 'No disponible'}</p>
                </div>
              </div>
            </div>

            {/* Dirección completa */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Dirección de Entrega:</h3>
              <p className="text-blue-700 text-sm">
                {pedido.datosEnvio?.direccionCompleta 
                  ? formatearDireccion(pedido.datosEnvio.direccionCompleta)
                  : 'Dirección no disponible'
                }
              </p>
              {pedido.datosEnvio?.referencias && (
                <p className="text-blue-600 text-xs mt-1">
                  <strong>Referencias:</strong> {pedido.datosEnvio.referencias}
                </p>
              )}
            </div>

            {/* Editor de costo */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Costo de Envío (MXN) *
                </label>
                <input
                  type="number"
                  value={costoEnvio}
                  onChange={(e) => setCostoEnvio(e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas sobre el envío (opcional)
                </label>
                <textarea
                  value={notasEnvio}
                  onChange={(e) => setNotasEnvio(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Envío urgente, requiere confirmación telefónica, etc."
                />
              </div>
            </div>

            {/* Resumen de totales */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-3">Resumen Final:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span>${pedido.TotalPe?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de envío:</span>
                  <span>${parseFloat(costoEnvio || 0).toFixed(2)}</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between font-bold text-green-800">
                  <span>Total Final:</span>
                  <span>${calcularTotalConEnvio().toFixed(2)} MXN</span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start">
                <span className="text-yellow-500 mr-2">💡</span>
                <div className="text-xs text-yellow-800">
                  <p className="font-medium mb-1">Instrucciones:</p>
                  <ul className="space-y-1">
                    <li>• Considera la distancia, peso y volumen del pedido</li>
                    <li>• Una vez actualizado, contacta al cliente con el total final</li>
                    <li>• Asegúrate de confirmar la dirección antes del envío</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onCerrar}
              disabled={guardando}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            
            <button
              onClick={guardarCostoEnvio}
              disabled={guardando || !costoEnvio}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {guardando ? 'Guardando...' : 'Guardar Costo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCostoEnvio;