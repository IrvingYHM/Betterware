import { useForm } from "react-hook-form";
import { useContext, useState, useEffect, useRef } from "react";
import { RegistroContext } from "./RegistroContext";
import PropTypes from "prop-types";

function InfoPersonal({ onNext, onBack, onValidationChange, setMaxWidth }) {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false);
  const hydratedRef = useRef(false); // <- evita rehidrataciones múltiples

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: state.info,
    mode: "onChange",
  });

  // 1) Fijar ancho solo una vez
  useEffect(() => {
    setMaxWidth("md");
  }, [setMaxWidth]);

  // 2) Hidratar desde el contexto SOLO UNA VEZ
  useEffect(() => {
    if (hydratedRef.current) return;
    if (state.info && typeof state.info === "object") {
      Object.entries(state.info).forEach(([key, val]) => setValue(key, val));
    }
    hydratedRef.current = true;
  }, [state.info, setValue]);

  // 3) Suscripción única a cambios del formulario:
  //    - actualiza el contexto (evitando writes redundantes)
  //    - recalcula la validez del formulario
  useEffect(() => {
    const computeValid = (values) => {
      const hasRequired =
        values.vchNombre &&
        values.vchAPaterno &&
        values.vchAMaterno &&
        values.vchCURP &&
        values.chrSexo &&
        values.dtFechaNacimiento &&
        values.vchLugarNacimiento;

      return hasRequired && Object.keys(errors).length === 0;
    };

    // Inicial: calcula validez con valores actuales
    const initialValues = getValues();
    const initialValid = computeValid(initialValues);
    setIsValid(initialValid);
    if (typeof onValidationChange === "function") onValidationChange(initialValid);

    // Suscripción react-hook-form
    const sub = watch((values) => {
      // a) Actualizar contexto SOLO si realmente cambió (barata comparación)
      //    Si guardas objetos anidados complejos puedes usar una comparación más elaborada
      const changed =
        JSON.stringify(state.info || {}) !== JSON.stringify(values || {});
      if (changed) {
        dispatch({ type: "UPDATE_INFO_PERSONAL", payload: values });
      }

      // b) Validación
      const validNow = computeValid(values);
      if (validNow !== isValid) {
        setIsValid(validNow);
        if (typeof onValidationChange === "function") onValidationChange(validNow);
      }
    });

    return () => sub.unsubscribe();
    // OJO: NO dependas de `state.info` aquí, o re-suscribes en cada cambio
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, getValues, dispatch, errors, onValidationChange, isValid, state.info]);

  const onSubmit = (data) => {
    dispatch({ type: "UPDATE_INFO_PERSONAL", payload: data });
    onNext();
  };

  return (
    <>
      <div className="pt-3 text-center rounded-lg shadow-md overflow-hidden">
        <div className="container ml-auto mr-auto">
          <div className="bg-white px-12">
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario registro de afiliados
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
              {/* Nombre */}
              <div className="mb-4">
                <label htmlFor="vchNombre" className="block text-gray-800 text-left font-bold">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="vchNombre"
                  {...register("vchNombre", {
                    required: "El campo es requerido",
                    minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                    pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "Solo se permiten letras y espacios" },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.vchNombre && <span className="text-red-500 -mt-3 mb-2">*{errors.vchNombre.message}</span>}
              </div>

              {/* Apellido Paterno */}
              <div className="mb-4">
                <label htmlFor="vchAPaterno" className="block text-gray-800 text-left font-bold">
                  Apellido Paterno:
                </label>
                <input
                  type="text"
                  id="vchAPaterno"
                  {...register("vchAPaterno", {
                    required: "El campo es requerido",
                    minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
                    pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "Solo se permiten letras y espacios" },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.vchAPaterno && <span className="text-red-500 -mt-3 mb-2">*{errors.vchAPaterno.message}</span>}
              </div>

              {/* Apellido Materno */}
              <div className="mb-4">
                <label htmlFor="vchAMaterno" className="block text-gray-800 text-left font-bold">
                  Apellido Materno:
                </label>
                <input
                  type="text"
                  id="vchAMaterno"
                  {...register("vchAMaterno", {
                    required: "El campo es requerido",
                    minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
                    pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "Solo se permiten letras y espacios" },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.vchAMaterno && <span className="text-red-500 -mt-3 mb-2">*{errors.vchAMaterno.message}</span>}
              </div>

              {/* CURP */}
              <div className="mb-4">
                <label htmlFor="vchCURP" className="block text-gray-800 text-left font-bold">
                  CURP:
                </label>
                <input
                  type="text"
                  id="vchCURP"
                  maxLength={18}
                  className="mt-1 p-2 border rounded-md w-full uppercase"
                  {...register("vchCURP", {
                    required: "El campo CURP es requerido",
                    pattern: { value: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/, message: "Formato de CURP inválido" },
                    setValueAs: (v) => (v ? v.toUpperCase().replace(/[^A-Z0-9]/g, "") : ""),
                  })}
                />
                {errors.vchCURP && <span className="text-red-500 text-base -mt-3 mb-2">*{errors.vchCURP.message}</span>}
              </div>

              {/* Sexo */}
              <div className="mb-4">
                <label htmlFor="chrSexo" className="block text-gray-800 text-left font-bold">
                  Sexo:
                </label>
                <select
                  id="chrSexo"
                  {...register("chrSexo", { required: "El campo es requerido" })}
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option value="">Seleccionar</option>
                  <option value="H">Hombre</option>
                  <option value="M">Mujer</option>
                </select>
                {errors.chrSexo && <span className="text-red-500 -mt-3 mb-2">*{errors.chrSexo.message}</span>}
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-4">
                <label htmlFor="dtFechaNacimiento" className="block text-gray-800 text-left font-bold">
                  Fecha de nacimiento:
                </label>
                <input
                  type="date"
                  id="dtFechaNacimiento"
                  min="1920-01-01"
                  max={(() => {
                    const today = new Date();
                    today.setFullYear(today.getFullYear() - 18);
                    return today.toISOString().split("T")[0];
                  })()}
                  {...register("dtFechaNacimiento", { required: "El campo es requerido" })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.dtFechaNacimiento && (
                  <span className="text-red-500 -mt-3 mb-2">*{errors.dtFechaNacimiento.message}</span>
                )}
              </div>

              {/* Lugar de nacimiento */}
              <div className="mb-4">
                <label htmlFor="vchLugarNacimiento" className="block text-gray-800 text-left font-bold">
                  Lugar de Nacimiento:
                </label>
                <input
                  type="text"
                  id="vchLugarNacimiento"
                  placeholder="Ciudad o Estado de nacimiento"
                  {...register("vchLugarNacimiento", {
                    required: { value: true, message: "El campo es requerido" },
                    minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                    pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s,]+$/, message: "Solo se permiten letras, espacios y comas" },
                  })}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.vchLugarNacimiento && (
                  <span className="text-red-500 -mt-3 mb-2">*{errors.vchLugarNacimiento.message}</span>
                )}
              </div>

              <button
                type="submit"
                className={`border border-black rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center ${
                  isValid ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
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

InfoPersonal.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onValidationChange: PropTypes.func,
  setMaxWidth: PropTypes.func.isRequired,
};

export default InfoPersonal;
