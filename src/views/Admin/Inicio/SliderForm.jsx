import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Upload, Link, Save, X, Image, Trash2, Edit2, Eye, Plus } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SliderForm = ({ isOpen, onClose, initialMode = 'list' }) => {
  const [formData, setFormData] = useState({
    url: '',
    image: null,
    tipo: 'slider'
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sliderImages, setSliderImages] = useState([]);
  const [viewMode, setViewMode] = useState(initialMode); // 'list', 'add', 'edit'
  const [editingImage, setEditingImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch slider images on component mount and reset view mode
  useEffect(() => {
    if (isOpen) {
      fetchSliderImages();
      setViewMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const fetchSliderImages = async () => {
    try {
      const response = await axios.get('https://backbetter-production.up.railway.app/imagenes/filtrar/slider');
      setSliderImages(response.data || []);
    } catch (error) {
      console.error('Error fetching slider images:', error);
      toast.error('Error al cargar las imágenes del slider');
    }
  };

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
      // For editing, image is optional if we're keeping the existing one
      if (!editingImage && !formData.image) {
        toast.error("Debes subir una imagen para el slider");
        setLoading(false);
        return;
      }

      // Prepare form data for API
      const form = new FormData();
      form.append("UrlDestino", formData.url || "");
      form.append("tipo", formData.tipo);
      
      if (formData.image) {
        form.append("imagen", formData.image);
      }
      

      // Log the form data for debugging
      console.log("Sending form data:", {
        url: formData.url,
        tipo: formData.tipo,
        hasImage: !!formData.image,
        isEditing: !!editingImage
      });

      const endpoint = editingImage 
        ? `https://backbetter-production.up.railway.app/imagenes/actualizar/${editingImage.IdImagenes}`
        : "https://backbetter-production.up.railway.app/imagenes/agregar-imagen";

      // Send to API
      const method = editingImage ? 'put' : 'post';
      await axios[method](endpoint, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success(editingImage ? "Imagen actualizada exitosamente" : "Imagen agregada exitosamente al slider");
      
      // Refresh the slider images list
      await fetchSliderImages();
      
      // Reset form and return to list view after success
      setTimeout(() => {
        resetForm();
        setViewMode('list');
      }, 1500);
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
    setEditingImage(null);
  };

  const handleEditImage = (image) => {
    setEditingImage(image);
    setFormData({
      url: image.UrlDestino || '',
      image: null,
      tipo: 'slider'
    });
    setImagePreview(image.Imagen);
    setViewMode('edit');
  };

  const handleDeleteImage = async (imageId) => {
    try {
      setLoading(true);
      await axios.delete(`https://backbetter-production.up.railway.app/imagenes/eliminar-imagen/${imageId}`);
      toast.success('Imagen eliminada exitosamente');
      await fetchSliderImages();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error al eliminar la imagen');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    resetForm();
    setViewMode('add');
  };

  const handleBackToList = () => {
    resetForm();
    setViewMode('list');
  };

  const handleClose = () => {
    resetForm();
    setViewMode(initialMode);
    setDeleteConfirm(null);
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

  const renderHeader = () => {
    const titles = {
      list: 'Gestionar Imágenes del Slider',
      add: 'Agregar Nueva Imagen',
      edit: 'Editar Imagen del Slider'
    };
    
    return (
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between rounded-t-2xl z-10">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Image className="w-6 h-6 mr-3 text-teal-500" />
          {titles[viewMode]}
        </h2>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    );
  };

  const renderSliderList = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Gestiona todas las imágenes del slider principal ({sliderImages.length} imágenes)
        </p>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Nueva
        </button>
      </div>

      {sliderImages.length === 0 ? (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay imágenes en el slider</h3>
          <p className="text-gray-500 mb-6">Agrega la primera imagen para comenzar</p>
          <button
            onClick={handleAddNew}
            className="flex items-center mx-auto px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-500 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Primera Imagen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sliderImages.map((image, index) => (
            <div key={image.IdImagenes || index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="relative w-32 h-20 flex-shrink-0">
                  <img
                    src={image.Imagen}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      Imagen #{index + 1}
                    </h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(image.Imagen, '_blank')}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver imagen completa"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditImage(image)}
                        className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Editar imagen"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(image)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar imagen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    {image.UrlDestino ? (
                      <div className="flex items-center text-sm text-blue-600">
                        <Link className="w-3 h-3 mr-1" />
                        <span className="truncate">{image.UrlDestino}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Sin URL de destino</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
        {renderHeader()}
        
        {viewMode === 'list' && renderSliderList()}
        
        {(viewMode === 'add' || viewMode === 'edit') && (
          <div className="p-6">
            <div className="flex items-center mb-6">
              <button
                onClick={handleBackToList}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <p className="text-gray-600">
                  {viewMode === 'edit' 
                    ? 'Modifica los detalles de la imagen del slider'
                    : 'Añade una nueva imagen para el slider principal del sitio web'
                  }
                </p>
                {editingImage && (
                  <p className="text-sm text-gray-500 mt-1">
                    Deja el campo de imagen vacío para mantener la imagen actual
                  </p>
                )}
              </div>
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
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all duration-300"
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
                  {editingImage ? 'Cambiar imagen (opcional)' : 'Subir imagen'} {!editingImage && <span className="text-red-500">*</span>}
                </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-teal-400 transition-colors duration-300">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-teal-500 hover:text-teal-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-600">
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

              {/* Current Image (when editing) */}
              {editingImage && !formData.image && (
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagen actual
                  </label>
                  <div className="relative group">
                    <img
                      src={editingImage.Imagen}
                      alt="Imagen actual"
                      className="w-full h-48 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl">
                      <span className="text-white text-sm font-medium">Imagen actual del slider</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Image Preview */}
              {imagePreview && formData.image && (
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {editingImage ? 'Nueva imagen' : 'Vista previa'}
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
                  disabled={loading || (!editingImage && !formData.image)}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {editingImage ? 'Actualizando...' : 'Guardando...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {editingImage ? 'Actualizar Imagen' : 'Guardar Imagen'}
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleBackToList}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Eliminar Imagen</h3>
                <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <div className="mb-6">
              <img
                src={deleteConfirm.Imagen}
                alt="Imagen a eliminar"
                className="w-full h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
            
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar esta imagen del slider?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteImage(deleteConfirm.IdImagenes)}
                disabled={loading}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </>
                )}
              </button>
              
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
    </div>
  );
};

SliderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialMode: PropTypes.oneOf(['list', 'add', 'edit']),
};

export default SliderForm;