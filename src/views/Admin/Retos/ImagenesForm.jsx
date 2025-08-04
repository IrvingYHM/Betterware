import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, Image as ImageIcon, ChevronLeft , Check, X, RefreshCw, AlertTriangle } from "lucide-react";
import BarraAdmin from "../../../components/Navegacion/barraAdmin";

function ImagenesForm({ 
  integratedMode = false, 
  tipo: propTipo = null, 
  onBack = null, 
  showNavBar = true 
}) {
  const { tipo: tipoURL } = useParams();
  const navigate = useNavigate();
  
  // Usar el tipo de prop si está en modo integrado, sino usar el de URL
  const tipo = integratedMode && propTipo ? propTipo : (tipoURL || "reto");
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño de archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("El archivo es muy grande. Máximo 5MB.");
        return;
      }
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error("Solo se permiten archivos de imagen.");
        return;
      }
      
      setImagen(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) {
      toast.error("Selecciona una imagen.");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("imagen", imagen);
      formData.append("tipo", tipo);

      let response;

      if (imagenes.length > 0) {
        // Si ya existe una imagen, mostrar modal de confirmación personalizado
        setPendingFormData(formData);
        setShowReplaceModal(true);
        setLoading(false);
        return;
      } else {
        // Crear nueva imagen usando el endpoint de agregar (POST)
        response = await axios.post(
          "https://backbetter-production.up.railway.app/imagenes/agregar-imagen",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            },
          }
        );
      }
      
      toast.success("Imagen subida con éxito");
      
      // Limpiar formulario
      setImagen(null);
      setImagePreview(null);
      setUploadProgress(0);
      
      // Recargar imágenes
      await fetchImagenes();
      
      // Si está en modo integrado y hay callback, ejecutarlo
      if (integratedMode && onBack) {
        onBack();
      }
      
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error.message);
      
      // Error handling más específico basado en el backend real
      if (error.response?.status === 400) {
        toast.error(`Error de validación: ${error.response.data?.message || 'Datos inválidos'}`);
      } else if (error.response?.status === 404) {
        toast.error("Imagen no encontrada. Intenta recargar la página.");
      } else if (error.response?.status === 413) {
        toast.error("El archivo es muy grande para el servidor.");
      } else if (error.response?.status === 415) {
        toast.error("Tipo de archivo no soportado.");
      } else if (error.response?.status === 500) {
        toast.error("Error del servidor. Intenta nuevamente más tarde.");
      } else {
        toast.error(`Error al ${imagenes.length > 0 ? 'reemplazar' : 'subir'} la imagen: ${error.response?.data?.message || 'Error desconocido'}`);
      }
      
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchImagenes = async () => {
    try {
      const res = await axios.get(
        `https://backbetter-production.up.railway.app/imagenes/filtrar/${tipo}`
      );
      setImagenes(res.data);
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error("Error al cargar imágenes");
    }
  };

  const clearSelection = () => {
    setImagen(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleConfirmReplace = async () => {
    if (!pendingFormData) return;

    setShowReplaceModal(false);
    setLoading(true);
    setUploadProgress(0);

    try {
      // Usar el endpoint de actualización (PUT) para reemplazar la imagen existente
      const response = await axios.put(
        `https://backbetter-production.up.railway.app/imagenes/actualizar/${imagenes[0].IdImagenes}`,
        pendingFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      
      toast.success("Imagen reemplazada con éxito");
      
      // Limpiar formulario
      setImagen(null);
      setImagePreview(null);
      setUploadProgress(0);
      setPendingFormData(null);
      
      // Recargar imágenes
      await fetchImagenes();
      
      // Si está en modo integrado y hay callback, ejecutarlo
      if (integratedMode && onBack) {
        onBack();
      }
      
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error.message);
      
      // Error handling más específico basado en el backend real
      if (error.response?.status === 400) {
        toast.error(`Error de validación: ${error.response.data?.message || 'Datos inválidos'}`);
      } else if (error.response?.status === 404) {
        toast.error("Imagen no encontrada. Intenta recargar la página.");
      } else if (error.response?.status === 413) {
        toast.error("El archivo es muy grande para el servidor.");
      } else if (error.response?.status === 415) {
        toast.error("Tipo de archivo no soportado.");
      } else if (error.response?.status === 500) {
        toast.error("Error del servidor. Intenta nuevamente más tarde.");
      } else {
        toast.error(`Error al reemplazar la imagen: ${error.response?.data?.message || 'Error desconocido'}`);
      }
      
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReplace = () => {
    setShowReplaceModal(false);
    setPendingFormData(null);
    setLoading(false);
  };

  useEffect(() => {
    fetchImagenes();
  }, [tipo]);

  const formatearTitulo = (tipo) => {
    return tipo.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const handleBackClick = () => {
    if (integratedMode && onBack) {
      onBack();
    } else {
      navigate('/admin-retos');
    }
  };

  return (
    <div
      className={`${
        integratedMode ? "" : "min-h-screen"
      } bg-gradient-to-br from-gray-50 via-white to-blue-50 mt-6`}
    >
      {showNavBar && <BarraAdmin />}

      <div
        className={`${
          showNavBar ? "pt-20" : "pt-0"
        } pb-10 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBackClick}
              className="flex items-center text-xl font-bold text-teal-600 hover:text-teal-700 mb-6 transition-colors group"
            >
              <ChevronLeft  className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
              Volver a Retos
            </button>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {imagenes.length > 0 ? "Reemplazar" : "Subir"} Imagen
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">
                    {formatearTitulo(tipo)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Upload Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200 h-auto w-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <Upload className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {imagenes.length > 0 ? "Nueva Imagen" : "Seleccionar Imagen"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-xl shadow-lg"
                      />
                      <div className="flex justify-center space-x-3">
                        <button
                          type="button"
                          onClick={clearSelection}
                          className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cambiar Imagen
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                      <p className="text-lg text-gray-700 mb-3 font-medium">
                        Arrastra una imagen aquí o haz clic para seleccionar
                      </p>
                      <p className="text-sm text-gray-500 mb-6">
                        Formatos soportados: PNG, JPG, JPEG - Máximo 5MB
                      </p>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                          <Upload className="w-5 h-5 mr-2" />
                          Seleccionar Archivo
                        </span>
                      </label>
                    </div>
                  )}

                  <input
                    id="image-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Progress Bar */}
                {loading && (
                  <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between text-sm text-gray-700 font-medium">
                      <span>Subiendo imagen...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!imagen || loading}
                  className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-lg rounded-xl hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  {loading ? (
                    <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                  ) : (
                    <Check className="w-6 h-6 mr-3" />
                  )}
                  {loading
                    ? "Subiendo..."
                    : imagenes.length > 0
                    ? "Reemplazar Imagen"
                    : "Subir Imagen"}
                </button>
              </form>
            </div>

            {/* Current Image */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Imagen Actual
                </h2>
              </div>

              <div className="space-y-6">
                {imagenes.length > 0 ? (
                  <div className="space-y-4">
                    <div className="relative group overflow-hidden rounded-xl">
                      <img
                        src={imagenes[0].Imagen}
                        alt={`Imagen de ${formatearTitulo(tipo)}`}
                        className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300"></div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">
                          Imagen actual de {formatearTitulo(tipo)}
                        </span>
                        <div className="flex items-center text-green-600 font-semibold">
                          <Check className="w-5 h-5 mr-2" />
                          Activa
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-semibold text-lg mb-2">
                      No hay imagen actual
                    </p>
                    <p className="text-gray-400">
                      Sube la primera imagen para {formatearTitulo(tipo)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!integratedMode && (
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      )}

      {/* Modal de confirmación personalizado */}
      {showReplaceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Icono de advertencia */}
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              
              {/* Mensaje principal */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">¿Reemplazar imagen?</h3>
                <p className="text-sm text-gray-600">
                  Ya existe una imagen para
                </p>
                <p className="text-sm font-semibold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
                  "{formatearTitulo(tipo)}"
                </p>
                <p className="text-xs text-amber-600 font-medium">
                  La imagen actual será reemplazada permanentemente
                </p>
              </div>
              
              {/* Botones */}
              <div className="flex gap-3 justify-center w-full pt-2">
                <button
                  onClick={handleConfirmReplace}
                  disabled={loading}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Reemplazando...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Sí, Reemplazar
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelReplace}
                  disabled={loading}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <X className="w-4 h-4 mr-2 inline" />
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagenesForm;
