import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Barra from "../../../components/Navegacion/barraAdmin";
import Fot from "../../../components/Footer";
import Loader from "../../../components/Loader";
import PdfThumbnail from "../../../components/PdfThumbnail";

function CatalogosAd() {
  const [catalogos, setCatalogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backbetter-production.up.railway.app/catalogos/")
      .then((res) => res.json())
      .then((data) => {
        setCatalogos(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los catálogos:", error);
        setLoading(false);
      });
  }, []);

  /* if (loading) return <Loader mensaje="Cargando catálogos..." />; */

  return (
    <div className="mt-28">
      <Barra />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {catalogos.map((catalogo) => (
                <div
                  key={catalogo.IdCatalogo}
                  className="bg-sky-200 rounded-lg shadow-md p-4 w-80 text-center flex flex-col items-center"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {catalogo.vchNombreCatalogo}
                  </h3>
                  <PdfThumbnail url={catalogo.vchCatalogo} />
                  <a
                    href={catalogo.vchCatalogo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-naranja-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-naranja-700 transition"
                  >
                    Descargar
                  </a>
                </div>
              ))}
            </div>
            {/* Botón flotante visible siempre */}
            <Link
              to="/nuevo-catalogo"
              className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              + Nuevo catálogo
            </Link>
          </div>
        </>
      )}

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
      <Fot />
    </div>
  );
}

export default CatalogosAd;
