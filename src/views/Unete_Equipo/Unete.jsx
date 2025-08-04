import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";
import UneteSkeleton from "../../components/UneteSkeleton";

function Unete() {
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBeneficios = () => {
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

  useEffect(() => {
    fetchUneteData();
  }, []);

  const fetchUneteData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backbetter-production.up.railway.app/unete-equipo/"
      );
      if (response.data && response.data.length > 0) {
        setCurrentData(response.data[0]);
      }
      // Simular un pequeño delay para mostrar la animación
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      console.error("Error fetching unete data:", error);
      setLoading(false);
    }
  };


  const currentTitle = currentData?.Titulo || "";
  const currentSubtitle = currentData?.Subtitulo || "";
  const currentButtonText = currentData?.TextoBoton || "";
  const currentImage = currentData?.Imagen || "";
  const currentTitleColor = currentData?.ColorTitulo || "#ffffff";
  const currentSubtitleColor = currentData?.ColorSubtitulo || "#ffffff";

  if (loading) {
    return <UneteSkeleton isAdmin={false} />;
  }

  return (
    <>
      <Barra/>

      <section className="relative w-full h-[550px] mt-32">
        <img
          src={currentImage}
          alt="Equipo Betterware"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
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
            </div>
            {getBeneficios().map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 w-6 h-6 mt-1" />
                <p className="text-lg">{item}</p>
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
      <Fot/>
    </>
  );
}

export default Unete;
