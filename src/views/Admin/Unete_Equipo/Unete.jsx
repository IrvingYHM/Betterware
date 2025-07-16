import React from "react";
import portada from "../../../img/Anuncios/Afiliate/Equipo-Betterware.jpg";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { CheckCircle, Play } from "lucide-react";
import { useState } from "react";

function Unete() {
  const [isOpen, setIsOpen] = useState(false);

  const beneficios = [
    "Afiliación sin costo.",
    "Trámite totalmente en línea, solo necesitas tu identificación.",
    "Recibes catálogos gratis cada mes.",
    "Descuento hasta del 26% en todas tus compras.",
    "Acumulas puntos Betterware que puedes canjear por increíbles premios.",
    "Participas por bonos especiales de bienvenida durante tu arranque.",
    "Acceso a productos Betterware a precio de regalo.",
  ];

  return (
    <>
      <section className="relative w-full h-[600px]">
        <img
          src={portada}
          alt="Equipo Betterware"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Comienza tu Negocio <span className="text-orange-400">HOY</span>{" "}
            mismo con <span className="text-cyan-300">Betterware</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-2xl">
            ¡La oportunidad de tu vida te está esperando! <br />
            Afíliate <strong>GRATIS</strong> y disfruta grandes beneficios.
          </p>
          <Link
            to="/AgEmpleado"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            ¡Únete Ya!
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
            <p className="text-lg font-semibold">Beneficios de ser Asociado:</p>
            {beneficios.map((item, index) => (
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
            <button
              onClick={() => setIsOpen(true)}
              className="underline underline-offset-4 hover:text-blue-900 font-semibold flex items-center gap-2 text-lg"
            >
              <Play className="w-5 h-5" /> Ver Video
            </button>
          </div>
        </div>
      </section>

      {/* Modal para el video */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <Dialog.Panel className="relative w-full max-w-6xl p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 lg:-top-4 lg:-right-4 text-white text-4xl"
            >
              &times;
            </button>
            <div className="w-full h-[300px] md:h-[620px]">
              <iframe
                src="https://www.youtube.com/embed/fzOij-3cHCM"
                title="Video Betterware"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full rounded-xl"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default Unete;