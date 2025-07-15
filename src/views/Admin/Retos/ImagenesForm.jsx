import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ImagenesForm() {
  const { tipo: tipoURL } = useParams(); // ← obtiene tipo desde la URL
  const [imagen, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  const tipo = tipoURL || "reto"; // tipo fijo según URL

  const handleFileChange = (e) => setImagen(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) {
      toast.error("Selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("tipo", tipo);

    try {
      await axios.post(
        "https://backbetter-production.up.railway.app/imagenes/agregar-imagen",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Imagen subida con éxito");
      setImagen(null);
      fetchImagenes();
    } catch (error) {
      toast.error("Error al subir la imagen");
    }
  };

  const fetchImagenes = async () => {
    try {
      const res = await axios.get(
        `https://backbetter-production.up.railway.app/imagenes/filtrar/${tipo}`
      );
      setImagenes(res.data);
    } catch {
      toast.error("Error al cargar imágenes");
    }
  };

  useEffect(() => {
    fetchImagenes();
  }, [tipo]);

  const formatearTitulo = (tipo) => {
    return tipo.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()); // Capitaliza cada palabra
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-32">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Subir Imagen - {formatearTitulo(tipo)}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-medium">Seleccionar archivo:</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Subir Imagen
        </button>
      </form>

      <div className="mt-10">
        <h4 className="text-lg font-semibold mb-4">
          Imágenes actuales ({formatearTitulo(tipo)}):
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imagenes.length > 0 ? (
            imagenes.map((img) => (
              <img
                key={img.IdImagenes}
                src={img.Imagen}
                alt="Imagen subida"
                className="rounded shadow"
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No hay imágenes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImagenesForm;
