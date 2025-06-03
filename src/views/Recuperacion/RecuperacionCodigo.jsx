import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CambioContrasena from "./cambioCon";

const RecuperacionCodigo = ({ onBack}) => {
  const [code, setCode] = useState(Array(6).fill("")); // Variable de estado para guardar el código
  const codeRefs = Array(6).fill().map(() => useRef()); // Referencias a los cuadros de texto
  const [mostrarFormularioCambio, setMostrarFormularioCambio] = useState(false);

  const handleCodeChange = (digit, index) => {
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit !== "" && index < 5) {
      // Enfocar el siguiente cuadro de texto si se ingresó un dígito y no es el último
      codeRefs[index + 1].current.focus();
    }
  };

  const handleBack = () => {
    onBack();
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
          body: JSON.stringify({ codigo }), // Enviar solo el código, sin una clave adicional
        }
      );

      if (response.ok) {
        try {
          const data = await response.json();
          if (
            data.message ===
            "Código de recuperación correcto. Puede cambiar la contraseña."
          ) {
            // Aquí puedes manejar la lógica para cambiar la contraseña
            toast.success("Código correcto, proceder al cambio de contraseña");
            // Aquí deberías redirigir o mostrar el formulario de cambio de contraseña
            setMostrarFormularioCambio(true);
          } else {
            toast.error("El código de recuperación es incorrecto");
          }
        } catch (error) {
          toast.error("Error al parsear la respuesta del servidor");
        }
      } else {
        toast.error("Error al verificar el código de recuperación");
      }
    } catch (error) {
      toast.error("Error de red al verificar el código de recuperación:", error);
    }
  };

  return (
    <>
      <div className="text-center">
        <div className="container ml-auto mr-auto flex items-center justify-center">
          <div>
            {!mostrarFormularioCambio && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  verificarCodigo(code.join(""));
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-800 mb-2"
                  >
                    Introduce el código de 6 dígitos:
                  </label>
                  <div className="flex justify-center gap-2">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={codeRefs[index]}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleCodeChange(e.target.value, index)}
                        className="border border-gray-300 py-2 rounded-md focus:border-indigo-500 outline-none focus:ring-indigo-500 w-8 text-center"
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center mt-4"
                >
                  Enviar
                </button>
                <br />
                <button
                  onClick={handleBack}
                  className="bg-blue-700 border-2 border-black hover:bg-blue-600 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center mb-4"
                >
                  Volver
                </button>
              </form>
            )}
          </div>

        </div>
        {mostrarFormularioCambio && <CambioContrasena />}

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
    </>
  );
}

export default RecuperacionCodigo;
