import { useForm } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RContraseña = ({ onNext, onBack, onValidationChange }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false); // Estado local de validación
  const [showPassword, setShowPassword] = useState(false); // Estado local para mostrar/ocultar la contraseña
  const [showConfirPass, setShowConfirPass] = useState(false);

  const handleInfoChange = (info) => {
    dispatch({ type: "UPDATE_RCONTRASEÑA", payload: info });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(); // Agrega 'watch' a la desestructuración

  const onSubmit = (data) => {
    console.log(data);
    onNext();
    // Aquí puedes manejar la lógica de envío del formulario
  };

  const passwordValidation = (value) => {
    const minLength = 8; // Mínimo 8 caracteres
    const maxLength = 16; // Máximo 18 caracteres
    const hasSpecialChar = /[!@#$%^&*]/.test(value); // Verifica si hay al menos un carácter especial
    const hasUpperCase = /[A-Z]/.test(value); // Verifica si hay al menos una letra mayúscula
    const hasLowerCase = /[a-z]/.test(value); // Verifica si hay al menos una letra minúscula
    const hasNumber = /\d/.test(value); // Verifica si hay al menos un número

    if (value.length < minLength) {
      return `La contraseña debe tener al menos ${minLength} caracteres`;
    }
    if (value.length > maxLength) {
      return `La contraseña no puede tener más de ${maxLength} caracteres`;
    }
    if (!hasSpecialChar) {
      return "La contraseña debe contener al menos un carácter especial";
    }
    if (!hasUpperCase) {
      return "La contraseña debe contener al menos una letra mayúscula";
    }
    if (!hasLowerCase) {
      return "La contraseña debe contener al menos una letra minúscula";
    }
    if (!hasNumber) {
      return "La contraseña debe contener al menos un número";
    }

    return true; // La contraseña es válida
  };

  const selectedQuestion = watch("question"); // Obtener el valor seleccionado de la pregunta

  useEffect(() => {
    const isValid = Object.keys(errors).length === 0;
    setIsValid(isValid);
    // Verificar si onValidationChange está definida antes de llamarla
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, [errors, onValidationChange]);

  return (
    <>
      <div className="my-28 text-center">
        <div className="container ml-auto mr-auto flex items-center justify-center">
          <div>
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario de contraseña del contacto
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 relative">
                <label
                  htmlFor="contraseña"
                  className="block text-sm font-medium text-gray-800 -translate-x-28"
                >
                  Contraseña:
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="contraseña"
                  name="contraseña"
                  onChange={(e) =>
                    handleInfoChange({ contraseña: e.target.value })
                  }
                  required
                  maxLength={16}
                  {...register("contraseña", {
                    validate: passwordValidation,
                  })}
                  className="mt-1 p-2 border rounded-md w-72 text-center"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  className="absolute right-20 top-1/2 transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.contraseña && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.contraseña.message}
                </span>
              )}

              <div className="mb-4 relative">
                <label
                  htmlFor="confirContra"
                  className="block text-sm font-medium text-gray-800 -translate-x-9"
                >
                  Ingresa nuevamente tu contraseña:
                </label>
                <input
                  type={showConfirPass ? "text" : "password"}
                  id="confirContra"
                  name="confirContra"
                  onChange={(e) =>
                    handleInfoChange({ confirContra: e.target.value })
                  }
                  required
                  maxLength={16}
                  {...register("confirContra", {
                    validate: (value) =>
                      value === watch("contraseña") ||
                      "Las contraseñas no coinciden",
                  })}
                  className="mt-1 p-2 border rounded-md w-72 text-center"
                  placeholder="Confirma tu contraseña"
                />
                <button
                  type="button"
                  className="absolute right-20 top-1/2 transform"
                  onClick={() => setShowConfirPass(!showConfirPass)}
                >
                  <FontAwesomeIcon icon={showConfirPass ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.confirContra && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.confirContra.message}
                </span>
              )}

              {/* Pregunta secreta y respuesta */}
              <div className="mb-4">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-800 mb-2 -translate-x-9"
                >
                  Selecciona una pregunta secreta:
                </label>
                <select
                  id="question"
                  name="question"
                  onChange={(e) =>
                    handleInfoChange({ question: e.target.value })
                  }
                  {...register("question")}
                  defaultValue=""
                  className="border border-gray-300 py-4 rounded-lg focus:border-indigo-500 outline-none focus:right-1 focus:ring-indigo-500 w-72 select-selected text-sm "
                >
                  <option disabled value="">
                    Selecciona la pregunta secreta
                  </option>
                  <option value="color">¿Cuál es tu color favorito?</option>
                  <option value="amigo">
                    ¿Cuál es el nombre de tu mejor amigo?
                  </option>
                  <option value="mascota">
                    ¿Cuál es el nombre de tu mascota?
                  </option>
                  <option value="comida">¿Cuál es tu comida favorita?</option>
                </select>
              </div>
              {selectedQuestion !== "" && (
                <div>
                  <label
                    htmlFor="answer"
                    className="block text-sm font-medium text-gray-800 -translate-x-28"
                  >
                    Respuesta:
                  </label>
                  <input
                    type="text"
                    id="respuesta"
                    name="respuesta"
                    onChange={(e) =>
                      handleInfoChange({ respuesta: e.target.value })
                    }
                    {...register("answer")}
                    className="mt-1 p-2 border rounded-md w-72 text-center"
                    placeholder="Ingresa tu respuesta"
                  />
                </div>
              )}
              <br />

              {/* <button
                style={{ backgroundColor: "green", color: "white" }}
                className="bg-blue-700 border-2 border-black hover:bg-green-400 text-white rounded-md font-bold flex px-4 py-2 justify-center mx-auto items-center"
                type="submit"
              >
                Guardar
              </button> */}

              <button
                type="button"
                onClick={onBack}
                className="bg-gray-500 text-white p-2 mr-2 rounded-md"
              >
                Regresar
              </button>
              <button
                type="submit"
                className="bg-blue-700 text-white p-2 rounded-md"
                disabled={Object.keys(errors).length > 0}
              >
                Siguiente
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RContraseña;
