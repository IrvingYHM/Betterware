import { useState, useEffect } from 'react';
import { calcularCostoEnvio, COSTOS_ENVIO } from '../../service/pedidos';

const CalculadoraEnvio = ({ onCostoCalculado, valorInicial = {} }) => {
  const [estado, setEstado] = useState(valorInicial.estado || '');
  const [ciudad, setCiudad] = useState(valorInicial.ciudad || '');
  const [costoEnvio, setCostoEnvio] = useState(0);

  const estados = Object.keys(COSTOS_ENVIO);
  const ciudadesDisponibles = estado ? Object.keys(COSTOS_ENVIO[estado] || {}) : [];

  useEffect(() => {
    if (estado && ciudad) {
      const costo = calcularCostoEnvio(estado, ciudad);
      setCostoEnvio(costo);
      onCostoCalculado && onCostoCalculado(costo, { estado, ciudad });
    } else {
      setCostoEnvio(0);
      onCostoCalculado && onCostoCalculado(0, { estado, ciudad });
    }
  }, [estado, ciudad, onCostoCalculado]);

  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    setEstado(nuevoEstado);
    setCiudad(''); // Reset ciudad cuando cambia el estado
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Calcular Costo de Envío
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <select
            value={estado}
            onChange={handleEstadoChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Selecciona tu estado</option>
            {estados.map((est) => (
              <option key={est} value={est}>
                {est}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad *
          </label>
          <select
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!estado}
            required
          >
            <option value="">
              {estado ? 'Selecciona tu ciudad' : 'Primero selecciona un estado'}
            </option>
            {ciudadesDisponibles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {costoEnvio > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">
                Costo de envío:
              </span>
              <span className="text-lg font-bold text-blue-900">
                ${costoEnvio}.00 MXN
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              * El costo puede variar según el peso y volumen del pedido
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>* Los costos de envío son aproximados y pueden variar.</p>
        <p>* El admin confirmará el costo exacto al contactarte.</p>
      </div>
    </div>
  );
};

export default CalculadoraEnvio;