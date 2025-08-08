import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Settings } from "lucide-react";
import SliderForm from "./SliderForm";

function Slider() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  // Traer las imágenes del slider desde tu API
  useEffect(() => {
    async function fetchSliderImages() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://backbetter-production.up.railway.app/imagenes/filtrar/slider"
        );
        const data = await res.json();
        setSlides(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener imágenes del slider:", error);
        setLoading(false);
      }
    }
    fetchSliderImages();
  }, []);

  // Función para manejar cuando una imagen se carga
  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }));
  };

  // Función para manejar errores de carga de imagen
  const handleImageError = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: false }));
  };

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
        {/* Container de imagen con skeleton individual */}
        <div className="relative w-full h-[460px] rounded-2xl overflow-hidden">
          {/* Skeleton overlay - se muestra si no hay slides o la imagen actual no se ha cargado */}
          {(!slides.length || !imageLoaded[currentIndex]) && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-gentle-breathing z-20">
              {/* Efecto de ondas sutiles */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wave-gentle"></div>
              
              {/* Elementos decorativos flotantes */}
              <div className="absolute top-16 left-16 w-4 h-4 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full animate-float-gentle"></div>
              <div className="absolute top-24 right-20 w-6 h-6 bg-gradient-to-br from-teal-200/40 to-teal-300/40 rounded-full animate-float-gentle-delayed"></div>
              <div className="absolute bottom-20 left-20 w-3 h-3 bg-gradient-to-br from-cyan-200/40 to-cyan-300/40 rounded-full animate-float-gentle-slow"></div>
              
              {/* Indicador de carga central */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-white/80 text-xs font-medium ml-2">Cargando imagen...</span>
              </div>

              {/* Contenido simulado */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-80 h-12 bg-gradient-to-r from-white/30 via-white/50 to-white/30 rounded-xl animate-gentle-pulse mx-auto shadow-lg"></div>
                  <div className="w-64 h-8 bg-gradient-to-r from-white/25 via-white/45 to-white/25 rounded-lg animate-gentle-pulse mx-auto shadow-md" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-44 h-12 bg-gradient-to-r from-orange-300/60 via-orange-400/70 to-orange-500/60 rounded-full animate-gentle-glow mx-auto shadow-lg" style={{ animationDelay: '0.6s' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-4 bg-orange-100/80 rounded animate-gentle-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de gestión skeleton */}
              <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-400/60 to-blue-500/60 p-2 rounded-full animate-gentle-scale shadow-lg z-10">
                <Settings className="w-5 h-5 text-white/80 animate-fade-pulse" />
              </div>
            </div>
          )}

          {/* Imagen real del slider */}
          {slides[currentIndex] && (
            <>
              <img
                src={slides[currentIndex].Imagen}
                alt="Slide"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded[currentIndex] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(currentIndex)}
                onError={() => handleImageError(currentIndex)}
              />
              
              {/* Overlay clickeable */}
              <div
                className="absolute inset-0 cursor-pointer z-10"
                onClick={handleImageClick}
                style={{
                  cursor: slides[currentIndex]?.UrlDestino ? "pointer" : "default",
                }}
                title={slides[currentIndex]?.UrlDestino ? "Ir al enlace" : ""}
              />
            </>
          )}
        </div>

        {/* Flechas */}
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-30"
          onClick={prevSlide}
        >
          <BsChevronCompactLeft />
        </div>
        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-30"
          onClick={nextSlide}
        >
          <BsChevronCompactRight />
        </div>

        {/* Dots */}
        <div className="flex justify-center absolute bottom-4 left-0 right-0 z-30">
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
          className="absolute top-4 right-4 bg-betterware text-white p-2 rounded-full hover:bg-betterware_claro transition-colors duration-300 z-30 opacity-0 group-hover:opacity-100"
          title="Gestionar imágenes del slider"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Modal */}
      <SliderForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        @keyframes gentle-breathing {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.001);
          }
        }

        @keyframes wave-gentle {
          0%, 100% {
            transform: translateX(-100%);
            opacity: 0.3;
          }
          50% {
            transform: translateX(100%);
            opacity: 0.6;
          }
        }

        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @keyframes gentle-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 6px 25px rgba(251, 146, 60, 0.3);
          }
        }

        @keyframes gentle-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(5deg);
          }
        }

        @keyframes float-gentle-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-5deg);
          }
        }

        @keyframes float-gentle-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(3deg);
          }
        }

        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-gentle-breathing {
          animation: gentle-breathing 4s ease-in-out infinite;
        }

        .animate-wave-gentle {
          animation: wave-gentle 3s ease-in-out infinite;
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 2.5s ease-in-out infinite;
        }

        .animate-gentle-glow {
          animation: gentle-glow 2s ease-in-out infinite;
        }

        .animate-gentle-scale {
          animation: gentle-scale 2s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-float-gentle-delayed {
          animation: float-gentle-delayed 3.5s ease-in-out infinite;
        }

        .animate-float-gentle-slow {
          animation: float-gentle-slow 4s ease-in-out infinite;
        }

        .animate-fade-pulse {
          animation: fade-pulse 1.8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

export default Slider;
