import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Función para decodificar JWT
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const CreateProductForm = ({ integratedMode = false, onBack, showNavBar = true }) => {
  const [formData, setFormData] = useState({
    vchNombreProducto: "",
    vchDescripcion: "",
    Existencias: "",
    IdCategoria: "",
    Precio: "",
    EnOferta: false,
    PrecioOferta: "",
    image: null,
    IdEmpleado: "",
  });

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [idEmpleado, setIdEmpleado] = useState(""); //idEmpleado logueado
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar el tipo de usuario al cargar la página
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setIdEmpleado(decodedToken.empleadoId);
    }
  }, []);

  //Obtener categorías desde la API
  useEffect(() => {
    axios
      .get("https://backbetter-production.up.railway.app/categoria/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
        toast.error("Error al cargar categorías");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("vchNombreProducto", formData.vchNombreProducto);
    form.append("vchDescripcion", formData.vchDescripcion);
    form.append("Existencias", formData.Existencias);
    form.append("IdCategoria", formData.IdCategoria);
    form.append("Precio", formData.Precio);
    form.append("IdEmpleado", idEmpleado);
    form.append("image", formData.image);

    form.append("EnOferta", formData.EnOferta);

    if (formData.EnOferta) {
      form.append("PrecioOferta", formData.PrecioOferta);
    }

    try {
      await axios.post(
        "https://backbetter-production.up.railway.app/productos_Better/Crear_productos",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Producto agregado exitosamente");
      if (integratedMode && onBack) {
        setTimeout(() => onBack(), 2000);
      } else {
        setTimeout(() => navigate("/Productos"), 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el producto");
    }
  };

  // Contenido del formulario
  const formContent = (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6">
      {integratedMode && onBack && (
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a la lista de productos
          </button>
        </div>
      )}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Nuevo Producto
          </h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Nombre del Producto:</label>
            <input
              type="text"
              name="vchNombreProducto"
              value={formData.vchNombreProducto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Descripción:</label>
            <textarea
              type="text"
              name="vchDescripcion"
              value={formData.vchDescripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Existencias:</label>
            <input
              type="number"
              name="Existencias"
              value={formData.Existencias}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Categoría:</label>
            <select
              name="IdCategoria"
              value={formData.IdCategoria}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="">Selecciona la categoría</option>
              {categories.map((category) => (
                <option key={category.IdCategoria} value={category.IdCategoria}>
                  {category.NombreCategoria}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Precio:</label>
            <input
              type="number"
              name="Precio"
              value={formData.Precio}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block font-bold mb-2 mr-4">En Oferta:</label>
            <input
              type="checkbox"
              name="EnOferta"
              checked={formData.EnOferta}
              onChange={handleChange}
              className="w-6 h-6 form-checkbox text-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Precio de Oferta:</label>
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
            <label className="block font-bold mb-2">Imagen del Producto:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {previewImage && (
            <div className="mb-4 flex justify-self-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-60 h-auto rounded-lg"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold flex justify-self-center mt-6 p-2 px-4 rounded-lg hover:bg-blue-700 md:text-2xl"
          >
            Agregar Producto
          </button>
        </form>
    </div>
  );

  if (integratedMode) {
    return (
      <>
        {formContent}
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
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showNavBar && <Barra />}
      <div className="flex-grow py-28">
        {formContent}
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

export default CreateProductForm;
