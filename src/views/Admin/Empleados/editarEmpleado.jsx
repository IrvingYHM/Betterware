import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";

function EditarEmpleado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState({
    vchNombre: "",
    vchAPaterno: "",
    vchAMaterno: "",
    vchCURP: "",
    vchCorreo: "",
    dtFechaNacimiento: "",
    vchLugarNacimiento: "",
    vchTelefono: "",
    chrSexo: "",
    EstadoEmp: "",
    TipoEmp: "",
    vchPreguntaSecreta: "",
    vchRespuestaSecreta: ""
  });

  useEffect(() => {
    if (id) {
      fetch(`https://backbetter-production.up.railway.app/empleados/empleado/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error("Error al obtener el empleado");
          return response.json();
        })
        .then((data) => setEmpleado(data))
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Solo permite editar el estado
  const handleEstadoChange = (e) => {
    setEmpleado((prevEmpleado) => ({
      ...prevEmpleado,
      EstadoEmp: e.target.value,
    }));
  };

  // Solo envía el estado y el id (opcionalmente otros campos requeridos por tu backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://backbetter-production.up.railway.app/empleados/estado/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EstadoEmp: empleado.EstadoEmp,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar el empleado");
        toast.success("Estado actualizado con éxito");
        setTimeout(() => navigate("/AfiliadosAd"), 3000);
      })
      .catch(() => toast.error("Error al actualizar el empleado"));
  };

  return (
    <div>
      <div className="flex flex-col items-center my-32">
        <Barra />
        <h2 className="text-2xl font-bold mb-4">Detalle del Afiliado</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          {/* Datos personales: solo lectura */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="vchNombre"
              value={empleado.vchNombre}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido Paterno:</label>
            <input
              type="text"
              name="vchAPaterno"
              value={empleado.vchAPaterno}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido Materno:</label>
            <input
              type="text"
              name="vchAMaterno"
              value={empleado.vchAMaterno}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CURP:</label>
            <input
              type="text"
              name="vchCURP"
              value={empleado.vchCURP}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico:</label>
            <input
              type="email"
              name="vchCorreo"
              value={empleado.vchCorreo}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="dtFechaNacimiento"
              value={empleado.dtFechaNacimiento?.slice(0, 10) || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Lugar de Nacimiento:</label>
            <input
              type="text"
              name="vchLugarNacimiento"
              value={empleado.vchLugarNacimiento}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              name="vchTelefono"
              value={empleado.vchTelefono}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sexo:</label>
            <input
              type="text"
              name="chrSexo"
              value={empleado.chrSexo}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tipo de Empleado:</label>
            <input
              type="text"
              name="TipoEmp"
              value={empleado.TipoEmp}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pregunta Secreta:</label>
            <input
              type="text"
              name="vchPreguntaSecreta"
              value={empleado.vchPreguntaSecreta}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Respuesta Secreta:</label>
            <input
              type="text"
              name="vchRespuestaSecreta"
              value={empleado.vchRespuestaSecreta}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          {/* Estado del empleado: editable */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold">
              Estado del Afiliado:
            </label>
            <select
              name="EstadoEmp"
              value={empleado.EstadoEmp || ""}
              onChange={handleEstadoChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Selecciona un estado</option>
              <option value="Aceptado">Aceptado</option>
              <option value="Rechazado">Rechazado</option>
              <option value="En espera">En espera</option>
              <option value="Desactivado">Desactivado</option>
            </select>
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar Estado
            </button>
          </div>
        </form>
      </div>
      
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
      <Fot />
    </div>
  );
}

export default EditarEmpleado;
