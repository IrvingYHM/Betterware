import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import CodigoRecuperacion from "./RecuperacionCodigo";




// Función para decodificar JWT
/* function parseJwt(token) {
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
} */

const FormularioPregunta = ({ handleBack }) => {
  const [correoEncontrado, setCorreoEncontrado] = useState(false);
  const [preguntaSecreta, setPreguntaSecreta] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [mostrarCodigoRecuperacion, setMostrarCodigoRecuperacion] = useState(false);
  
/*   const [clienteId, setClienteId] = useState(null);


    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      setClienteId(decoded.clienteId);
    }
  }, []); */

  const onSubmit = async (data) => {
    try {
      setProcesando(true);
      const response = await fetch("http://localhost:3000/clientes/recuperar-contrasena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {

        toast.success("Este correo sí existe.", {
          onClose: () => {
            setTimeout(() => {
              setCorreoEncontrado(true);
              setPreguntaSecreta(responseData.preguntaSecreta); // Actualizar la pregunta secreta en el estado
            }, 10); // Redirigir después de 3 segundos
          },
        });
      } else {
        toast.error(responseData.message || "Error: correo no existente");
        setProcesando(false);
      }
    } catch (error) {
      toast.error("Error de red al recuperar la contraseña:", error.message);
      setProcesando(false);
    }
  };

  const handleSubmitCorreo = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const vchCorreo = formData.get("email");

    onSubmit({ vchCorreo });
  };

  const handleSubmitRespuesta = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const vchPreguntaSecreta = formData.get("question");
    const vchRespuestaSecreta = formData.get("answer");

    try {
      const response = await fetch("http://localhost:3000/clientes/verificar-respuesta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vchPreguntaSecreta, vchRespuestaSecreta }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);


        setTimeout(() => {
          setRespuestaCorrecta(true);
          enviarCodigoRecuperacion(true);
        setMostrarCodigoRecuperacion(true);

        }, 3000);

        
      } else {
        toast.error( "Error al verificar la respuesta");
      }
    } catch (error) {
      toast.error("Error de red al verificar la respuesta:", error);
    }
  };

  

  const enviarCodigoRecuperacion = async () => {
    try {
      const response = await fetch("http://localhost:3000/clientes/enviar_codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al enviar el código de recuperación");
      }
    } catch (error) {
      toast.error("Error de red al enviar el código de recuperación:", error);
    }
  };

/*   const verificarCodigo = async (codigo) => {
    try {
      const response = await fetch("http://localhost:3000/clientes/Verificacion_codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.message === "Código de recuperación correcto. Puede cambiar la contraseña.") {
          toast.success("Código correcto, proceder al cambio de contraseña");
        } else {
          toast.error("El código de recuperación es incorrecto");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al verificar el código de recuperación");
      }
    } catch (error) {
      toast.error("Error de red al verificar el código de recuperación:", error);
    }
  };
  

  const handleCodeChange = (digit, index) => {
    const newUserCode = [...userCode];
    newUserCode[index] = digit;
    setUserCode(newUserCode);
  }; */



  return (
    <>

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
        progressBar
      />
      <form className="p-4" onSubmit={correoEncontrado ? handleSubmitRespuesta : handleSubmitCorreo}>
        {!correoEncontrado && (
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 p-2 border border-black rounded-md w-full sm:w-auto "
              placeholder="Correo electronico"
            />

            {/* Botón */}
            <div className="flex flex-col sm:flex-row justify-center mt-4 gap-4">
              <button
                onClick={handleBack}
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Volver
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                {procesando ? "Procesando..." : "Enviar"}
              </button>
            </div>
          </div>
        )}
        {correoEncontrado && !respuestaCorrecta && (
          <>
            <div>
              <label htmlFor="question">Pregunta Secreta:</label>
              <input
                type="text"
                id="question"
                name="question"
                required
                className="mt-1 p-2 border border-black rounded-md w-full text-center"
                value={preguntaSecreta}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="answer">Respuesta:</label>
              <input
                type="text"
                id="answer"
                name="answer"
                required
                className="mt-1 p-2 border border-black rounded-md w-full text-center"
              />
            </div>
            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-center mt-4 gap-4">
              <button
                onClick={handleBack}
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Volver
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2"
              >
                Enviar
              </button>
            </div>
          </>
        )}
      </form>
      {mostrarCodigoRecuperacion && (<CodigoRecuperacion handleBack={handleBack} />)}

    </>
  );
};

export default FormularioPregunta;
