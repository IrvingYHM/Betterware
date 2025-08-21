import { useForm } from "react-hook-form";
import { useContext, useState, useEffect, useRef } from "react";
import { RegistroContext } from "./RegistroContext";

const RCorreo = ({ onNext, onBack, onValidationChange = () => {}, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false);
  const hydratedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: state.correo,
    mode: "onChange",
  });

  // 1) Fijar ancho solo una vez
  useEffect(() => {
    setMaxWidth("md");
  }, [setMaxWidth]);

  // 2) Hidratar desde el contexto SOLO UNA VEZ
  useEffect(() => {
    if (hydratedRef.current) return;
    if (state.correo && typeof state.correo === "object") {
      Object.entries(state.correo).forEach(([k, v]) => setValue(k, v));
    }
    hydratedRef.current = true;
  }, [state.correo, setValue]);

  // 3) Suscripción única: actualiza contexto (si cambia) + valida
  useEffect(() => {
    const computeValid = (values) => {
      const hasRequired = values.vchCorreo && values.vchTelefono;
      return hasRequired && Object.keys(errors).length === 0;
    };

    // Validez inicial
    const initialValues = getValues();
    const initialValid = computeValid(initialValues);
    setIsValid(initialValid);
    onValidationChange(initialValid);

    const sub = watch((values) => {
      // a) Evitar writes redundantes al contexto
      const changed =
        JSON.stringify(state.correo || {}) !== JSON.stringify(values || {});
      if (changed) {
        dispatch({ type: "UPDATE_RCORREO", payload: values });
      }

      // b) Recalcular validez
      const validNow = computeValid(values);
      if (validNow !== isValid) {
        setIsValid(validNow);
        onValidationChange(validNow);
      }
    });

    return () => sub.unsubscribe();
    // Notar: no incluimos state.correo/isValid en deps para no re-suscribir en cada cambio
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, getValues, dispatch, errors, onValidationChange]);

  const onSubmit = (data) => {
    dispatch({ type: "UPDATE_RCORREO", payload: data });
    onNext();
  };

  return (
    <div className="pt-3 text-center rounded-lg shadow-md overflow-hidden">
      <div className="container ml-auto mr-auto">
        <div className="bg-white px-12">
          <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
            Formulario de correo electrónico del afiliado
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
            {/* Correo */}
            <div className="mb-4">
              <label htmlFor="vchCorreo" className="block text-gray-800 text-left font-bold">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="vchCorreo"
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
              <label htmlFor="vchTelefono" className="block text-gray-800 text-left font-bold">
                Número de teléfono:
              </label>
              <input
                type="tel"
                id="vchTelefono"
                onKeyDown={(e) => {
                  if (!/\d/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={10}
                {...register("vchTelefono", {
                  required: { value: true, message: "El campo es requerido" },
                  minLength: { value: 10, message: "El teléfono debe tener al menos 10 dígitos" },
                  pattern: { value: /^[0-9]+$/, message: "Solo se permiten números" },
                  setValueAs: (v) => (v ? v.replace(/[^\d]/g, "") : ""),
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
                className={`border border-black rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center ${
                  isValid ? "bg-teal-600 hover:bg-teal-700 text-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
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
