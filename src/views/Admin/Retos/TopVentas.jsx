import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";

const obtenerMesAnteriorYAño = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1); // retrocede un mes
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
    mes: meses[date.getMonth()],
    año: date.getFullYear(),
  };
};  

function TopVendedorForm() {
  const [mes] = useState(obtenerMesAnteriorYAño());
  const [año] = useState(obtenerAñoAnteriorSiEnero());
  const [numVentas, setNumVentas] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [topVendedores, setTopVendedores] = useState([]);

  useEffect(() => {
    axios
      .get("https://backbetter-production.up.railway.app/empleados/empleado")
      .then((res) => setEmpleados(res.data))
      .catch(() => toast.error("Error al cargar empleados"));

    axios
      .get(`https://backbetter-production.up.railway.app/top-vendedor?mes=${mes}&año=${año}`)
      .then((res) => setTopVendedores(res.data))
      .catch(() => toast.error("Error al cargar top vendedores"));
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

  const topDelMes = topVendedores.filter((t) => t.mes === mes && t.año === año);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empleadoSeleccionado || !numVentas) {
      toast.error("Selecciona un empleado y registra el número de ventas");
      return;
    }

    try {
      await axios.post(
        "https://backbetter-production.up.railway.app/top-vendedor/nuevo-top",
        {
          intClvEmpleado: empleadoSeleccionado.intClvEmpleado,
          mes,
          año,
          numVentas,
        }
      );

      toast.success("Registro agregado al Top de ventas");
      setBusqueda("");
      setEmpleadoSeleccionado(null);
      setNumVentas("");

      // Refrescar el top
      const res = await axios.get(
        "https://backbetter-production.up.railway.app/top-vendedor/"
      );
      setTopVendedores(res.data);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocurrió un error al registrar el top vendedor");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-32">
      <Barra />
      <div className="flex-grow container mx-auto px-4 mb-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-1/2 bg-white shadow-md p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Agregar Top Vendedor ({mes} {año})
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
                Número de ventas:
              </label>
              <input
                type="number"
                value={numVentas}
                onChange={(e) => setNumVentas(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Registrar en Top Ventas
            </button>
          </form>

          {/* Listado de top vendedores */}
          <div className="w-full lg:w-1/2 bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Top Vendedores - {mes} {año}
            </h2>
            {topDelMes.length === 0 ? (
              <p className="text-gray-600 text-center">No hay registros aún.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {topDelMes
                  .sort((a, b) => b.numVentas - a.numVentas)
                  .map((vendedor, index) => (
                    <li key={vendedor.idTopVendedor} className="py-3">
                      <span className="font-semibold mr-2">#{index + 1}</span>
                      {vendedor.empleado?.vchNombre}{" "}
                      {vendedor.empleado?.vchAPaterno}{" "}
                      {vendedor.empleado?.vchAMaterno} -{" "}
                      <span className="text-blue-600 font-bold">
                        {vendedor.numVentas} ventas
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Fot />
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
    </div>
  );
}

export default TopVendedorForm;
