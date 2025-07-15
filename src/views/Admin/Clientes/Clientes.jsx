import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Fot from "../../../components/Footer";
import BarraAd from "../../../components/Navegacion/barraAdmin";
import Loader from "../../../components/Loader";

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("https://backbetter-production.up.railway.app/clientes")
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al obtener los clientes");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); //TERMINA LA CARGA
      });
  }, []);

  return (
    <div className="flex-center mt-16">
      {loading ? (
        <Loader mensaje="Cargando información de los clientes..." /> //MUESTRA EL LOADER SI ESTÁ CARGANDO
      ) : (
        <>
          <div >
            <h1 className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">
              Clientes
            </h1>

            <div className="relative mx-10 overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-blue-700">
                  <tr>
                    <th scope="col" className="p-4 text-center">
                      ID
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      NOMBRE
                    </th>
                    <th scope="col" className="px-4 py-3 ">
                      CORREO ELECTRÓNICO
                    </th>
                    <th scope="col" className="px-4 py-3">
                      FECHA DE NACIMIENTO.
                    </th>
                    <th scope="col" className="px-4 py-3">
                      TELÉFONO
                    </th>
                    <th scope="col" className="px-4 py-3">
                      PREGUNTA SECRETA
                    </th>
                    <th scope="col" className="px-4 py-3">
                      RESPUESTA SECRETA
                    </th>
                    <th scope="col" className="px-4 py-3">
                      INTENTOS EN EL LOGIN
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ACCIÓN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr
                      key={cliente.intClvCliente}
                      className="bg-black border-b dark:bg-white dark:border-black hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.intClvCliente}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {`${cliente.vchNomCliente} ${cliente.vchAPaterno} ${cliente.vchAMaterno}`}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.vchCorreo}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.dtFechaNacimiento}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.vchTelefono}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.vchPreguntaSecreta}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.vchRespuestaSecreta}
                      </td>
                      <td className="px-4 py-4 font-medium whitespace-nowrap">
                        {cliente.intentosLogin}
                      </td>
                      <td className="px-4 py-4 flex items-center">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3"
                          style={{ cursor: "pointer" }}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          style={{ cursor: "pointer" }}
                        >
                          Remove
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-8">
              {/*           <Link
            className="cursor-pointer transition-all bg-blue-500 text-white px-4 py-2 rounded-lg
              border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            to="/ClientesAg"
          >
            Dar de alta{" "}
          </Link> */}
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
