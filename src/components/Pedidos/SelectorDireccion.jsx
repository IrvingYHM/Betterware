import { useState, useEffect } from 'react';
import { obtenerDireccionCliente } from '../../service/pedidos';

const SelectorDireccion = ({ clienteId, onDireccionSeleccionada }) => {
  const [direccion, setDireccion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarEditar, setMostrarEditar] = useState(false);

  useEffect(() => {
    if (clienteId) {
      cargarDireccion();
    }
  }, [clienteId]);

  const cargarDireccion = async () => {
    try {
      setLoading(true);
      setError(null);
      const direccionData = await obtenerDireccionCliente(clienteId);
      setDireccion(direccionData);
      
      // Notificar al componente padre
      if (onDireccionSeleccionada) {
        onDireccionSeleccionada(direccionData);
      }
    } catch (error) {
      console.error('Error al cargar dirección:', error);
      setError('Error al cargar la dirección. Por favor, verifica que tengas una dirección registrada en tu perfil.');
    } finally {
      setLoading(false);
    }
  };

  const formatearDireccionCompleta = (dir) => {
    if (!dir) return '';
    
    const partes = [
      dir.Calle,
      dir.Colonia,
      dir.Municipio,
      dir.Estado,
      dir.CP
    ].filter(Boolean);
    
    return partes.join(', ');
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Dirección de Entrega
        </h3>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Cargando dirección...</span>
        </div>
      </div>
    );
  }

  if (error || !direccion) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Dirección de Entrega
        </h3>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-500 mr-2 text-xl">⚠️</span>
            <div>
              <p className="text-red-700 font-medium mb-1">
                No se encontró una dirección registrada
              </p>
              <p className="text-red-600 text-sm">
                {error || 'Necesitas registrar una dirección en tu perfil antes de realizar un pedido.'}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <a
              href="/VerDireccion"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors inline-block"
            >
              Ir a Perfil - Gestionar Dirección
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Dirección de Entrega
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-medium text-gray-800">Dirección Registrada:</h4>
          <button
            onClick={() => setMostrarEditar(!mostrarEditar)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {mostrarEditar ? 'Ocultar' : 'Ver'} detalles
          </button>
        </div>
        
        <p className="text-gray-700 text-sm mb-2">
          {formatearDireccionCompleta(direccion)}
        </p>
        
        {mostrarEditar && (
          <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
            <div><strong>Calle:</strong> {direccion.Calle || 'No especificada'}</div>
            <div><strong>Colonia:</strong> {direccion.Colonia || 'No especificada'}</div>
            <div><strong>Ciudad:</strong> {direccion.Municipio || 'No especificada'}</div>
            <div><strong>Estado:</strong> {direccion.Estado || 'No especificado'}</div>
            <div><strong>CP:</strong> {direccion.CP || 'No especificado'}</div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <span className="text-blue-500 mr-2">📦</span>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Información sobre el envío:</p>
            <ul className="text-xs space-y-1">
              <li>• El costo de envío será determinado por el administrador</li>
              <li>• Dependerá de la distancia, peso y volumen del pedido</li>
              <li>• Se te informará el costo antes de confirmar el pago</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <a
          href="/VerDireccion"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
        >
          <span className="mr-1">✏️</span>
          Editar dirección
        </a>
        
        <button
          onClick={cargarDireccion}
          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
        >
          🔄 Actualizar
        </button>
      </div>
    </div>
  );
};

export default SelectorDireccion;