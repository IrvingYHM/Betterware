import { useState, /* useRef  */} from "react";
import Fot from "../components/Footer";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CambioContrasena from "./cambioCon";
import RecuperacionCodigo from "./RecuperacionCodigo";

function Recuperar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [correoExistente, setCorreoExistente] = useState(false);
  const [recoveryMethod, setRecoveryMethod] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
/*   const codeRefs = Array(6).fill(null).map(() => useRef()); // Array de referencias para los cuadros de texto
  const [code, setCode] = useState(Array(6).fill("")); */
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [correoElectronico, setCorreoElectronico] = useState(""); // Variable de estado para guardar el correo electrónico
  const [mostrarFormularioCambio, setMostrarFormularioCambio] = useState(false);
  

  const handleRecoveryMethod = async (method) => {
    setRecoveryMethod(method);
    setSelectedQuestion("");
    setAnswer("");
   /*  setCode(Array(6).fill("")); */ // Resetea el código cuando cambia el método de recuperación
    // Aquí podrías enviar un código por correo si se selecciona el método 'code'
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

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/clientes/verificar-respuesta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vchPreguntaSecreta: selectedQuestion,
            vchRespuestaSecreta: answer,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (
          data.message ===
          "Respuesta secreta correcta. Puede cambiar la contraseña."
        ) {
          toast.success("la respuesta es correcta");
          setMostrarFormularioCambio(true);
        } else {
          toast.error("La respuesta secreta es incorrecta");
        }
      } else {
        toast.error("La respuesta de la pregunta secreta es incorrecta");
      }
    } catch (error) {
      toast.error("Error de red al verificar la respuesta secreta:", error);
    }
  };

  const handleBack = () => {
    setRecoveryMethod(null); // Volver a la selección de método
    setRespuestaCorrecta(false); // Reiniciar la variable de respuesta correcta
  };

/*   const handleCodeChange = (digit, index) => {
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    console.log(newCode);

    if (digit !== "" && index < 5) {
      // Enfocar el siguiente cuadro de texto si se ingresó un dígito y no es el último
      codeRefs[index + 1].current.focus();
    }
  };

  const verificarCodigo = async (codigo) => {
    console.log(codigo);
    try {
      const response = await fetch(
        "http://localhost:3000/clientes/Verificacion_codigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Codigo), // Enviar solo el código, sin una clave adicional
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        if (data.message === "Código de recuperación correcto. Puede cambiar la contraseña.") {
          // Aquí puedes manejar la lógica para cambiar la contraseña
          toast.success("Código correcto, proceder al cambio de contraseña");
          setMostrarFormularioCambio(true);
  
        } else {
          toast.error("El código de recuperación es incorrecto");
        }
      } else {
        toast.error("Error al verificar el código de recuperación");
      }
    } catch (error) {
      toast.error("Error de red al verificar el código de recuperación:", error);
    }
  }; */
  

  return (
    <>
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
                <div>
                  <form onSubmit={handleQuestionSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-800 mb-2 -translate-x-9"
                      >
                        Selecciona una pregunta secreta:
                      </label>
                      <select
                        id="question"
                        className="border border-gray-300 py-4 rounded-lg focus:border-indigo-500 outline-none focus:right-1 focus:ring-indigo-500 w-72 select-selected text-sm "
                        value={selectedQuestion}
                        onChange={(e) => setSelectedQuestion(e.target.value)}
                      >
                        <option disabled value="">
                          Selecciona uno
                        </option>
                        <option value="color">
                          ¿Cuál es tu color favorito?
                        </option>
                        <option value="¿El nombre de tu mejor amigo?">
                          ¿El nombre de tu mejor amigo?
                        </option>
                        <option value="mascota">
                          ¿Cuál es el nombre de tu mascota?
                        </option>
                        <option value="comida">
                          ¿Cuál es tu comida favorita?
                        </option>
                      </select>
                    </div>
                    {selectedQuestion !== "" && (
                      <div>
                        <label
                          htmlFor="answer"
                          className="block text-sm font-medium text-gray-800 -translate-x-28"
                        >
                          Respuesta:
                        </label>
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="mt-1 p-2 border rounded-md w-72 text-center"
                          placeholder="Ingresa tu respuesta"
                        />
                      </div>
                    )}
                    <button
                      className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center mt-4"
                      type="submit"
                    >
                      Enviar respuesta
                    </button>
                  </form>
                  <br />
                  <button
                    onClick={handleBack}
                    className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center mb-4"
                  >
                    Volver
                  </button>
                </div>
              )}
              {recoveryMethod === "code" && !mostrarFormularioCambio && (
 /*                <form onSubmit={handleSubmit(verificarCodigo)}>
                  <div className="mb-4">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-gray-800 mb-2"
                    >
                      Introduce el código de 6 dígitos:
                    </label>
                    <div className="flex justify-center gap-2">
                      {code.map((digit, index) => {
                        return (
                          <input
                            key={index}
                            ref={codeRefs[index]}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) =>
                              handleCodeChange(e.target.value, index)
                            }
                            className="border border-gray-300 py-2 rounded-md focus:border-indigo-500 outline-none focus:ring-indigo-500 w-8 text-center"
                          />
                        );
                      })}
                    </div>
                  </div>
                  <button
                  type="submit"
                  className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center mt-4">
                    Enviar
                  </button>
                  <br />
                  <button
                    onClick={handleBack}
                    className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center mb-4"
                  >
                    Volver
                  </button>
                </form> */
                <RecuperacionCodigo />
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
