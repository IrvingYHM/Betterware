import { useState, useEffect } from "react";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";
import Loader from "../../components/Loader";
import PdfThumbnail from "../../components/PdfThumbnail";
import { API_ENDPOINTS } from "../../service/apirest";

function Catalogos() {
  const [catalogos, setCatalogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.catalogos.getAll);
        if (!response.ok) {
          throw new Error('Error al cargar los catálogos');
        }
        const data = await response.json();
        setCatalogos(data);
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarCatalogos();
  }, []);

  const handleDownload = (catalogoUrl, catalogoNombre) => {
    const link = document.createElement('a');
    link.href = catalogoUrl;
    link.download = `${catalogoNombre}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Barra />
      <div className="min-h-screen mt-24 lg:mt-40">
        {/* Content Section */}
        <div className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">
                    Error al cargar catálogos
                  </h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            ) : catalogos.length === 0 ? (
              <div className="text-center py-32">
                <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-md mx-auto">
                  <svg
                    className="w-16 h-16 mx-auto mb-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-3">
                    No hay catálogos disponibles
                  </h3>
                  <p className="text-gray-600">
                    Los catálogos estarán disponibles próximamente
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-8">
                {catalogos.map((catalogo) => (
                  <div
                    key={catalogo.IdCatalogo}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden max-w-sm w-full transform hover:-translate-y-2"
                  >
                    {/* Title Section - At Top */}
                    <div className="pt-4 text-center text-orange-500">
                      <h3 className="text-2xl font-bold line-clamp-2 mb-3">
                        {catalogo.vchNombreCatalogo}
                      </h3>
                    </div>

                    {/* Download Button Section - At Bottom */}
                    <div className="mb-4 flex justify-center">
                      <button
                        onClick={() =>
                          handleDownload(
                            catalogo.vchCatalogo,
                            catalogo.vchNombreCatalogo
                          )
                        }
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-teal-500/30 focus:outline-none shadow-lg hover:shadow-xl"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Descargar
                        </div>
                      </button>
                    </div>

                    {/* Preview Section - In Middle with Better Visibility */}
                    <div className="relative">
                      <div className="shadow-md overflow-hidden border-[1px] border-black rounded-b-2xl">
                        {catalogo.imagenPortada ? (
                          <img
                            src={catalogo.imagenPortada}
                            alt={`Portada de ${catalogo.vchNombreCatalogo}`}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-2">
                            <PdfThumbnail url={catalogo.vchCatalogo} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Fot />
    </>
  );
}

export default Catalogos;