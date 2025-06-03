import React, { useEffect, useState } from "react";
import axios from "axios";
import Barra from "../../../components/Navegacion/barra";
import Fot from "../../../components/Footer";
import { Link } from "react-router-dom";
import CancelarCita from "./cancelarCita";
import Nocita from "../../../img/nocita.jpg";

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

  const estadoCitaMap = {
    1: "Programada",
    2: "Cancelada",
    3: "Completada",
  };

  const fetchCitas = async () => {
    if (idUsuario) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://backopt-production.up.railway.app/cita/usuario/${idUsuario}`
        );
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

  const handleCancelSuccess = async (citaId) => {
    try {
      await axios.put(
        `https://backopt-production.up.railway.app/cita/cancelar/${citaId}`
      );
      fetchCitas();
    } catch (error) {
      console.error("Error al cancelar la cita:", error);
    }
  };

  /*   if (loading) {
    return <div className="text-center p-4">Cargando...</div>;
  } */

  /*   if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  } */

  return (
    <div className="bg-white min-h-screen pt-20">
      <Barra />
      <div className="flex flex-col items-center pt-8 mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2 text-center ">Mis Citas</h1>
        {citas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {citas.map((cita) => (
              <div
                key={cita.IdCita}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <h2 className="text-2xl font-semibold mb-2 text-blue-800">
                  ID: {cita.IdCita}
                </h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Fecha:</span> {cita.Fecha}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Hora:</span> {cita.Hora}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Tipo de Cita:</span>{" "}
                  {cita.IdTipoCita || "No disponible"}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Costo:</span> {cita.Costo}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Estado:</span>{" "}
                  <span
                    className={`${
                      cita.IdEstadoCita === 1
                        ? "text-green-600"
                        : "text-red-600"
                    } font-semibold`}
                  >
                    {estadoCitaMap[cita.IdEstadoCita] || "Cita cancelada"}
                  </span>
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {cita.Observaciones}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Descripción:</span>{" "}
                  {cita.DescripcionT}
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <Link
                    to={`/modificar-cita/${cita.IdCita}`}
                    className="bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                  >
                    Modificar
                  </Link>
                  <CancelarCita
                    citaId={cita.IdCita}
                    onCancelSuccess={() => handleCancelSuccess(cita.IdCita)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 text-red-600 font-bold text-xl md:text-3xl">
            No has creado ninguna cita.
            <img
              src={Nocita}
              alt="No se encontraron citas"
              className="w-full max-w-lg mx-auto my-4"
              style={{ height: "auto" }}
            />
          </div>
        )}
      </div>
      <Fot />
    </div>
  );
};

export default VerCitas;
