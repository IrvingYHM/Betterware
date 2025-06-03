import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Fot from "../../../components/Footer";
import BarraAd from "../../../components/Navegacion/barraAdmin";

function App() {
  const [clientes, setClientes] = useState([]);
  
  useEffect(() => {
    fetch("https://backopt-production.up.railway.app/clientes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los clientes");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <BarraAd/>
      <ToastContainer />
      <div className="flex-center my-32">
        <h1 className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">
          Clientes
        </h1>

        <div className="relative mx-10 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-blue-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4 text-center">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 ">
                  NOMBRE
                </th>
                <th scope="col" className="px-6 py-3 ">
                  CORREO ELECTRÓNICO
                </th>
                <th scope="col" className="px-6 py-3">
                  FECHA DE NACIMIENTO.
                </th>
                <th scope="col" className="px-6 py-3">
                  TELÉFONO
                </th>
                <th scope="col" className="px-6 py-3">
                  PREGUNTA SECRETA
                </th>
                <th scope="col" className="px-6 py-3">
                  RESPUESTA SECRETA
                </th>
                <th scope="col" className="px-6 py-3">
                  INTENTOS EN EL LOGIN
                </th>
                <th scope="col" className="px-6 py-3">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr
                  key={cliente.intClvCliente}
                  className="bg-black border-b dark:bg-white dark:border-black hover:bg-gray-50 dark:hover:bg-gray-300"
                >
                  <td 
                  
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {cliente.intClvCliente}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                  
                    {`${cliente.vchNomCliente} ${cliente.vchAPaterno} ${cliente.vchAMaterno}`}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                    
                    {cliente.vchCorreo}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                                      
                    {cliente.dtFechaNacimiento}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                                      
                    {cliente.vchTelefono}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                                      
                    {cliente.vchPreguntaSecreta}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                                      
                    {cliente.vchRespuestaSecreta}
                  </td>
                  <td 
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                                      
                    {cliente.intentosLogin}
                  </td>
                  <td className="px-6 py-4 flex items-center">
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
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
              border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            to="/ClientesAg"
          >
            Dar de alta{" "}
          </Link> */}
        </div>
      </div>
      <Fot/>

    </>
  );
}

export default App;
