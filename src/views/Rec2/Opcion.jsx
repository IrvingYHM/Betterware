import { useState } from "react";
import Fot from "../../components/Footer";
import imagen from "../../img/contra.jpg";
import FormularioPregunta from "./PreguntaS";
import FormularioCodigo from "./recuperar";
import Barra from "../../components/Navegacion/barra";

const Opcion = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState(null);

  const handleBack = () => {
    setRecoveryMethod(null); // Volver a la selección de método
    setMostrarFormulario(false);
  };

  const handleRecoveryMethod = (method) => {
    setMostrarFormulario(true);
    setRecoveryMethod(method);
  };

  return (
    <>
    <Barra/>
      <div className="flex items-center justify-center py-28">
      <div className="relative flex w-22 max-w-[48rem] flex-row rounded-xl bg-white text-gray-700 shadow-md border border-black ">

          <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700 border border-black">
            <img
              src={imagen}
              alt="image"
              className=" flex h-full w-full  object-cover"
            />
          </div>
          <div className="p-6 sm:px-20">
            <h6 className="mb-4 block font-sans text-base font-bold uppercase leading-relaxed tracking-normal text-cyan-950 text-center antialiased">
              Recuperacion de contraseña
            </h6>
            {recoveryMethod === null && mostrarFormulario === false && (
              <>
                <div className="flex justify-center mt-2">
                  <button
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded-md"
                    onClick={() => handleRecoveryMethod("question")}
                  >
                    Pregunta secreta
                  </button>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-6 mr-2 rounded-md"
                    onClick={() => handleRecoveryMethod("code")}
                  >
                    Enviar Codigo
                  </button>
                </div>
              </>
            )}

            {recoveryMethod === "question" && mostrarFormulario && (
              <FormularioPregunta handleBack={handleBack} />
            )}

            {recoveryMethod === "code" && mostrarFormulario && (
              <FormularioCodigo handleBack={handleBack} />
            )}
          </div>
        </div>
      </div>
      <Fot />
    </>
  );
};

export default Opcion;
