import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";

function App() {
  const [empleado, setEmpleado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("https://backopt-production.up.railway.app/empleados/empleado");
        if (!response.ok) {
          throw new Error("Error al obtener los empleados");
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
    fetch(`https://backopt-production.up.railway.app/empleados/empleado/${id}/baja`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Barra/>
      <ToastContainer />
      <div className="flex-center my-32">
        <h1 className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">
          Empleados
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-blue-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4 text-center">ID</th>
                <th scope="col" className="px-6 py-3">NOMBRE COMPLETO</th>
                <th scope="col" className="px-6 py-3">CORREO ELECTRÓNICO</th>
                <th scope="col" className="px-6 py-3">FECHA DE NACIMIENTO</th>
                <th scope="col" className="px-6 py-3">TELÉFONO</th>
                <th scope="col" className="px-6 py-3">SEXO</th>
                <th scope="col" className="px-6 py-3">ESTADO EMPLEADO</th>
                <th scope="col" className="px-6 py-3">PREGUNTA SECRETA</th>
                <th scope="col" className="px-6 py-3">RESPUESTA SECRETA</th>
                <th scope="col" className="px-6 py-3">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {empleado.map((empleado) => (
                <tr
                  key={empleado.intClvEmpleado}
                  className="bg-black border-b dark:bg-white dark:border-black hover:bg-gray-50 dark:hover:bg-gray-300"
                >
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.intClvEmpleado}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {`${empleado.vchNombre} ${empleado.vchAPaterno} ${empleado.vchAMaterno}`}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.vchCorreo}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.dtFechaNacimiento}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.vchTelefono}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.chrSexo}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.EstadoEmp}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.vchPreguntaSecreta}
                  </td>
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {empleado.vchRespuestaSecreta}
                  </td>
                  <td className="px-6 py-4 flex items-center">
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
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            to="/AgEmpleado"
          >
            Agregar{" "}
          </Link>
        </div>
      </div>
      <Fot />
    </>
  );
}

export default App;
