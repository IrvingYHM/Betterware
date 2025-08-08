import React from 'react';
import { Users, Sparkles, Heart, Trophy } from 'lucide-react';

const UneteLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="text-center p-8">
        {/* Logo animado principal */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Users className="w-12 h-12 text-white animate-bounce" />
          </div>
          
          {/* Elementos flotantes animados */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center animate-ping shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <Heart className="w-3 h-3 text-white" />
          </div>
          <div className="absolute top-2 -left-4 w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}>
            <Trophy className="w-2 h-2 text-white" />
          </div>
        </div>

        {/* Texto principal */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">
            Únete al Equipo
          </h2>
          <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Cargando información del programa...
          </p>
        </div>

        {/* Barra de progreso animada */}
        <div className="w-64 mx-auto mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-full animate-loading-bar shadow-sm"></div>
          </div>
        </div>

        {/* Puntos de carga animados */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Preparando una experiencia increíble para descubrir los beneficios de ser parte de Betterware
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UneteLoading;