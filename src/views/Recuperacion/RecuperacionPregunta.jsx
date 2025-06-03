import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CambioContrasena from "./cambioCon";

function RecuperacionPregunta() {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mostrarFormularioCambio, setMostrarFormularioCambio] = useState(false);
  const [mostrarFormularioPregunta, setMostrarFormularioPregunta] = useState(true);

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
          toast.success("La respuesta es correcta");
          setMostrarFormularioCambio(true);
          setMostrarFormularioPregunta(false);
        } else {
          toast.error("La respuesta secreta es incorrecta");
          console.log("respuesta incorrecta");
        }
      } else {
        toast.error("La respuesta de la pregunta secreta es incorrecta");
        console.log("respuesta incorrecta");
      }
    } catch (error) {
      toast.error("Error de red al verificar la respuesta secreta:", error);
    }
  };

  return (
    <div>
      {mostrarFormularioPregunta && (
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
              <option value="color">¿Cuál es tu color favorito?</option>
              <option value="¿El nombre de tu mejor amigo?">
                ¿El nombre de tu mejor amigo?
              </option>
              <option value="mascota">¿Cuál es el nombre de tu mascota?</option>
              <option value="comida">¿Cuál es tu comida favorita?</option>
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
      )}
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
        limit={2}
      />
    </div>
  );
}

export default RecuperacionPregunta;
