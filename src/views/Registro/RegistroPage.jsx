import  { useState } from "react";
import Fot from "../../components/Footer";
import { RegistroProvider } from "./RegistroContext";
import InfoPersonal from "./InfoPersonal";
import RCorreo from "./RCorreo";
import RContraseña from "./RContraseña";
import RDireccion from "./RDireccion";
import Barra from "../../components/Navegacion/barra";

const RegistroPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCurrentPageValid, setIsCurrentPageValid] = useState(false);
  const [maxWidth, setMaxWidth] = useState("md"); // Estado para almacenar maxWidth

  const handleNext = () => {
    if (isCurrentPageValid) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      console.log("El formulario actual no es válido.");
    }
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleValidationChange = (isValid) => {
    setIsCurrentPageValid(isValid);
  };

  return (
    <RegistroProvider>
      <Barra/>
      <div className="py-24">
        <div className={`max-w-${maxWidth} mx-auto bg-white rounded-xl shadow-lg overflow-hidden`}>
          <div className="bg-slate-200">
            <div className="flex justify-center -mb-20 py-3">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`h-10 w-10 flex justify-center items-center rounded-full border-4 ${step === currentPage ? 'border-blue-500' : 'border-gray-300'} text-lg font-semibold ${step < currentPage ? 'text-blue-500' : 'text-gray-500'}`}>{step}</div>
                  {step < 4 && <div className={`h-2 w-16 bg-${step < currentPage ? 'blue' : 'gray'}-500`} />}
                </div>
              ))}
            </div>
          </div>
          <div className="">
            {currentPage === 1 && (
              <InfoPersonal onNext={handleNext} onBack={handleBack} onValidationChange={handleValidationChange} setMaxWidth={setMaxWidth} />
            )}
            {currentPage === 2 && (
              <RCorreo onNext={handleNext} onBack={handleBack} onValidationChange={handleValidationChange} setMaxWidth={setMaxWidth} />
            )}
            {currentPage === 3 && (
              <RContraseña onNext={handleNext} onBack={handleBack} onValidationChange={handleValidationChange} setMaxWidth={setMaxWidth} />
            )}
            {currentPage === 4 && (
              <RDireccion onNext={handleNext} onBack={handleBack} onValidationChange={handleValidationChange} setMaxWidth={setMaxWidth} />
            )}
          </div>
        </div>
      </div>
      <Fot/>
    </RegistroProvider>
  );
};

export default RegistroPage;
