import { useState, useEffect } from "react";
import Fot from "../../../../components/Footer";
import Barra from "../../../../components/Navegacion/barraAdmin";
import { RegistroProvider } from "./RegistroContext";
import InfoPersonal from "./InfoPersonal";
import RCorreo from "./RCorreo";
import RContraseña from "./RContraseña";
import RDireccion from "./RDireccion";

const RegistroPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCurrentPageValid, setIsCurrentPageValid] = useState(false);
  const [, setMaxWidth] = useState("md"); // Estado para almacenar maxWidth

  const handleNext = () => {
    if (isCurrentPageValid) {
      setCurrentPage((prevPage) => prevPage + 1);
      // No resetear validación aquí para permitir navegación fluida
    } else {
      console.log("El formulario actual no es válido.");
    }
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    // No cambiar validación aquí, dejar que el componente se revalide
  };

  const handleValidationChange = (isValid) => {
    setIsCurrentPageValid(isValid);
  };

  // Permitir que cada formulario evalúe su estado inmediatamente

  return (
    <RegistroProvider>
      <Barra />
      <div className="mt-28 mb-8">
        <div
          className={`${currentPage === 4 ? 'max-w-3xl' : 'max-w-md'} mx-auto bg-white rounded-xl shadow-lg overflow-hidden`}
        >
          {/* Progress Steps */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500">
            <div className={`${currentPage === 4 ? 'px-4 py-4' : 'px-6 py-5'} flex justify-center items-center ${currentPage === 4 ? 'space-x-2' : 'space-x-0'}`}>
              {[
                { number: 1, title: "Personal" },
                { number: 2, title: "Contacto" },
                { number: 3, title: "Contraseña" },
                { number: 4, title: "Dirección" }
              ].map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`${currentPage === 4 ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center rounded-full transition-all duration-300 ${
                        step.number === currentPage
                          ? "bg-white text-teal-600 shadow-lg scale-110"
                          : step.number < currentPage
                          ? "bg-white/90 text-teal-600 shadow-md"
                          : "bg-white/30 text-white border-2 border-white/50"
                      }`}
                    >
                      {step.number < currentPage ? (
                        <svg className={`${currentPage === 4 ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className={`font-bold ${currentPage === 4 ? 'text-sm' : 'text-base'}`}>{step.number}</span>
                      )}
                    </div>
                    <span className={`mt-1 ${currentPage === 4 ? 'text-xs' : 'text-sm'} font-medium transition-colors duration-300 ${
                      step.number === currentPage ? "text-white" : "text-white/80"
                    } ${currentPage === 4 ? 'hidden sm:block' : ''}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`${currentPage === 4 ? 'w-8 h-1 mx-2 mt-[-12px]' : 'w-12 h-1 mt-[-16px]'} rounded-full transition-all duration-300 ${
                        step.number < currentPage ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="">
            {currentPage === 1 && (
              <InfoPersonal
                onNext={handleNext}
                onBack={handleBack}
                onValidationChange={handleValidationChange}
                setMaxWidth={setMaxWidth}
              />
            )}
            {currentPage === 2 && (
              <RCorreo
                onNext={handleNext}
                onBack={handleBack}
                onValidationChange={handleValidationChange}
                setMaxWidth={setMaxWidth}
              />
            )}
            {currentPage === 3 && (
              <RContraseña
                onNext={handleNext}
                onBack={handleBack}
                onValidationChange={handleValidationChange}
                setMaxWidth={setMaxWidth}
              />
            )}
            {currentPage === 4 && (
              <RDireccion
                onNext={handleNext}
                onBack={handleBack}
                onValidationChange={handleValidationChange}
                setMaxWidth={setMaxWidth}
              />
            )}
          </div>
        </div>
      </div>
      <Fot />
    </RegistroProvider>
  );
};

export default RegistroPage;
