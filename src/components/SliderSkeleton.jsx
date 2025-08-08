import React from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Settings } from "lucide-react";

const SliderSkeleton = ({ isAdmin = false }) => {
  return (
    <div className="max-w-[1250px] w-full m-auto relative group z-0">
      {/* Imagen principal skeleton con gradiente animado */}
      <div className="w-full h-[460px] rounded-2xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-gentle-breathing relative overflow-hidden">
        {/* Efecto de ondas sutiles */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wave-gentle"></div>
        
        {/* Elementos decorativos flotantes */}
        <div className="absolute top-16 left-16 w-4 h-4 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full animate-float-gentle"></div>
        <div className="absolute top-24 right-20 w-6 h-6 bg-gradient-to-br from-teal-200/40 to-teal-300/40 rounded-full animate-float-gentle-delayed"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-gradient-to-br from-cyan-200/40 to-cyan-300/40 rounded-full animate-float-gentle-slow"></div>
        <div className="absolute bottom-32 right-24 w-5 h-5 bg-gradient-to-br from-purple-200/40 to-purple-300/40 rounded-full animate-float-gentle"></div>
        
        {/* Overlay de contenido simulado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6">
            {/* Título simulado */}
            <div className="w-80 h-12 bg-gradient-to-r from-white/30 via-white/50 to-white/30 rounded-xl animate-gentle-pulse mx-auto shadow-lg"></div>
            
            {/* Subtítulo simulado */}
            <div className="w-64 h-8 bg-gradient-to-r from-white/25 via-white/45 to-white/25 rounded-lg animate-gentle-pulse mx-auto shadow-md" style={{ animationDelay: '0.3s' }}></div>
            
            {/* Botón simulado */}
            <div className="w-44 h-12 bg-gradient-to-r from-orange-300/60 via-orange-400/70 to-orange-500/60 rounded-full animate-gentle-glow mx-auto shadow-lg" style={{ animationDelay: '0.6s' }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-4 bg-orange-100/80 rounded animate-gentle-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicador de carga central */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-white/80 text-xs font-medium ml-2">Cargando...</span>
        </div>
      </div>

      {/* Flechas skeleton */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60 text-3xl z-10">
        <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-gentle-pulse">
          <BsChevronCompactLeft className="animate-fade-pulse" />
        </div>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60 text-3xl z-10">
        <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-gentle-pulse" style={{ animationDelay: '0.2s' }}>
          <BsChevronCompactRight className="animate-fade-pulse" />
        </div>
      </div>

      {/* Dots skeleton */}
      <div className="flex justify-center absolute bottom-4 left-0 right-0 z-10">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 mx-2 bg-gray-300/60 rounded-full animate-gentle-pulse"
            style={{ animationDelay: `${index * 0.1}s` }}
          ></div>
        ))}
      </div>

      {/* Botón de gestión skeleton (solo para admin) */}
      {isAdmin && (
        <div className="absolute top-4 right-4 bg-gradient-to-br from-blue-400/60 to-blue-500/60 p-2 rounded-full animate-gentle-scale z-10 shadow-lg">
          <Settings className="w-5 h-5 text-white/80 animate-fade-pulse" />
        </div>
      )}

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
            transform: translateX(0%);
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
    </div>
  );
};

export default SliderSkeleton;