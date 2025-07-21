import React, { useState } from "react";
import axios from "axios";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateCatalogForm = () => {
  const [nombreCatalogo, setNombreCatalogo] = useState("");
  const [urlCatalogo, setUrlCatalogo] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!nombreCatalogo || !urlCatalogo) {
      toast.error("Por favor, completa todos los campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        "https://backbetter-production.up.railway.app/catalogos/agregar-catalogo",
        {
          vchNombreCatalogo: nombreCatalogo,
          vchCatalogo: urlCatalogo,
        }
      );

      toast.success("Catálogo agregado correctamente");
      setTimeout(() => navigate("/CatalogosAd"), 3000);
    } catch (error) {
      console.error(error);
      toast.error("Error al subir el catálogo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Barra />
      <div className="flex-grow container mx-auto px-4 py-28">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Nuevo Catálogo
          </h2>

          <div className="mb-4">
            <label className="block font-bold mb-2">Nombre del Catálogo:</label>
            <input
              type="text"
              value={nombreCatalogo}
              onChange={(e) => setNombreCatalogo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">
              URL del Catálogo (PDF):
            </label>
            <input
              type="url"
              value={urlCatalogo}
              onChange={(e) => setUrlCatalogo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              placeholder="https://.../catalogo.pdf"
            />
          </div>

          {urlCatalogo && (
            <div className="mb-4">
              <iframe
                src={urlCatalogo}
                type="application/pdf"
                width="100%"
                height="400px"
                className="rounded border"
                title="Vista previa del PDF"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 text-white font-semibold mt-6 p-2 px-4 rounded-lg w-full ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-800"
            }`}
          >
            {isSubmitting ? "Subiendo..." : "Agregar Catálogo"}
          </button>
        </form>
      </div>

      <Fot />
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
};

export default CreateCatalogForm;
