import { useForm } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";

function InfoPersonal({ onNext, onBack, onValidationChange, setMaxWidth }) {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false); // Estado local de validación

  /* console.log(state); // Verifica el estado aquí */

  const handleInfoChange = (info) => {
    dispatch({ type: "UPDATE_INFO_PERSONAL", payload: info });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setMaxWidth("md"); //Tamaño maximo del formulario
    const isValid = Object.keys(errors).length === 0;
    setIsValid(isValid);
    // Verificar si onValidationChange está definida antes de llamarla
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, [errors, onValidationChange]);

  const onSubmit = (data) => {
    const fechaNacim = new Date(data.fechaNacim);
    const fechaActual = new Date();

    // Calcular la diferencia de años entre la fecha de nacimiento y la fecha actual
    let diferenciaAnios = fechaActual.getFullYear() - fechaNacim.getFullYear();

    // Ajustar la diferencia de años si el cumpleaños todavía no ha pasado este año
    if (
      fechaActual.getMonth() < fechaNacim.getMonth() ||
      (fechaActual.getMonth() === fechaNacim.getMonth() &&
        fechaActual.getDate() <= fechaNacim.getDate())
    ) {
      diferenciaAnios--;
    }

    // Verificar si la diferencia de años es menor que 18
    if (diferenciaAnios < 18) {
      alert("Debes tener al menos 18 años para registrarte.");
      return; // Detener la función aquí si hay un error
    } else {
      handleInfoChange(data); // Envía todo el objeto data
      onNext(); // Pasar al siguiente paso si el formulario es válido
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
              <div className="mb-4">
                <label
                  htmlFor="nombre"
                  className="block text-gray-800 text-left font-bold"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="vchNombre"
                  name="vchNombre"
                  placeholder="Nombre"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[0-9]/g, ""); // Eliminar números de la entrada
                    handleInfoChange({ vchNombre: value }); // Actualizar el estado con el valor limpio
                  }}
                  onKeyDown={(e) => {
                    if (!/[A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(e.key)) {
                      e.preventDefault(); // Prevenir la entrada si no es una letra o un espacio en blanco
                    }
                  }}
                  required
                  {...register("vchNombre", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, // Permite letras y espacios en blanco
                      message:
                        "Solo se permiten letras de la A a la Z y espacios",
                    },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              {errors.vchNombre && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchNombre.message}
                </span>
              )}

              <div className="mb-4">
                <label
                  htmlFor="apPaterno"
                  className="block text-gray-800 text-left font-bold"
                >
                  Apellido Paterno:
                </label>
                <input
                  type="text"
                  id="vchAPaterno"
                  name="vchAPaterno"
                  placeholder="Apellido Paterno"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[0-9]/g, ""); // Eliminar números de la entrada
                    handleInfoChange({ vchAPaterno: value }); // Actualizar el estado con el valor limpio
                  }}
                  onKeyDown={(e) => {
                    if (!/[A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(e.key)) {
                      e.preventDefault(); // Prevenir la entrada si no es una letra o un espacio en blanco
                    }
                  }}
                  required
                  {...register("vchAPaterno", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, // Permite letras y espacios en blanco
                      message:
                        "Solo se permiten letras de la A a la Z y espacios",
                    },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              {errors.vchAPaterno && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchAPaterno.message}
                </span>
              )}

              <div className="mb-4">
                <label
                  htmlFor="apMaterno"
                  className="block text-gray-800 text-left font-bold"
                >
                  Apellido Materno:
                </label>
                <input
                  type="text"
                  id="vchAMaterno"
                  name="vchAMaterno"
                  placeholder="Apellido Materno"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[0-9]/g, ""); // Eliminar números de la entrada
                    handleInfoChange({ vchAMaterno: value }); // Actualizar el estado con el valor limpio
                  }}
                  onKeyDown={(e) => {
                    if (!/[A-Za-zÀ-ÖØ-öø-ÿ\s]/.test(e.key)) {
                      e.preventDefault(); // Prevenir la entrada si no es una letra o un espacio en blanco
                    }
                  }}
                  required
                  {...register("vchAMaterno", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El apellido debe tener al menos 3 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, // Permite letras y espacios en blanco
                      message:
                        "Solo se permiten letras de la A a la Z y espacios",
                    },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              {errors.vchAMaterno && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.vchAMaterno.message}
                </span>
              )}

              <div className="mb-4">
                <label
                  htmlFor="sexo"
                  className="block text-gray-800 text-left font-bold"
                >
                  Sexo:
                </label>
                <select
                  id="chrSexo"
                  name="chrSexo"
                  onChange={(e) =>
                    handleInfoChange({ chrSexo: e.target.value })
                  }
                  required
                  {...register("chrSexo", {
                    required: "El campo es requerido",
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="">Seleccionar</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              {errors.chrSexo && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.chrSexo.message}
                </span>
              )}

              <div className="mb-4">
                <label
                  htmlFor="sexo"
                  className="block text-gray-800 text-left font-bold"
                >
                  Estado Empleado:
                </label>
                <select
                  id="EstadoEmp"
                  name="EstadoEmp"
                  onChange={(e) =>
                    handleInfoChange({ EstadoEmp: e.target.value })
                  }
                  required
                  {...register("EstadoEmp", {
                    required: "El campo es requerido",
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="">Seleccionar</option>
                  <option value="DISPONIBLE">DISPONIBLE</option>
                  <option value="NO DISPONIBLE">NO DISPONIBLE</option>
                  <option value="OCUPADO">OCUPADO</option>
                </select>
              </div>
              {errors.EstadoEmp && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.EstadoEmp.message}
                </span>
              )}

              <div className="mb-4">
                <label
                  htmlFor="fechaNacim"
                  className="block text-gray-800 text-left font-bold"
                >
                  Fecha de nacimiento:
                </label>
                <input
                  type="date"
                  id="dtFechaNacimiento"
                  name="dtFechaNacimiento"
                  max={new Date().toISOString().split("T")[0]} // Restringe la fecha máxima a la fecha actual
                  onChange={(e) =>
                    handleInfoChange({ dtFechaNacimiento: e.target.value })
                  }
                  required
                  {...register("dtFechaNacimiento", {
                    required: "El campo es requerido",
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              {errors.dtFechaNacimiento && (
                <span className="text-red-500 text-base -mt-3 mb-2">
                  *{errors.dtFechaNacimiento.message}
                </span>
              )}

              <button
                type="submit"
                className="bg-blue-700 border border-black hover:bg-blue-600 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
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
}

export default InfoPersonal;
