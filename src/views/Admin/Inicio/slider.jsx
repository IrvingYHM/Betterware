import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Settings } from "lucide-react";
import SliderForm from "./SliderForm";

function Slider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Traer las imágenes del slider desde tu API
  useEffect(() => {
    async function fetchSliderImages() {
      try {
        const res = await fetch(
          "https://backbetter-production.up.railway.app/imagenes/filtrar/slider"
        );
        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error("Error al obtener imágenes del slider:", error);
      }
    }
    fetchSliderImages();
  }, []);

  // Cambiar automáticamente de imagen cada 3 segundos
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slides, currentIndex]);

  // Flechas
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Ir a un slide por índice
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Redireccionar al dar clic si tiene UrlDestino
  const handleImageClick = () => {
    const slide = slides[currentIndex];
    if (slide && slide.UrlDestino) {
      window.open(slide.UrlDestino, "_blank");
    }
  };

  return (
    <>
      <div className="max-w-[1250px] w-full m-auto relative group z-0">
        {/* Imagen del slider */}
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex]?.Imagen || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: slides[currentIndex]?.UrlDestino ? "pointer" : "default",
          }}
          className="w-full h-[460px] rounded-2xl bg-center duration-500"
          onClick={handleImageClick}
          title={slides[currentIndex]?.UrlDestino ? "Ir al enlace" : ""}
        />

        {/* Flechas */}
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-10"
          onClick={prevSlide}
        >
          <BsChevronCompactLeft />
        </div>
        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-10"
          onClick={nextSlide}
        >
          <BsChevronCompactRight />
        </div>

        {/* Dots */}
        <div className="flex justify-center absolute bottom-4 left-0 right-0 z-10">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 mx-2 rounded-full ${
                currentIndex === slideIndex
                  ? "bg-blue-600 cursor-pointer"
                  : "bg-gray-400 cursor-pointer"
              }`}
            ></div>
          ))}
        </div>

        {/* Botón de gestión */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 bg-betterware text-white p-2 rounded-full hover:bg-betterware_claro transition-colors duration-300 z-10 opacity-0 group-hover:opacity-100"
          title="Gestionar imágenes del slider"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Modal */}
      <SliderForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Slider;
