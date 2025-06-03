import { useForm } from 'react-hook-form';
import React, { useContext, useState, useEffect } from "react";
import { RegistroContext } from './RegistroContext';
import { info } from 'autoprefixer';

const RCorreo = ({ onNext, onBack, onValidationChange, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false); // Estado local de validación

  const handleInfoChange = (info) => {
    dispatch({ type: "UPDATE_RCORREO", payload: info });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Verificar si hay errores en los campos
    if (Object.keys(errors).length === 0) {
      const infoCompleta = { ...state.info, ...data };
      handleInfoChange(infoCompleta);
      try {
        /*         const response = await enviarDatosAPI(infoCompleta);
        console.log("Respuesta de la API:", response); */
        onNext();
      } catch (error) {
        console.error("Error al enviar los datos a la API:", error);
        // Puedes manejar el error de la manera que prefieras
      }
    } else {
      // Hay errores, no hacer nada o puedes mostrar mensajes de error adicionales si lo deseas
    }
  };
  useEffect(() => {
    setMaxWidth("md"); //Tamaño maximo del formulario
    const isValid = Object.keys(errors).length === 0;
    setIsValid(isValid);
    // Verificar si onValidationChange está definida antes de llamarla
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, [errors, onValidationChange]);

  /*   const enviarDatosAPI = async (info) => {
    try {
      console.log("Datos a enviar al backend:", info);
    
      const response = await fetch("http://localhost:3000/clientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const responseData = await response.json();
    
      dispatch({
        type: "UPDATE_INFO_PERSONAL",
        payload: info,
      });
    
      return responseData;
    } catch (error) {
      console.error("Error al enviar los datos a la API:", error);
      throw error;
    }
  };
   */

  return (
    <>
      <div className="pt-24 text-center rounded-lg shadow-md overflow-hidden">
        <div className="container ml-auto mr-auto">
          <div className="bg-white px-12">
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario de correo electrónico del contacto
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1"
            >
              <div className="mb-4">
                <label
                  htmlFor="correo"
                  className="block text-gray-800 text-left font-bold"
                >
                  Correo electrónico:
                </label>
                <input
                  type="email"
                  id="vchCorreo"
                  name="vchCorreo"
                  onChange={(e) =>
                    handleInfoChange({ vchCorreo: e.target.value })
                  }
                  required
                  {...register("vchCorreo", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,3}$/,
                      message: "El formato de correo electrónico no es válido",
                    },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Correo Electrónico"
                />
              </div>
              {errors.vchCorreo && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchCorreo.message}
                </span>
              )}

              <div className="mb-4">
                <label
                  htmlFor="telefono"
                  className="block text-gray-800 text-left font-bold"
                >
                  Número de teléfono:
                </label>
                <input
                  type="tel"
                  id="vchTelefono"
                  name="vchTelefono"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d]/g, ""); // Eliminar todos los caracteres que no sean dígitos
                    handleInfoChange({ vchTelefono: value }); // Actualizar el estado con el valor limpio
                  }}
                  onKeyDown={(e) => {
                    if (!/\d/.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault(); // Prevenir la entrada si no es un dígito o la tecla de retroceso
                    }
                  }}
                  required
                  maxLength={10}
                  {...register("vchTelefono", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    minLength: {
                      value: 10,
                      message: "El teléfono debe tener al menos 10 dígitos",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Número de teléfono"
                />
              </div>
              {errors.vchTelefono && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchTelefono.message}
                </span>
              )}

              <div className="grid grid-cols-2">
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-gray-500 border border-black hover:bg-gray-400 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                >
                  Regresar
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 border border-black hover:bg-blue-600 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                  disabled={Object.keys(errors).length > 0}
                >
                  Siguiente
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RCorreo;
