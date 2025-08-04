import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Upload, Image as ImageIcon, ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import BarraAdmin from "../../../components/Navegacion/barraAdmin";

function ImagenesFormImproved() {
  const { tipo: tipoURL } = useParams();
  const navigate = useNavigate();
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const tipo = tipoURL || "reto";

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
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("tipo", tipo);

    try {
      // Si ya existe una imagen, mostrar confirmación de reemplazo
      if (imagenes.length > 0) {
        const confirmReplace = window.confirm(
          `Ya existe una imagen para ${formatearTitulo(tipo)}. ¿Deseas reemplazarla?`
        );
        if (!confirmReplace) {
          setLoading(false);
          return;
        }
      }

      await axios.post(
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
      
      toast.success(
        imagenes.length > 0 
          ? "Imagen reemplazada con éxito" 
          : "Imagen subida con éxito"
      );
      
      // Limpiar formulario
      setImagen(null);
      setImagePreview(null);
      setUploadProgress(0);
      
      // Recargar imágenes
      await fetchImagenes();
      
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al subir la imagen");
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

  useEffect(() => {
    fetchImagenes();
  }, [tipo]);

  const formatearTitulo = (tipo) => {
    return tipo.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <BarraAdmin />
      
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/admin-retos')}
              className="flex items-center text-teal-600 hover:text-teal-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a Retos 1
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {imagenes.length > 0 ? 'Reemplazar' : 'Subir'} Imagen
                  </h1>
                  <p className="text-gray-600">{formatearTitulo(tipo)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {imagenes.length > 0 ? 'Nueva Imagen' : 'Seleccionar Imagen'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <div className="flex justify-center space-x-3">
                        <button
                          type="button"
                          onClick={clearSelection}
                          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cambiar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Arrastra una imagen aquí o haz clic para seleccionar
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        PNG, JPG hasta 5MB
                      </p>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                          <Upload className="w-4 h-4 mr-2" />
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subiendo...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!imagen || loading}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-5 h-5 mr-2" />
                  )}
                  {loading 
                    ? 'Subiendo...' 
                    : imagenes.length > 0 
                      ? 'Reemplazar Imagen' 
                      : 'Subir Imagen'
                  }
                </button>
              </form>
            </div>

            {/* Current Image */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Imagen Actual
              </h2>
              
              <div className="space-y-4">
                {imagenes.length > 0 ? (
                  <div className="space-y-4">
                    <div className="relative group">
                      <img
                        src={imagenes[0].Imagen}
                        alt={`Imagen de ${formatearTitulo(tipo)}`}
                        className="w-full rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300"></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Imagen actual de {formatearTitulo(tipo)}</span>
                      <div className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        Activa
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No hay imagen actual</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Sube la primera imagen para {formatearTitulo(tipo)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
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
    </div>
  );
}

export default ImagenesFormImproved;