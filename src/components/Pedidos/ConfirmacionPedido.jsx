import { useState, useEffect } from 'react';
import { ADMIN_CONTACT, formatearEstadoPedido } from '../../service/pedidos';

const ConfirmacionPedido = ({ pedido, onContinuar }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(true);

  if (!pedido) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Error al cargar el pedido
        </h2>
        <p className="text-gray-600 mb-6">
          No se pudo cargar la información del pedido.
        </p>
        <button
          onClick={() => window.location.href = '/carrito'}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Volver al carrito
        </button>
      </div>
    );
  }

  const estado = formatearEstadoPedido(pedido.IdEstado_Pedido);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header de Confirmación */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          ¡Pedido Creado Exitosamente!
        </h1>
        <p className="text-green-700 mb-4">
          Tu pedido ha sido registrado y está pendiente de confirmación.
        </p>
        
        {pedido.numeroPedido && (
          <div className="bg-white border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Número de pedido:</p>
            <p className="text-xl font-bold text-gray-800">{pedido.numeroPedido}</p>
          </div>
        )}
      </div>

      {/* Estado del Pedido */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Estado del Pedido</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${estado.color}-100 text-${estado.color}-800`}>
            {estado.icono} {estado.texto}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Siguiente paso:</strong> El administrador revisará tu pedido y se contactará contigo para confirmar el pago.
          </p>
          <p className="text-sm text-gray-700">
            Recibirás una llamada o mensaje en las próximas horas para coordinar el depósito y la entrega.
          </p>
        </div>
      </div>

      {/* Información del Proceso */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <span className="mr-2">🔄</span>
          Proceso de Confirmación
        </h2>
        
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start">
            <span className="mr-2">📋</span>
            <p>Tu pedido ha sido registrado exitosamente en nuestro sistema</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2">👨‍💼</span>
            <p>Nuestro equipo revisará tu pedido y calculará el costo de envío</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2">📞</span>
            <p>Te contactaremos pronto para coordinar el pago y la entrega</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2">⏰</span>
            <p>Tiempo estimado de contacto: 2-4 horas hábiles</p>
          </div>
        </div>
      </div>

      {/* Detalles del Pedido */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => setMostrarDetalles(!mostrarDetalles)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Detalles del Pedido
            </h2>
            <span className="text-gray-500">
              {mostrarDetalles ? '▼' : '▶'}
            </span>
          </button>
        </div>
        
        {mostrarDetalles && (
          <div className="p-6 space-y-4">
            {/* Productos */}
            {pedido.detalles && pedido.detalles.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Productos:</h3>
                <div className="space-y-2">
                  {pedido.detalles.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
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
            {pedido.datosEnvio && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-800 mb-3">Datos de Entrega:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Nombre:</strong> {pedido.datosEnvio.nombre}</p>
                    <p><strong>Teléfono:</strong> {pedido.datosEnvio.telefono}</p>
                    {pedido.datosEnvio.email && (
                      <p><strong>Email:</strong> {pedido.datosEnvio.email}</p>
                    )}
                  </div>
                  <div>
                    <p><strong>Ubicación:</strong> {pedido.datosEnvio.ciudad}, {pedido.datosEnvio.estado}</p>
                    <p><strong>Dirección:</strong> {pedido.datosEnvio.direccion}</p>
                    {pedido.datosEnvio.referencias && (
                      <p><strong>Referencias:</strong> {pedido.datosEnvio.referencias}</p>
                    )}
                  </div>
                </div>
                {pedido.datosEnvio.notas && (
                  <div className="mt-3">
                    <p><strong>Notas:</strong> {pedido.datosEnvio.notas}</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  {pedido.datosEnvio?.costoEnvio && (
                    <p className="text-sm text-gray-600">
                      Incluye envío: ${pedido.datosEnvio.costoEnvio}.00
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800">
                    Total: ${pedido.TotalPe?.toFixed(2) || '0.00'} MXN
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Próximos Pasos */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          <span className="mr-2">✅</span>
          Próximos Pasos
        </h2>
        
        <div className="space-y-3 text-sm text-green-800">
          <div className="flex items-start">
            <span className="mr-2 font-bold">1.</span>
            <p>Nuestro equipo revisará tu pedido y verificará la disponibilidad de productos</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 font-bold">2.</span>
            <p>Calcularemos el costo de envío basado en tu ubicación</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 font-bold">3.</span>
            <p>Te contactaremos para confirmar el total final y coordinar el pago</p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 font-bold">4.</span>
            <p>Una vez confirmado el pago, procesaremos tu pedido para envío</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-100 rounded">
          <p className="text-sm font-medium text-green-800">
            ⏱️ Tiempo estimado de procesamiento: 1-2 días hábiles
          </p>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/mis-pedidos"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center transition-colors"
        >
          Ver Mis Pedidos
        </a>
        
        <button
          onClick={onContinuar || (() => window.location.href = '/productos')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Continuar Comprando
        </button>
      </div>
    </div>
  );
};

export default ConfirmacionPedido;