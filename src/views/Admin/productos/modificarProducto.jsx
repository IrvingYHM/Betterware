import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Barra from "../../../components/Navegacion/barraAdmin";
import Fot from "../../../components/Footer";

function ModificarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    vchNombreProducto: "",
    vchDescripcion: "",
    Precio: "",
    Existencias: "",
    IdCategoria: "",
    IdMarca: "",
    vchNomImagen: ""
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`https://backopt-production.up.railway.app/productos/Productos/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener el producto");
          }
          return response.json();
        })
        .then((data) => {
          setProducto(data);
          setImagePreviewUrl(data.vchNomImagen);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value
    }));

    if (name === "vchNomImagen") {
      setImagePreviewUrl(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://backopt-production.up.railway.app/productos/Productos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el producto");
        }
        toast.success("Producto actualizado con éxito");
        navigate("/Productos");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al actualizar el producto");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center my-32">
        <Barra />
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="vchNombreProducto"
              value={producto.vchNombreProducto}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción:</label>
            <input
              type="text"
              name="vchDescripcion"
              value={producto.vchDescripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio:</label>
            <input
              type="number"
              name="Precio"
              value={producto.Precio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Existencias:</label>
            <input
              type="number"
              name="Existencias"
              value={producto.Existencias}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Categoría:</label>
            <input
              type="text"
              name="IdCategoria"
              value={producto.IdCategoria}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Marca:</label>
            <input
              type="text"
              name="IdMarca"
              value={producto.IdMarca}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen:</label>
            <input
              type="text"
              name="vchNomImagen"
              value={producto.vchNomImagen}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {imagePreviewUrl && (
            <div className="mb-4">
              <label className="block text-gray-700">Previsualización de la imagen:</label>
              <img src={imagePreviewUrl} alt="Previsualización" className="w-60 h-auto " />
            </div>
          )}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Actualizar Producto
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
              onClick={() => navigate("/Productos")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Fot />
    </div>
  );
}

export default ModificarProducto;
