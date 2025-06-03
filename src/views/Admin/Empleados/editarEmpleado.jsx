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
    vchCorreo: "",
    dtFechaNacimiento: "",
    vchTelefono: "",
    chrSexo: "",
    EstadoEmp: "",
    vchPreguntaSecreta: "",
    vchRespuestaSecreta: ""
  });

  // Cargar datos del empleado al montar el componente
  useEffect(() => {
    if (id) {
      fetch(
        `https://backopt-production.up.railway.app/empleados/empleado/${id}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener el empleado");
          }
          return response.json();
        })
        .then((data) => {
          setEmpleado(data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prevEmpleado) => ({
      ...prevEmpleado,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://backopt-production.up.railway.app/empleados/empleado/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empleado),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el empleado");
        }
        toast.success("Empleado actualizado con éxito");
        navigate("/EmpleadoAd");
      })
      .catch((error) => {
        toast.error("Error al actualizar el empleado");
      });
  };

  // Manejar baja del empleado
  const handleDeactivate = () => {
    fetch(`https://backopt-production.up.railway.app/empleado/${id}/baja`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al dar de baja al empleado");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Empleado dado de baja con éxito");
        navigate("/EmpleadoAd");
      })
      .catch((error) => {
        toast.error("Error al dar de baja al empleado");
      });
  };
  
  return (
    <div>
    <div className="flex flex-col items-center my-32">
      <Barra/>
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Editar Empleado</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Campos del formulario */}
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="vchNombre"
            value={empleado.vchNombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido Paterno:</label>
          <input
            type="text"
            name="vchAPaterno"
            value={empleado.vchAPaterno}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido Materno:</label>
          <input
            type="text"
            name="vchAMaterno"
            value={empleado.vchAMaterno}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            name="vchCorreo"
            value={empleado.vchCorreo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="dtFechaNacimiento"
            value={empleado.dtFechaNacimiento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Teléfono:</label>
          <input
            type="text"
            name="vchTelefono"
            value={empleado.vchTelefono}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sexo:</label>
          <input
            type="text"
            name="chrSexo"
            value={empleado.chrSexo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pregunta Secreta:</label>
          <input
            type="text"
            name="vchPreguntaSecreta"
            value={empleado.vchPreguntaSecreta}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Respuesta Secreta:</label>
          <input
            type="text"
            name="vchRespuestaSecreta"
            value={empleado.vchRespuestaSecreta}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Actualizar Empleado
          </button>
          <button
            type="button"
            onClick={handleDeactivate}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Dar de Baja
          </button>
        </div>
      </form>
    </div>
    <Fot/>

    </div>
  );
}

export default EditarEmpleado;
