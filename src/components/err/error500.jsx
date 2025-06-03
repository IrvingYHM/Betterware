// src/components/ServerError.js
import Error from '../err/error500.png';

const ServerError = () => {
  return (
    <div className="py-32 text-center bg-while text-black">
      <h1 className="text-4xl font-bold mb-4">Error 500: Error Interno del Servidor</h1>
      <div className="flex items-center justify-center mb-8">
        <img src={Error} alt="Descripción de la imagen" className="w-80 h-80" />
      </div>
      <p className="text-lg">¡Ups! Algo salió mal en nuestro lado. Por favor, inténtalo de nuevo más tarde.</p>
    </div>
  );
};

export default ServerError;
