import React, { useEffect, useState } from "react";
import axios from "axios";
import Barra from "../../../components/Navegacion/barra";
import Fot from "../../../components/Footer";
import { Link } from "react-router-dom";
import CancelarCita from "./cancelarCita";

// Función para decodificar JWT
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

const VerCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [idUsuario, setIdUsuario] = useState("");

  // Función para obtener citas
  const fetchCitas = async () => {
    if (idUsuario) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backopt-production.up.railway.app/cita`
        );
        // Ordenar citas por fecha en orden descendente
        const citasOrdenadas = response.data.sort(
          (a, b) => new Date(b.Fecha) - new Date(a.Fecha)
        );
        setCitas(citasOrdenadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Verificar el tipo de usuario al cargar la página
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setIdUsuario(decodedToken.clienteId);
      setUsuarioLogueado(true);
    }
  }, []);

  useEffect(() => {
    fetchCitas();
  }, [idUsuario]);

  // Función para manejar la eliminación de la cita
  const handleCancelSuccess = async (citaId) => {
    try {
      // Llamar al endpoint de cancelación de cita
      await axios.put(
        `https://backopt-production.up.railway.app/cita/cancelar/${citaId}`
      );

      // Volver a obtener las citas actualizadas
      fetchCitas();
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 mt-20">
      <Barra />
      <div className="flex flex-col items-center pt-8 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Mis Citas</h1>
        {citas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tipo de Cita
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Observaciones
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {citas.map((cita) => (
                  <tr key={cita.IdCita} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {cita.IdCita}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.Fecha}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.Hora}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.IdTipoCita ? cita.IdTipoCita : "No disponible"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.Costo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.IdEstadoCita ? cita.IdEstadoCita : "No disponible"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.Observaciones}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {cita.DescripcionT}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/modificar-cita/${cita.IdCita}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                          Modificar
                        </Link>
                        <CancelarCita
                          citaId={cita.IdCita}
                          onCancelSuccess={() =>
                            handleCancelSuccess(cita.IdCita)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-4">
            No se encontraron citas para este usuario.
          </div>
        )}
      </div>
      <Fot />
    </div>
  );
};

export default VerCitas;
