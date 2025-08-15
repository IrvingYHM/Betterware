import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";
import { ChevronLeft, Edit3, Trash2, Save, X } from "lucide-react";

const obtenermesAnteriorYaño = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1); // retrocede un month
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return {
    month: meses[date.getMonth()],
    year: date.getFullYear(),
  };
};  

function TopReferidosForm({ 
  integratedMode = false, 
  onBack = null, 
  showNavBar = true 
}) {
  const [numReferidos, setNumReferidos] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [topReferidos, setTopReferidos] = useState([]);
  const [{ month, year }] = useState(obtenermesAnteriorYaño());
  const [editandoId, setEditandoId] = useState(null);
  const [valorEditando, setValorEditando] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    axios
      .get("https://backbetter-production.up.railway.app/empleados/empleado")
      .then((res) => setEmpleados(res.data))
      .catch(() => toast.error("Error al cargar empleados"));

    axios
      .get(
        `https://backbetter-production.up.railway.app/top-referidos?month=${month}&year=${year}`
      )
      .then((res) => setTopReferidos(res.data))
      .catch(() => toast.error("Error al cargar top Referidos"));
  }, []);

  const normalizar = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const empleadosFiltrados = empleados.filter((emp) => {
    const nombreCompleto = `${emp.vchNombre} ${emp.vchAPaterno} ${emp.vchAMaterno}`;
    return normalizar(nombreCompleto).includes(normalizar(busqueda));
  });

  const topDelmonth = topReferidos.filter((t) => t.month === month && t.year === year);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empleadoSeleccionado || !numReferidos) {
      toast.error("Selecciona un empleado y registra el número de Referidos");
      return;
    }

    try {
      await axios.post(
        "https://backbetter-production.up.railway.app/top-referidos/nuevo-top",
        {
          intClvEmpleado: empleadoSeleccionado.intClvEmpleado,
          month,
          year,
          numReferidos,
        }
      );

      toast.success("Registro agregado al Top de Referidos");
      setBusqueda("");
      setEmpleadoSeleccionado(null);
      setNumReferidos("");

      // Refrescar el top
      await refreshTopReferidos();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocurrió un error al registrar el top referidos");
      }
    }
  };

  const refreshTopReferidos = async () => {
    try {
      const res = await axios.get(
        `https://backbetter-production.up.railway.app/top-referidos?month=${month}&year=${year}`
      );
      setTopReferidos(res.data);
    } catch (error) {
      toast.error("Error al cargar top referidos");
    }
  };

  const handleEdit = (referido) => {
    setEditandoId(referido.idTopReferidos);
    setValorEditando(referido.numReferidos.toString());
  };

  const handleCancelEdit = () => {
    setEditandoId(null);
    setValorEditando("");
  };

  const handleSaveEdit = async (referidoId) => {
    if (!valorEditando || valorEditando === "0") {
      toast.error("El número de referidos debe ser mayor a 0");
      return;
    }

    try {
      // Encontrar el registro actual para obtener los datos completos
      const referidoActual = topReferidos.find(r => r.idTopReferidos === referidoId);
      if (!referidoActual) {
        toast.error("Registro no encontrado");
        return;
      }

      await axios.put(
        `https://backbetter-production.up.railway.app/top-referidos/actualizarTop/${referidoId}`,
        {
          intClvEmpleado: referidoActual.intClvEmpleado,
          month: referidoActual.month,
          year: referidoActual.year,
          numReferidos: parseInt(valorEditando)
        }
      );
      
      toast.success("Registro actualizado exitosamente");
      setEditandoId(null);
      setValorEditando("");
      await refreshTopReferidos();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al actualizar el registro");
      }
    }
  };

  const handleDelete = (referidoId, nombreCompleto) => {
    setDeleteConfirm({ referidoId, nombreCompleto });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await axios.patch(
        `https://backbetter-production.up.railway.app/top-referidos/eliminar/${deleteConfirm.referidoId}`
      );
      
      toast.success("Registro eliminado exitosamente");
      setDeleteConfirm(null);
      await refreshTopReferidos();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al eliminar el registro");
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleBackClick = () => {
    if (integratedMode && onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div
      className={`${
        integratedMode ? "" : "min-h-screen flex flex-col mt-32"
      } bg-gradient-to-br from-gray-50 via-white to-blue-50`}
    >
      {showNavBar && <Barra />}
      <div
        className={`${
          integratedMode ? "p-6" : "flex-grow container mx-auto px-4 mb-10"
        }`}
      >
        {integratedMode && (
          <div className="mb-8">
            <button
              onClick={handleBackClick}
              className="flex items-center text-xl font-bold text-teal-600 hover:text-teal-700 mb-6 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
              Regresar
            </button>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Top Referidos
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">
                    Gestionar ranking de afiliados - {month} {year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 bg-white/90 backdrop-blur-sm shadow-xl p-8 rounded-2xl border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Agregar Top referidos ({month} {year})
            </h2>

            <div className="mb-4">
              <label className="font-semibold block mb-1">
                Buscar afiliado:
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Nombre del afiliado"
                className="w-full border px-3 py-2 rounded-md"
              />
              {busqueda && (
                <ul className="mt-2 border max-h-48 overflow-y-auto rounded-md bg-white shadow">
                  {empleadosFiltrados.map((emp) => (
                    <li
                      key={emp.intClvEmpleado}
                      onClick={() => {
                        setEmpleadoSeleccionado(emp);
                        setBusqueda(
                          `${emp.vchNombre} ${emp.vchAPaterno} ${emp.vchAMaterno}`
                        );
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {emp.vchNombre} {emp.vchAPaterno} {emp.vchAMaterno}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {empleadoSeleccionado && (
              <div className="mb-4 text-sm bg-gray-100 p-3 rounded">
                <strong>Afiliado seleccionado:</strong>
                <br />
                {empleadoSeleccionado.vchNombre}{" "}
                {empleadoSeleccionado.vchAPaterno}{" "}
                {empleadoSeleccionado.vchAMaterno}
              </div>
            )}

            <div className="mb-4">
              <label className="font-semibold block mb-1">
                Número de Referidos:
              </label>
              <input
                type="number"
                value={numReferidos}
                onChange={(e) => setNumReferidos(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Registrar en Top Referidos
            </button>
          </form>

          {/* Listado de top Referidos */}
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-sm shadow-xl p-8 rounded-2xl border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-center">
              Top Referidos - {month} {year}
            </h2>
            {topDelmonth.length === 0 ? (
              <p className="text-gray-600 text-center">No hay registros aún.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {topDelmonth
                  .sort((a, b) => b.numReferidos - a.numReferidos)
                  .map((referido, index) => {
                    const nombreCompleto = `${referido.empleado?.vchNombre} ${referido.empleado?.vchAPaterno} ${referido.empleado?.vchAMaterno}`;
                    const isEditing = editandoId === referido.idTopReferidos;

                    return (
                      <li key={referido.idTopReferidos} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-500">
                              #{index + 1}
                            </span>
                            <div>
                              <p className="font-medium text-gray-900">
                                {nombreCompleto}
                              </p>
                              <div className="flex items-center space-x-2">
                                {isEditing ? (
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="number"
                                      value={valorEditando}
                                      onChange={(e) =>
                                        setValorEditando(e.target.value)
                                      }
                                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      min="1"
                                    />
                                    <span className="text-sm text-gray-600">
                                      referidos
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-blue-600 font-bold">
                                    {referido.numReferidos} referidos
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleSaveEdit(referido.idTopReferidos)
                                  }
                                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                                  title="Guardar cambios"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
                                  title="Cancelar edición"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(referido)}
                                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                  title="Editar registro"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete(
                                      referido.idTopReferidos,
                                      nombreCompleto
                                    )
                                  }
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                  title="Eliminar registro"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {!integratedMode && <Fot />}
      {!integratedMode && (
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
      )}
      
      {/* Modal de confirmación personalizada */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Eliminar del Top de Referidos?
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de eliminar el registro de <span className="font-semibold">{deleteConfirm.nombreCompleto}</span> del top de afiliados?
                <br />
                <span className="text-sm text-red-600 mt-2 block">Esta acción no se puede deshacer.</span>
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopReferidosForm;
