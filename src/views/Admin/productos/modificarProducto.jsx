import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Barra from "../../../components/Navegacion/barraAdmin";
import Fot from "../../../components/Footer";
import Loader from "../../../components/Loader";
import { ArrowLeft } from "lucide-react";

function ModificarProducto({ integratedMode = false, onBack, showNavBar = true, productId }) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const id = productId || paramId;

  const [producto, setProducto] = useState({
    vchNombreProducto: "",
    vchDescripcion: "",
    Precio: "",
    PrecioOferta: "",
    EnOferta: false,
    Existencias: "",
    IdCategoria: "",
    vchNomImagen: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar producto
    if (id) {
      fetch(
        `https://backbetter-production.up.railway.app/productos_Better/Productos/${id}`
      )
        .then((response) => {
          if (!response.ok) {
            toast.error("Error al obtener el producto");
          }
          return response.json();
        })
        .then((data) => {
          data.EnOferta = !!data.EnOferta; // Asegurar booleano
          setProducto(data);
          setImagePreviewUrl(data.vchNomImagen);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false); //TERMINA LA CARGA
        });
    }

    // Cargar categorías
    fetch("https://backbetter-production.up.railway.app/categoria/")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch(() => setCategorias([]));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "vchNomImagen") {
      setImagePreviewUrl(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ajusta datos: convertir precios y existencias a números
    const bodyToSend = {
      ...producto,
      Precio: Number(producto.Precio),
      PrecioOferta: producto.PrecioOferta
        ? Number(producto.PrecioOferta)
        : null,
      Existencias: Number(producto.Existencias),
      EnOferta: producto.EnOferta,
      IdCategoria: Number(producto.IdCategoria),
    };

    fetch(
      `https://backbetter-production.up.railway.app/productos_Better/Actualizar_producto/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyToSend),
      }
    )
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al actualizar el producto");
        }
        toast.success("Producto actualizado con éxito");
        if (integratedMode && onBack) {
          setTimeout(() => onBack(), 2000);
        } else {
          setTimeout(() => navigate("/Productos"), 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al actualizar el producto");
      });
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
      {loading ? (
        <Loader mensaje="Cargando información del producto..." />
      ) : (
        <>
          <form
              onSubmit={handleSubmit}
              className="bg-white w-full max-w-xl rounded-lg p-6 shadow-md mx-auto"
            >
              <h2 className="text-2xl text-center font-bold mb-6">
                Editar Producto
              </h2>
              {/* Nombre */}
              <div className="mb-4">
                <label className="block font-semibold">Nombre:</label>
                <input
                  type="text"
                  name="vchNombreProducto"
                  value={producto.vchNombreProducto}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <label className="block font-semibold">Descripción:</label>
                <textarea
                  name="vchDescripcion"
                  value={producto.vchDescripcion}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  rows={3}
                  required
                />
              </div>

              {/* Precio */}
              <div className="mb-4">
                <label className="block font-semibold">Precio:</label>
                <input
                  type="number"
                  name="Precio"
                  value={producto.Precio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  step="1"
                  required
                />
              </div>

              {/* En Oferta */}
              <div className="mb-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="EnOferta"
                  checked={producto.EnOferta}
                  onChange={handleChange}
                  id="enOferta"
                />
                <label htmlFor="enOferta" className="">
                  ¿Está en oferta?
                </label>
              </div>

              {/* Precio Oferta */}
              {producto.EnOferta && (
                <div className="mb-4">
                  <label className="block font-semibold">
                    Precio en Oferta:
                  </label>
                  <input
                    type="number"
                    name="PrecioOferta"
                    value={producto.PrecioOferta || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    min="0"
                    step="0.01"
                    required={producto.EnOferta}
                  />
                </div>
              )}

              {/* Existencias */}
              <div className="mb-4">
                <label className="block font-semibold">Existencias:</label>
                <input
                  type="number"
                  name="Existencias"
                  value={producto.Existencias}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  min="0"
                  required
                />
              </div>

              {/* Categoría */}
              <div className="mb-4">
                <label className="block font-semibold">Categoría:</label>
                <select
                  name="IdCategoria"
                  value={producto.IdCategoria}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.IdCategoria} value={cat.IdCategoria}>
                      {cat.NombreCategoria}
                    </option>
                  ))}
                </select>
              </div>

              {/* Imagen */}
              <div className="mb-4">
                <label className="block font-semibold">URL de la Imagen:</label>
                <input
                  type="text"
                  name="vchNomImagen"
                  value={producto.vchNomImagen}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              {/* Preview imagen */}
              {imagePreviewUrl && (
                <div className="mb-4">
                  <label className="block font-semibold">
                    Previsualización de la imagen:
                  </label>
                  <img
                    src={imagePreviewUrl}
                    alt="Previsualización"
                    className="w-60 h-auto rounded"
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => {
                    if (integratedMode && onBack) {
                      onBack();
                    } else {
                      navigate("/Productos");
                    }
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
        </>
      )}
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
      <div className="flex-grow mt-28 mb-10">
        {formContent}
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
      <Fot />
    </div>
  );
}

export default ModificarProducto;
