import React, { useState } from 'react';
import axios from 'axios';
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    vchNombreProducto: '',
    vchDescripcion: '',
    Existencias: '',
    IdCategoria: '',
    IdMarca: '',
    Precio: '',
    EnOferta: false,
    PrecioOferta: '',
    image: null
  });
  
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const categories = [
    { id: "1", name: "Cocina" },
    { id: "2", name: "Hogar" },
    { id: "3", name: "Recamara" },
    { id: "4", name: "Limpieza" },
    { id: "5", name: "Baño" },
    { id: "6", name: "Contigo" },
    { id: "7", name: "Bienestar" },
  ];

  const brands = [
    { id: "1", name: "Betterware" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('vchNombreProducto', formData.vchNombreProducto);
    form.append('vchDescripcion', formData.vchDescripcion);
    form.append('Existencias', formData.Existencias);
    form.append('IdCategoria', formData.IdCategoria);
    form.append('IdMarca', formData.IdMarca);
    form.append('Precio', formData.Precio);
    form.append('EnOferta', formData.EnOferta);
    form.append('PrecioOferta', formData.PrecioOferta);
    form.append('image', formData.image);

    try {
      const response = await axios.post(
        "https://backopt-production.up.railway.app/productos/Crear_productos/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Limpiar el formulario después de la creación exitosa
      setFormData({
        vchNombreProducto: "",
        vchDescripcion: "",
        Existencias: "",
        IdCategoria: "",
        IdMarca: "",
        Precio: "",
        EnOferta: false,
        PrecioOferta: "",
        image: null,
      });
      setPreviewImage(null);
      toast.success("Producto creado exitosamente");

      // Redirección después de éxito
      setTimeout(() => {
        navigate("/Productos");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el producto');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Barra />
      <div className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-28">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Crear Producto</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Nombre del Producto:</label>
            <input
              type="text"
              name="vchNombreProducto"
              value={formData.vchNombreProducto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Descripción:</label>
            <input
              type="text"
              name="vchDescripcion"
              value={formData.vchDescripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Existencias:</label>
            <input
              type="number"
              name="Existencias"
              value={formData.Existencias}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Categoría:</label>
            <select
              name="IdCategoria"
              value={formData.IdCategoria}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option disabled value="">
                Selecciona la categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Marca:</label>
            <select
              name="IdMarca"
              value={formData.IdMarca}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option disabled value="">
                Selecciona la marca
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Precio:</label>
            <input
              type="number"
              name="Precio"
              value={formData.Precio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 font-bold mb-2 mr-4">En Oferta:</label>
            <input
              type="checkbox"
              name="EnOferta"
              checked={formData.EnOferta}
              onChange={handleChange}
              className="w-6 h-6 form-checkbox text-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Precio de Oferta:</label>
            <input
              type="number"
              name="PrecioOferta"
              value={formData.PrecioOferta}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              disabled={!formData.EnOferta}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Imagen del Producto:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          {previewImage && (
            <div className="mb-4">
              <img src={previewImage} alt="Preview" className="w-full h-auto rounded-lg" />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Crear Producto
          </button>
        </form>
      </div>
      <Fot />
      <ToastContainer
        position="top-center"
        autoClose={1500}
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

export default CreateProductForm;
