import { useState } from "react";
import { toast, } from "react-toastify";

const CodigoRecuperacion = ({ handleBack }) => {
  const [userCode, setUserCode] = useState(Array(6).fill(""));

  const handleCodeChange = (digit, index) => {
    const newUserCode = [...userCode];
    newUserCode[index] = digit;
    setUserCode(newUserCode);
  };

  const verificarCodigo = async (codigo) => {
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

  return (
    <div className="text-center">
      <label htmlFor="codigoRecuperacion">Código de Recuperación:</label>
      <div className="flex justify-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            id={`codigoRecuperacion_${index}`}
            name={`codigoRecuperacion_${index}`}
            maxLength="1"
            required
            className="border border-gray-300 w-8 h-8 text-center m-1 rounded-md focus:border-indigo-500 outline-none focus:ring-indigo-500"
            onChange={(e) => handleCodeChange(e.target.value, index)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handleBack}
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Volver
        </button>
        <button
          onClick={() => verificarCodigo(userCode.join(""))}
          className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CodigoRecuperacion;
