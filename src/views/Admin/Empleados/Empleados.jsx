import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";
import Loader from "../../../components/Loader";

function App() {
  const [empleado, setEmpleado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch(
          "https://backbetter-production.up.railway.app/empleados/empleado"
        );
        if (!response.ok) {
          toast.error("Error al obtener los empleados");
        }
        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  // Manejar baja del empleado
  const handleDeactivate = () => {
    fetch(
      `https://backbetter-production.up.railway.app/empleados/empleado/${id}/baja`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al dar de baja al empleado");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Empleado dado de baja con éxito");
        setTimeout(() => navigate("/EmpleadoAd"), 3000);
      })
      .catch((error) => {
        toast.error("Error al dar de baja al empleado");
      });
  };

  /* if (loading) return <Loader mensaje="Cargando información de los afiliados..." />;
  if (error) return <p>Error: {error}</p>; */

  return (
    <div className="flex-center mt-16">
      {loading ? (
        <Loader mensaje="Cargando información de los afiliados..." /> //MUESTRA EL LOADER SI ESTÁ CARGANDO
      ) : (
        <>
          <div className=" mb-10">
            <h1 className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">
              Afiliados
            </h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-blue-700">
                  <tr>
                    <th className="px-2 py-3 text-center">ID</th>
                    <th className="px-2 py-3">NOMBRE COMPLETO</th>
                    <th className="px-2 py-3">CORREO ELECTRÓNICO</th>
                    <th className="px-2 py-3">CURP</th>
                    <th className="px-2 py-3">TELÉFONO</th>
                    <th className="px-2 py-3">TIPO</th>
                    <th className="px-2 py-3">ESTADO</th>
                    <th className="px-2 py-3">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {empleado.map((empleado) => (
                    <tr
                      key={empleado.intClvEmpleado}
                      className="bg-black border-b dark:bg-white dark:border-black hover:bg-gray-50 dark:hover:bg-gray-300"
                    >
                      <td className="px-2 py-4 font-medium whitespace-nowrap text-center">
                        {empleado.intClvEmpleado}
                      </td>
                      <td className="px-2 py-4 font-medium whitespace-nowrap">
                        {`${empleado.vchNombre} ${empleado.vchAPaterno} ${empleado.vchAMaterno}`}
                      </td>
                      <td className="px-2 py-4 font-medium whitespace-nowrap">
                        {empleado.vchCorreo}
                      </td>
                      <td className="px-2 py-4 font-medium whitespace-nowrap">
                        {empleado.vchCURP}
                      </td>
                      <td className="px-2 py-4 font-medium whitespace-nowrap">
                        {empleado.vchTelefono}
                      </td>
                      <td className="px-2 py-4 font-medium whitespace-nowrap">
                        {empleado.TipoEmp}
                      </td>
                      <td className="px-2 py-4 font-medium whitespace-nowrap">
                        {empleado.EstadoEmp}
                      </td>
                      <td className="px-2 py-4 flex items-center">
                        <Link
                          to={`/editarEmpleado/${empleado.intClvEmpleado}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3"
                          style={{ cursor: "pointer" }}
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-8">
              <Link
                className="cursor-pointer transition-all bg-blue-700 text-white px-2 py-2 rounded-lg border-blue-800 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                to="/AgEmpleado"
              >
                Agregar{" "}
              </Link>
            </div>
          </div>
        </>
      )}

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

export default App;
