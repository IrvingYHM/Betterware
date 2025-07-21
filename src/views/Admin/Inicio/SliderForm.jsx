import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Upload, Link, Save, X, Image } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SliderForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    url: '',
    image: null,
    tipo: 'slider'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('La imagen debe ser menor a 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen válido');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form - image file is required
      if (!formData.image) {
        toast.error("Debes subir una imagen para el slider");
        setLoading(false);
        return;
      }

      // Prepare form data for API
      const form = new FormData();
      form.append("UrlDestino", formData.url || "");
      form.append("tipo", formData.tipo);
      form.append("imagen", formData.image);

      // Log the form data for debugging
      console.log("Sending form data:", {
        url: formData.url,
        tipo: formData.tipo,
        hasImage: !!formData.image,
      });

      // Send to API
      await axios.post(
        "https://backbetter-production.up.railway.app/imagenes/agregar-imagen",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Imagen agregada exitosamente al slider");

      // Reset form and close modal after success
      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      toast.error(error.response?.data?.message || 'Error al guardar la imagen del slider');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      url: '',
      image: null,
      tipo: 'slider'
    });
    setImagePreview(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Image className="w-6 h-6 mr-3 text-betterware" />
            Agregar Imagen al Slider
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Añade una nueva imagen para el slider principal del sitio web
            </p>
          </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL de destino (opcional)
          </label>
          <div className="relative">
            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://ejemplo.com/pagina-destino"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-betterware focus:border-transparent transition-all duration-300"
              disabled={loading}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            URL a la que dirigirá cuando se haga clic en la imagen del slider
          </p>
        </div>


        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subir imagen <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-betterware transition-colors duration-300">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-betterware hover:text-betterware_claro focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-betterware">
                  <span>Subir un archivo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                    disabled={loading}
                  />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, WEBP hasta 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vista previa
            </label>
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Vista previa"
                className="w-full h-48 object-cover rounded-xl border border-gray-200"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}


        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !formData.image}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-betterware text-white rounded-xl font-semibold hover:bg-betterware_claro transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Guardar Imagen
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </form>
        </div>
      </div>

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

SliderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SliderForm;