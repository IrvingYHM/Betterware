import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../components/Loader";
import PdfThumbnail from "../../../components/PdfThumbnail";
import ModalNuevoCatalogo from "./ModalNuevoCatalogo";
import { API_ENDPOINTS } from "../../../service/apirest";

function CatalogosAd() {
  const [catalogos, setCatalogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eliminando, setEliminando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [catalogoParaEliminar, setCatalogoParaEliminar] = useState(null);

  const cargarCatalogos = () => {
    setLoading(true);
    fetch(API_ENDPOINTS.catalogos.getAll)
      .then((res) => res.json())
      .then((data) => {
        setCatalogos(data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los catálogos:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarCatalogos();
  }, []);

  // Confirmar eliminación con toast
  const confirmarEliminacion = (catalogo) => {
    setCatalogoParaEliminar(catalogo);
    toast.info(
      <div className="flex flex-col items-center text-center gap-4 p-2">
        {/* Icono de advertencia */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        {/* Mensaje principal */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900">¿Estás seguro?</h3>
          <p className="text-sm text-gray-600">
            ¿Realmente deseas eliminar el catálogo
          </p>
          <p className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
            "{catalogo.vchNombreCatalogo}"
          </p>
          <p className="text-xs text-red-600">
            Esta acción no se puede deshacer
          </p>
        </div>
        
        {/* Botones centrados */}
        <div className="flex gap-3 justify-center w-full">
          <button
            onClick={() => {
              eliminarCatalogo(catalogo.IdCatalogo, catalogo.vchNombreCatalogo);
              toast.dismiss();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Sí, Eliminar
          </button>
          <button
            onClick={() => {
              setCatalogoParaEliminar(null);
              toast.dismiss();
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        className: "toast-confirmation"
      }
    );
  };

  const eliminarCatalogo = async (idCatalogo, nombreCatalogo) => {

    setEliminando(idCatalogo);
    try {
      const response = await fetch(
        `${API_ENDPOINTS.catalogos.delete}/${idCatalogo}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        toast.success('Catálogo eliminado correctamente');
        cargarCatalogos(); // Recargar la lista
      } else {
        throw new Error('Error al eliminar el catálogo');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al eliminar el catálogo');
    } finally {
      setEliminando(null);
    }
  };

  const handleCatalogoCreado = () => {
    cargarCatalogos();
  };

  /* if (loading) return <Loader mensaje="Cargando catálogos..." />; */

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mt-8">
            {/* Grid de catálogos */}
            <div className="flex flex-wrap justify-center gap-6">
              {catalogos.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-32">
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-400"
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
                    <h3 className="text-xl font-semibold text-orange-500 mb-2">
                      No hay catálogos
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Comienza agregando tu primer catálogo
                    </p>
                    <button
                      onClick={() => setMostrarModal(true)}
                      className="bg-teal-500 hover:bg-teal-500/90 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Agregar Catálogo
                    </button>
                  </div>
                </div>
              ) : (
                catalogos.map((catalogo) => (
                  <div
                    key={catalogo.IdCatalogo}
                    className="bg-white w-full max-w-sm min-w-[280px] flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group relative rounded-xl"
                  >
                    {/* Botón de eliminar */}
                    <button
                      onClick={() => confirmarEliminacion(catalogo)}
                      disabled={eliminando === catalogo.IdCatalogo}
                      className="absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      title="Eliminar catálogo"
                    >
                      {eliminando === catalogo.IdCatalogo ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>

                    {/* Contenido */}
                    <div className="p-4 justify-items-center">
                      <h3
                        className="text-2xl font-bold text-orange-500 mb-3"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {catalogo.vchNombreCatalogo}
                      </h3>

                      {/* Botón de acción */}
                      <div>
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = catalogo.vchCatalogo;
                            link.download = `${catalogo.vchNombreCatalogo}.pdf`;
                            link.target = '_blank';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 px-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-center"
                        >
                          Descargar
                        </button>
                      </div>
                    </div>

                    {/* Imagen o thumbnail */}
                    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden border-[1px] border-black rounded-b-2xl">
                      {catalogo.imagenPortada ? (
                        <img
                          src={catalogo.imagenPortada}
                          alt={`Portada de ${catalogo.vchNombreCatalogo}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <PdfThumbnail url={catalogo.vchCatalogo} />
                        </div>
                      )}
                      {/* Overlay con gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal para nuevo catálogo */}
      <ModalNuevoCatalogo
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onCatalogoCreado={handleCatalogoCreado}
      />

      {/* Botón flotante para nuevo catálogo */}
      <button
        onClick={() => setMostrarModal(true)}
        className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-500/90 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group"
        title="Nuevo Catálogo"
      >
        <svg
          className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

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
      
      <style jsx>{`
        .toast-confirmation .Toastify__toast {
          background: white;
          color: #374151;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          min-width: 400px;
          padding: 20px;
        }
        .toast-confirmation .Toastify__toast-body {
          padding: 0;
          margin: 0;
        }
        .toast-confirmation .Toastify__toast-icon {
          display: none;
        }
        @media (max-width: 480px) {
          .toast-confirmation .Toastify__toast {
            min-width: 320px;
            margin: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default CatalogosAd;
