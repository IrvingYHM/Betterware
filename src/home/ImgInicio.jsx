import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import an from "../img/an.png";
import anun from "../img/img.png";


function ImgInicio() {
  const slides = [
    {
      url: an,  // Ajusta la ruta según la ubicación de tu imagen
    },
    {
      url:anun,
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Cambiar imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="max-w-[1368px] w-full m-auto relative group">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex]?.url})`,
          backgroundSize: "cover", // Ajusta el tamaño de la imagen para cubrir completamente el contenedor
          backgroundPosition: "center", // Ajusta la posición de la imagen
        }}
        className="w-full h-[300px] rounded-2xl bg-center duration-500"
      ></div>
      {/* Left Arrow */}
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-10"
        onClick={prevSlide}
      >
        <BsChevronCompactLeft />
      </div>
      {/* Right Arrow */}
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-10"
        onClick={nextSlide}
      >
        <BsChevronCompactRight />
      </div>
      <div className="flex justify-center absolute bottom-4 left-0 right-0 z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 mx-2 rounded-full ${
              currentIndex === slideIndex ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ImgInicio;
