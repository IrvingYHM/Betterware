import { useState} from "react";
import Fot from "../../components/Footer";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CambioContrasena from "../Rec2/cambioCon";
import RecuperacionCodigo from "../Rec2/RecuperacionCodigo";
import QuestionForm from "./RecuperacionPregunta"; // Importa el nuevo componente
import Barra from "../../components/Navegacion/barra";

function Recuperar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [correoExistente, setCorreoExistente] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState(null);
  const [correoElectronico, setCorreoElectronico] = useState(""); // Variable de estado para guardar el correo electrónico
  const [mostrarFormularioCambio, setMostrarFormularioCambio] = useState(false);

  const handleRecoveryMethod = async (method) => {
    setRecoveryMethod(method);

    if (method === 'code') {
      try {
        const response = await fetch(
          "http://localhost:3000/clientes/enviar_codigo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ correoElectronico }), // Enviar el correo electrónico almacenado
          }
        );
  
        if (response.ok) {
          toast.success("Se envió un código al correo electrónico");
        } else {
          toast.error("Error al enviar el código por correo electrónico");
        }
      } catch (error) {
        toast.error("Error de red al enviar el código por correo electrónico:", error);
      }
    }
  };


  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:3000/clientes/recuperar-contrasena",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Este correo si existe", {
          onClose: () => {
            setTimeout(() => {
              setCorreoExistente(true);
              setCorreoElectronico(data.vchCorreo); // Guardar el correo electrónico en la variable de estado
            }, 100); // Redirigir después de 3 segundos
          },
        });
      } else {
        toast.error("Error correo no existente");
      }
    } catch (error) {
      toast.error("Error de red al recuperar la contraseña:", error);
    }
  };

  const handleBack = () => {
    setRecoveryMethod(null); // Volver a la selección de método
  };

  return (
    <>
    <Barra/>
      {!correoExistente && (
        <div className="my-28 text-center">
          <div className="container ml-auto mr-auto flex items-center justify-center">
            <div>
              <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
                Recuperación de contraseña
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="correoRe"
                    className="block text-sm font-medium text-gray-800 -translate-x-12"
                  >
                    Ingrese su correo electrónico:
                  </label>
                  <input
                    type="text"
                    id="correoRe"
                    {...register("vchCorreo", { required: true })}
                    className="mt-1 p-2 border rounded-md w-72 "
                    placeholder="Correo electrónico"
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                  />
                </div>
                {errors.correoRe && (
                  <span className="text-red-500 text-sm mt-1">
                    Este campo es requerido
                  </span>
                )}
                <button
                  className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center"
                  type="submit"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
            pogressBar
          />
        </div>
      )}
      {correoExistente && (
        <div className="my-28 text-center">
          <div className="container ml-auto mr-auto flex items-center justify-center">
            <div>
              <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
                Recuperación de contraseña
              </p>
              {recoveryMethod === null && (
                <>
                  <div className="mb-4">
                    <button
                      onClick={() => handleRecoveryMethod("question")}
                      className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center"
                    >
                      Mediante pregunta secreta
                    </button>
                  </div>
                  <div className="mb-4">
                    <button
                      onClick={() => handleRecoveryMethod("code")}
                      className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-14 py-2 justify-center mx-auto items-center"
                    >
                      Mediante código
                    </button>
                  </div>
                </>
              )}
              {recoveryMethod === "question" && !mostrarFormularioCambio && (
                <QuestionForm onSubmit={handleRecoveryMethod} /> 
              )}
              {recoveryMethod === "code" && !mostrarFormularioCambio && (
                <RecuperacionCodigo onBack={handleBack} />
              )}
              {mostrarFormularioCambio && (
                  <CambioContrasena correo={correoElectronico} />
              )}
            </div>
            
          </div>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          />
        </div>
      )}
      <Fot />
    </>
  );
}

export default Recuperar;
