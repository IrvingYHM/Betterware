import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Edit,
  Save,
  X,
  Upload,
  Plus,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Unete() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const [formData, setFormData] = useState({
    Titulo: "",
    Subtitulo: "",
    Beneficios: [],
    TextoBoton: "",
    ColorTitulo: "#ffffff",
    ColorSubtitulo: "#ffffff",
    Imagen: null,
    newImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  // 🔹 SOLO UN JSON.parse!
  const getCurrentBeneficios = () => {
    if (isEditing) {
      return Array.isArray(formData.Beneficios) ? formData.Beneficios : [];
    }
    if (currentData && currentData.Beneficios) {
      try {
        const parsed = JSON.parse(currentData.Beneficios || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  console.log("currentData", currentData);
  console.log("getCurrentBeneficios", getCurrentBeneficios());

  useEffect(() => {
    fetchUneteData();
  }, []);

  const fetchUneteData = async () => {
    try {
      const response = await axios.get(
        "https://backbetter-production.up.railway.app/unete-equipo/"
      );
      if (response.data && response.data.length > 0) {
        const data = response.data[0];

        // Parse beneficios SOLO UNA VEZ
        let parsedBeneficios = [];
        try {
          parsedBeneficios = JSON.parse(data.Beneficios || "[]");
          if (!Array.isArray(parsedBeneficios)) parsedBeneficios = [];
        } catch {
          parsedBeneficios = [];
        }

        setCurrentData(data);
        setFormData({
          Titulo: data.Titulo || "",
          Subtitulo: data.Subtitulo || "",
          Beneficios: parsedBeneficios,
          TextoBoton: data.TextoBoton || "",
          ColorTitulo: data.ColorTitulo || "#ffffff",
          ColorSubtitulo: data.ColorSubtitulo || "#ffffff",
          Imagen: data.Imagen,
          newImage: null,
        });
      }
    } catch (error) {
      console.error("Error fetching unete data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("La imagen debe ser menor a 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor selecciona un archivo de imagen válido");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        newImage: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setShowImageUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBeneficio = () => {
    setFormData((prev) => ({
      ...prev,
      Beneficios: [...prev.Beneficios, ""],
    }));
  };

  const removeBeneficio = (index) => {
    setFormData((prev) => ({
      ...prev,
      Beneficios: prev.Beneficios.filter((_, i) => i !== index),
    }));
  };

  const updateBeneficio = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      Beneficios: prev.Beneficios.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("Titulo", formData.Titulo);
      form.append("Subtitulo", formData.Subtitulo);
      // 🔹 SOLO UN stringify
      form.append("Beneficios", JSON.stringify(formData.Beneficios));
      form.append("TextoBoton", formData.TextoBoton);
      form.append("ColorTitulo", formData.ColorTitulo);
      form.append("ColorSubtitulo", formData.ColorSubtitulo);

      if (formData.newImage) {
        form.append("Imagen", formData.newImage);
      }

      let response;
      if (currentData) {
        response = await axios.put(
          `https://backbetter-production.up.railway.app/unete-equipo/actualizar-UneteEquipo/${currentData.IdUnete}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "https://backbetter-production.up.railway.app/unete-equipo/agregar-UneteEquipo",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setCurrentData(response.data);
      setIsEditing(false);
      setImagePreview(null);
      toast.success("Contenido actualizado exitosamente");
      await fetchUneteData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error al guardar los cambios");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setImagePreview(null);
    setShowImageUpload(false);
    if (currentData) {
      // Al cancelar, parsear sólo una vez
      let parsedBeneficios = [];
      try {
        parsedBeneficios = JSON.parse(currentData.Beneficios || "[]");
        if (!Array.isArray(parsedBeneficios)) parsedBeneficios = [];
      } catch {
        parsedBeneficios = [];
      }
      setFormData({
        Titulo: currentData.Titulo,
        Subtitulo: currentData.Subtitulo,
        Beneficios: parsedBeneficios,
        TextoBoton: currentData.TextoBoton,
        ColorTitulo: currentData.ColorTitulo || "#ffffff",
        ColorSubtitulo: currentData.ColorSubtitulo || "#ffffff",
        Imagen: currentData.Imagen,
        newImage: null,
      });
    }
  };

  const currentTitle = currentData?.Titulo || "";
  const currentSubtitle = currentData?.Subtitulo || "";
  const currentButtonText = currentData?.TextoBoton || "";
  const currentImage = currentData?.Imagen || "";
  const currentTitleColor = currentData?.ColorTitulo || "#ffffff";
  const currentSubtitleColor = currentData?.ColorSubtitulo || "#ffffff";

  return (
    <>
      {/* Admin Edit Button */}
      <div className="fixed top-28 right-4 z-50">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            title="Editar contenido"
          >
            <Edit className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
              title="Guardar cambios"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Save className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={cancelEdit}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
              title="Cancelar edición"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <section className="relative w-full h-[600px]">
        <img
          src={imagePreview || currentImage}
          alt="Equipo Betterware"
          className="w-full h-full object-cover"
        />
        {isEditing && (
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => setShowImageUpload(!showImageUpload)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
              title="Cambiar imagen de fondo"
            >
              <Upload className="w-5 h-5" />
              <span className="font-semibold">Cambiar Imagen</span>
            </button>
          </div>
        )}

        {isEditing && showImageUpload && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            {/* Overlay para resaltar la opción de cambio de imagen */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            {/* Botón centrado para cambiar imagen */}
            <div className="relative z-10 text-center">
              <label className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl cursor-pointer shadow-2xl transition-all duration-300 flex items-center gap-3 text-lg font-semibold hover:scale-105">
                <Upload className="w-6 h-6" />
                <span>Seleccionar Nueva Imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
              {/* Información adicional */}
              <div className="mt-4 text-white">
                <p className="text-sm opacity-80">
                  PNG, JPG, WEBP • Máximo 5MB
                </p>
                {formData.newImage && (
                  <p className="mt-2 text-green-300 font-medium">
                    ✓ Nueva imagen seleccionada: {formData.newImage.name}
                  </p>
                )}
              </div>
              {/* Botón para cerrar */}
              <button
                onClick={() => setShowImageUpload(false)}
                className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
        {!isEditing && <div className="absolute inset-0 bg-black/40" />}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {isEditing ? (
            <>
              <div className="w-full max-w-2xl mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-white text-sm">
                    Color del título:
                  </label>
                  <input
                    type="color"
                    name="ColorTitulo"
                    value={formData.ColorTitulo}
                    onChange={handleInputChange}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  name="Titulo"
                  value={formData.Titulo}
                  onChange={handleInputChange}
                  style={{ color: formData.ColorTitulo }}
                  className="text-4xl md:text-5xl font-extrabold text-center bg-transparent border-2 border-white mb-4 p-2 rounded w-full"
                  placeholder="Título principal"
                />
              </div>
              <div className="w-full max-w-2xl mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-white text-sm">
                    Color del subtítulo:
                  </label>
                  <input
                    type="color"
                    name="ColorSubtitulo"
                    value={formData.ColorSubtitulo}
                    onChange={handleInputChange}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <textarea
                  name="Subtitulo"
                  value={formData.Subtitulo}
                  onChange={handleInputChange}
                  style={{ color: formData.ColorSubtitulo }}
                  className="text-lg md:text-xl text-center bg-transparent border-2 border-white p-2 rounded w-full resize-none"
                  placeholder="Subtítulo"
                  rows={3}
                />
              </div>
              <input
                type="text"
                name="TextoBoton"
                value={formData.TextoBoton}
                onChange={handleInputChange}
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full text-lg border-2 border-orange-400"
                placeholder="Texto del botón"
              />
            </>
          ) : (
            <>
              <h1
                className="text-4xl md:text-5xl font-extrabold mb-4"
                style={{ color: currentTitleColor }}
              >
                {currentTitle}
              </h1>
              <p
                className="text-lg md:text-xl mb-6 max-w-2xl"
                style={{ color: currentSubtitleColor }}
              >
                {currentSubtitle}
              </p>
              <Link
                to="/AgEmpleado"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
              >
                {currentButtonText}
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="py-16 px-4 flex justify-center">
        <div className="bg-cyan-100 rounded-2xl shadow-2xl p-10 max-w-3xl w-full">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-2">
            Afíliate como Asociado
          </h2>
          <p className="text-xl text-center mb-8 font-bold">
            Y gana increíbles beneficios
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">
                Beneficios de ser Asociado:
              </p>
              {isEditing && (
                <button
                  onClick={addBeneficio}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full"
                  title="Agregar beneficio"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            {getCurrentBeneficios().map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateBeneficio(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      placeholder="Describe el beneficio"
                    />
                    <button
                      onClick={() => removeBeneficio(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                      title="Eliminar beneficio"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-lg">{item}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col text-center md:flex-row gap-4 justify-center mt-10">
            <Link
              to="/AgEmpleado"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition"
            >
              Afiliarme
            </Link>
          </div>
        </div>
      </section>

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

export default Unete;
