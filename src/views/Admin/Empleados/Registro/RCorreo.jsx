import { useForm } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";

const RCorreo = ({ onNext, onBack, onValidationChange, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false);

  // Mezcla los valores para no perder el otro campo
  const handleInfoChange = (info) => {
    dispatch({ type: "UPDATE_RCORREO", payload: { ...state.correo, ...info } });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      handleInfoChange(data); // data tiene ambos campos
      onNext();
    }
  };

  useEffect(() => {
    setMaxWidth("md");
    setIsValid(Object.keys(errors).length === 0);
    if (typeof onValidationChange === "function") {
      onValidationChange(Object.keys(errors).length === 0);
    }
  }, [errors, onValidationChange]);

  return (
    <div className="pt-24 text-center rounded-lg shadow-md overflow-hidden">
      <div className="container ml-auto mr-auto">
        <div className="bg-white px-12">
          <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
            Formulario de correo electrónico del contacto
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
            {/* Correo */}
            <div className="mb-4">
              <label
                htmlFor="vchCorreo"
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
                  required: { value: true, message: "El campo es requerido" },
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "El formato de correo electrónico no es válido",
                  },
                })}
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Correo Electrónico"
              />
              {errors.vchCorreo && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchCorreo.message}
                </span>
              )}
            </div>

            {/* Teléfono */}
            <div className="mb-4">
              <label
                htmlFor="vchTelefono"
                className="block text-gray-800 text-left font-bold"
              >
                Número de teléfono:
              </label>
              <input
                type="tel"
                id="vchTelefono"
                name="vchTelefono"
                onChange={(e) =>
                  handleInfoChange({
                    vchTelefono: e.target.value.replace(/[^\d]/g, ""),
                  })
                }
                onKeyDown={(e) => {
                  // Permite números y teclas de edición
                  if (
                    !/\d/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                required
                maxLength={10}
                {...register("vchTelefono", {
                  required: { value: true, message: "El campo es requerido" },
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
              {errors.vchTelefono && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchTelefono.message}
                </span>
              )}
            </div>

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
                disabled={!isValid}
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RCorreo;
