import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  addDays,
} from "date-fns";
import { es } from "date-fns/locale";
import axios from "axios";
import useFetchHorarios from "../Citas/horariosDisp";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";

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

const ModificarCita = () => {
  const [mesActual, setMesActual] = useState(new Date());
  const [selectFecha, setSelectFecha] = useState(null);
  const [selectHora, setSelectHora] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idTipoCita, setIdTipoCita] = useState("");
  const [costo, setCosto] = useState("");
  const [descripcionT, setDescripcionT] = useState("");
  const { horarios, loading, error } = useFetchHorarios(
    selectFecha ? format(selectFecha, "yyyy-MM-dd") : null
  );
  const navigate = useNavigate();
  const [descripcionTLength, setDescripcionTLength] = useState(0);

  // Datos de los tipos de citas
  const tiposCita = [
    { id: 1, nombre: "Examen de vista", costo: 100 },
    { id: 2, nombre: "Ajuste de Gafas", costo: 150 },
    { id: 3, nombre: "Examen de Lentes de Contacto", costo: 120 },
    { id: 4, nombre: "Examen de Salud Ocular", costo: 160 },
    { id: 5, nombre: "Otro", costo: 180 },
  ];

  useEffect(() => {
    // Verificar el tipo de usuario al cargar la página
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setIdCliente(decodedToken.clienteId);
    }
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const handleDateClick = (day) => {
    setSelectFecha(day);
    setSelectHora(""); // Resetear la hora seleccionada al cambiar la fecha
  };

  const handleNextMonth = () => {
    setMesActual(addMonths(mesActual, 1));
  };

  const handlePrevMonth = () => {
    setMesActual(subMonths(mesActual, 1));
  };

  const handleTipoCitaChange = (e) => {
    const tipoCitaSeleccionada = tiposCita.find(
      (tipo) => tipo.id === parseInt(e.target.value)
    );
    if (tipoCitaSeleccionada) {
      setIdTipoCita(tipoCitaSeleccionada.id);
      setCosto(tipoCitaSeleccionada.costo);
      if (tipoCitaSeleccionada.id !== 5) {
        setDescripcionT(""); // Resetea el campo "Otro" si no está seleccionado
      }
    }
  };

  const handleSubmit = async () => {
    if (
      selectFecha &&
      selectHora &&
      idCliente &&
      idTipoCita &&
      costo &&
      (idTipoCita !== 5 || (idTipoCita === 5 && descripcionT))
    ) {
      try {
        // Crear la cita
        const citaResponse = await axios.post(
          "https://backopt-production.up.railway.app/cita",
          {
            Fecha: format(selectFecha, "yyyy-MM-dd"),
            Hora: selectHora,
            IdCliente: idCliente,
            IdTipoCita: idTipoCita,
            Costo: costo,
            IdEstadoCita: 1,
            DescripcionT: idTipoCita === 5 ? descripcionT : null,
          }
        );

        if (citaResponse.status === 201) {
          // Reservar el horario
          try {
            const reservaResponse = await axios.post(
              "https://backopt-production.up.railway.app/horarios/reservar",
              {
                Fecha: format(selectFecha, "yyyy-MM-dd"),
                Hora: selectHora,
              }
            );

            if (reservaResponse.status === 200) {
              toast.success("Cita agendada y horario reservado exitosamente");
              setTimeout(() => {
                navigate("/inicio"); // Redirige al usuario a la página de inicio de sesión
              }, 5000);
            } else {
              toast.error(
                "Cita agendada, pero hubo un problema al reservar el horario"
              );
            }
          } catch (reservaError) {
            toast.error(
              `Cita agendada, pero hubo un problema al reservar el horario: ${reservaError.message}`
            );
          }
        } else {
          toast.error("Hubo un problema al agendar la cita");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.error("La hora y fecha seleccionada ya están ocupadas");
          } else if (error.response.data && error.response.data.message) {
            toast.error(`Error: ${error.response.data.message}`);
          } else {
            toast.error("Hubo un problema al agendar la cita");
          }
        } else {
          toast.error(`Error: ${error.message}`);
        }
      }
    } else {
      toast.error("Por favor, completa todos los campos");
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <button onClick={handlePrevMonth} className="text-xl lg:text-2xl">
          &lt;
        </button>
        <span className="text-xl lg:text-2xl font-bold uppercase">
          {format(mesActual, "MMMM yyyy", { locale: es })}
        </span>
        <button onClick={handleNextMonth} className="text-xl lg:text-2xl">
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 gap-2 text-center mt-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-sm lg:text-lg font-semibold">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(mesActual);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d", { locale: es });
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-2 lg:p-3 text-center cursor-pointer text-lg lg:text-xl ${
              !isSameMonth(day, monthStart) ? "text-gray-300" : ""
            } ${
              isSameDay(day, selectFecha)
                ? "bg-blue-500 text-white rounded-full"
                : "hover:bg-blue-200 rounded-full"
            }`}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1); // Incrementa el día correctamente
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <>
      <div className="flex flex-col items-center mt-28 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-6">
        <Barra />
        <div className="px-6 py-6 bg-white rounded-xl shadow-md space-y-2 w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Agendar Cita</h2>
          <div className="mb-4">
            <label htmlFor="tipoCita" className="block mb-1 font-semibold">
              Tipo de Cita
            </label>
            <select
              id="tipoCita"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={idTipoCita}
              onChange={handleTipoCitaChange}
              required
              disabled
            >
              <option value="">Seleccione un tipo de cita</option>
              {tiposCita.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre} - ${tipo.costo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="descripcionT" className="block mb-1 font-semibold">
              Descripción (Solo si seleccionó "Otro")
            </label>
            <textarea
              id="descripcionT"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={descripcionT}
              onChange={(e) => {
                setDescripcionT(e.target.value);
                setDescripcionTLength(e.target.value.length);
              }}
              maxLength={100}
              disabled
            />
            <div className="text-right text-sm text-gray-500">
              {descripcionTLength}/100
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="costo" className="block mb-1 font-semibold">
              Costo
            </label>
            <input
              id="costo"
              type="number"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={costo}
              disabled
              onChange={(e) => setCosto(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="calendario" className="block mb-1 font-semibold">
              Fecha
            </label>
            <div
              id="calendario"
              className="px-4 bg-white rounded-xl shadow-md space-y-2 w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              {renderHeader()}
              {renderDays()}
              {renderCells()}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="hora" className="block mb-1 font-semibold">
              Hora
            </label>
            <select
              id="hora"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectHora}
              onChange={(e) => setSelectHora(e.target.value)}
              required
            >
              <option value="">Seleccione una hora</option>
              {horarios.map((horario, index) => (
                <option key={index} value={horario.Hora}>
                  {horario.Hora}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg lg:text-xl"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Fot />
    </>
  );
};

export default ModificarCita;
