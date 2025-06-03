import { useEffect } from "react";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";

const SuccessPage = () => {
  useEffect(() => {
    const eliminarCarrito = async () => {
      try {
        // Llama a la API para eliminar el carrito
        const response = await fetch(
          "https://backopt-production.up.railway.app/Carrito/eliminarCa",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el carrito");
        }

        console.log("Carrito eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el carrito:", error);
      }
    };

    // Verifica si la URL contiene el parámetro de éxito
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get("status"); // Usa el parámetro 'status' en lugar de 'success'

    //console.log('Payment status:', status); // Agrega un log para depuración

    if (status === "approved") {
      eliminarCarrito();
    }
  }, []);

  return (
    <div>
      <Barra />
      <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Compra realizada con éxito!
          </h1>
          <p className="text-gray-700 mb-4">
            ¡Gracias por confiar en nosotros para tus necesidades ópticas!
          </p>
          <p className="text-gray-600 mb-8">
            Si tienes alguna pregunta o necesitas asistencia adicional, no dudes
            en contactarnos.
          </p>
          <a
            href="/inicio"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg"
          >
            Regresar al inicio
          </a>
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default SuccessPage;
