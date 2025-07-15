import { useForm } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";

function InfoPersonal({ onNext, onBack, onValidationChange, setMaxWidth }) {
  const { dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    setMaxWidth("md");
    const isValid = Object.keys(errors).length === 0;
    setIsValid(isValid);
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, [errors, onValidationChange]);

  const onSubmit = (data) => {
    const fechaNacim = new Date(data.dtFechaNacimiento);
    const fechaActual = new Date();

    let diferenciaAnios = fechaActual.getFullYear() - fechaNacim.getFullYear();

    if (
      fechaActual.getMonth() < fechaNacim.getMonth() ||
      (fechaActual.getMonth() === fechaNacim.getMonth() &&
        fechaActual.getDate() < fechaNacim.getDate())
    ) {
      diferenciaAnios--;
    }

    if (diferenciaAnios < 18) {
      alert("Debes tener al menos 18 años para registrarte.");
      return;
    } else {
      // Guarda TODOS los campos de golpe en el contexto
      dispatch({
        type: "UPDATE_INFO_PERSONAL",
        payload: data,
      });
      onNext();
    }
  };

  return (
    <>
      <div className="pt-24 text-center rounded-lg shadow-md overflow-hidden">
        <div className="container ml-auto mr-auto">
          <div className="bg-white px-12">
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario registro de empleados
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1"
            >
              {/* Nombre */}
              <div className="mb-4">
                <label
                  htmlFor="vchNombre"
                  className="block text-gray-800 text-left font-bold"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="vchNombre"
                  {...register("vchNombre", {
                    required: "El campo es requerido",
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                      message:
                        "Solo se permiten letras de la A a la Z y espacios",
                    },
                    setValueAs: (v) => (v ? v.replace(/[0-9]/g, "") : ""),
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
                {errors.vchNombre && (
                  <span className="text-red-500 -mt-3 mb-2">
                    *{errors.vchNombre.message}
                  </span>
                )}
              </div>

              {/* Apellido Paterno */}
              <div className="mb-4">
                <label
                  htmlFor="vchAPaterno"
                  className="block text-gray-800 text-left font-bold"
                >
                  Apellido Paterno:
                </label>
                <input
                  type="text"
                  id="vchAPaterno"
                  {...register("vchAPaterno", {
                    required: "El campo es requerido",
                    minLength: {
                      value: 3,
                      message: "El apellido debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                      message:
                        "Solo se permiten letras de la A a la Z y espacios",
                    },
                    setValueAs: (v) => (v ? v.replace(/[0-9]/g, "") : ""),
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
                {errors.vchAPaterno && (
                  <span className="text-red-500 -mt-3 mb-2">
                    *{errors.vchAPaterno.message}
                  </span>
                )}
              </div>

              {/* Apellido Materno */}
              <div className="mb-4">
                <label
                  htmlFor="vchAMaterno"
                  className="block text-gray-800 text-left font-bold"
                >
                  Apellido Materno:
                </label>
                <input
                  type="text"
                  id="vchAMaterno"
                  {...register("vchAMaterno", {
                    required: "El campo es requerido",
                    minLength: {
                      value: 3,
                      message: "El apellido debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                      message:
                        "Solo se permiten letras de la A a la Z y espacios",
                    },
                    setValueAs: (v) => (v ? v.replace(/[0-9]/g, "") : ""),
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
                {errors.vchAMaterno && (
                  <span className="text-red-500 -mt-3 mb-2">
                    *{errors.vchAMaterno.message}
                  </span>
                )}
              </div>

              {/* CURP */}
              <div className="mb-4">
                <label
                  htmlFor="vchCURP"
                  className="block text-gray-800 text-left font-bold"
                >
                  CURP:
                </label>
                <input
                  type="text"
                  id="vchCURP"
                  maxLength={18}
                  className="mt-1 p-2 border rounded-md w-full uppercase"
                  {...register("vchCURP", {
                    required: "El campo CURP es requerido",
                    pattern: {
                      value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/,
                      message: "Formato de CURP inválido",
                    },
                    setValueAs: (v) =>
                      v ? v.toUpperCase().replace(/[^A-Z0-9]/g, "") : "",
                  })}
                  required
                />
                {errors.vchCURP && (
                  <span className="text-red-500 text-base -mt-3 mb-2">
                    *{errors.vchCURP.message}
                  </span>
                )}
              </div>

              {/* Sexo */}
              <div className="mb-4">
                <label
                  htmlFor="chrSexo"
                  className="block text-gray-800 text-left font-bold"
                >
                  Sexo:
                </label>
                <select
                  id="chrSexo"
                  {...register("chrSexo", {
                    required: "El campo es requerido",
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="H">Hombre</option>
                  <option value="M">Mujer</option>
                </select>
                {errors.chrSexo && (
                  <span className="text-red-500 -mt-3 mb-2">
                    *{errors.chrSexo.message}
                  </span>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-4">
                <label
                  htmlFor="dtFechaNacimiento"
                  className="block text-gray-800 text-left font-bold"
                >
                  Fecha de nacimiento:
                </label>
                <input
                  type="date"
                  id="dtFechaNacimiento"
                  max={new Date().toISOString().split("T")[0]}
                  {...register("dtFechaNacimiento", {
                    required: "El campo es requerido",
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
                {errors.dtFechaNacimiento && (
                  <span className="text-red-500 -mt-3 mb-2">
                    *{errors.dtFechaNacimiento.message}
                  </span>
                )}
              </div>

              {/* Lugar de nacimiento */}
              <div className="mb-4">
                <label
                  htmlFor="vchLugarNacimiento"
                  className="block text-gray-800 text-left font-bold"
                >
                  Lugar de Nacimiento:
                </label>
                <input
                  type="text"
                  id="vchLugarNacimiento"
                  placeholder="Ciudad o Estado de nacimiento"
                  {...register("vchLugarNacimiento", {
                    required: { value: true, message: "El campo es requerido" },
                    minLength: {
                      value: 3,
                      message: "Debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s,]+$/,
                      message: "Solo se permiten letras, espacios y comas",
                    },
                    setValueAs: (v) => (v ? v.replace(/[0-9]/g, "") : ""),
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
                {errors.vchLugarNacimiento && (
                  <span className="text-red-500 -mt-3 mb-2">
                    *{errors.vchLugarNacimiento.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-700 border border-black hover:bg-blue-600 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                disabled={!isValid}
              >
                Siguiente
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoPersonal;
