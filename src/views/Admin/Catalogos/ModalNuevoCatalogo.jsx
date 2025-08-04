import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../service/apirest";

const ModalNuevoCatalogo = ({ isOpen, onClose, onCatalogoCreado }) => {
  const [nombreCatalogo, setNombreCatalogo] = useState("");
  const [urlCatalogo, setUrlCatalogo] = useState("");
  const [imagenPortada, setImagenPortada] = useState(null);
  const [previewPortada, setPreviewPortada] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenPortada(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPortada(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setNombreCatalogo("");
    setUrlCatalogo("");
    setImagenPortada(null);
    setPreviewPortada("");
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!nombreCatalogo || !urlCatalogo) {
      toast.error("Por favor, completa todos los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('vchNombreCatalogo', nombreCatalogo);
      formData.append('vchCatalogo', urlCatalogo);
      if (imagenPortada) {
        formData.append('imagenPortada', imagenPortada);
      }

      await axios.post(
        API_ENDPOINTS.catalogos.create,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success("Catálogo agregado correctamente");
      onCatalogoCreado(); // Recargar la lista de catálogos
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el catálogo");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nuevo Catálogo</h2>
            <p className="text-gray-600 mt-1">Agrega un nuevo catálogo al sistema</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido del modal */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre del catálogo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Catálogo *
            </label>
            <input
              type="text"
              value={nombreCatalogo}
              onChange={(e) => setNombreCatalogo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="Ej: Catálogo Agosto"
              required
            />
          </div>

          {/* URL del catálogo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL del Catálogo (PDF) *
            </label>
            <input
              type="url"
              value={urlCatalogo}
              onChange={(e) => setUrlCatalogo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="https://drive.google.com/file/d/.../view"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Pega aquí la URL de descarga directa del PDF desde Google Drive
            </p>
          </div>

          {/* Imagen de portada */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagen de Portada *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-teal-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imagen-portada"
              />
              <label htmlFor="imagen-portada" className="cursor-pointer">
                {previewPortada ? (
                  <div className="space-y-4">
                    <img
                      src={previewPortada}
                      alt="Vista previa de portada"
                      className="w-32 h-32 object-cover rounded-xl mx-auto border shadow-sm"
                    />
                    <p className="text-sm text-gray-600">Haz clic para cambiar la imagen</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">Sube una imagen de portada</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl transition-all duration-200 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-teal-500/90 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Agregando...
                </div>
              ) : (
                "Agregar Catálogo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNuevoCatalogo;