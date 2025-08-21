import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordChecklist from "react-password-checklist";

const RContraseña = ({ onNext, onBack, onValidationChange, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirPass, setShowConfirPass] = useState(false);
  const [passwordChecklistValid, setPasswordChecklistValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: { vchPassword: state.contrasena },
    mode: "onChange"
  });

  const vchPassword = watch("vchPassword", "");
  const passwordConf = watch("vchPasswordConf", "");

  useEffect(() => {
    setMaxWidth("md");
    
    // Cargar datos persistidos del contexto
    if (state.contrasena) {
      setValue("vchPassword", state.contrasena);
    }
  }, [state.contrasena, setValue, setMaxWidth]);

  // Evaluar validación inicial inmediatamente
  useEffect(() => {
    const currentPassword = watch("vchPassword");
    const currentPasswordConf = watch("vchPasswordConf");
    
    const isValid = Object.keys(errors).length === 0 && 
                   passwordChecklistValid && 
                   currentPassword && 
                   currentPasswordConf;
    
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, []);

  useEffect(() => {
    const isValid = Object.keys(errors).length === 0 && 
                   passwordChecklistValid && 
                   vchPassword && 
                   passwordConf;
    
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, [errors, onValidationChange, passwordChecklistValid, vchPassword, passwordConf]);

  const onSubmit = async (data) => {
    dispatch({ 
      type: "UPDATE_CONTRASEÑA", 
      payload: data.vchPassword 
    });

    const infoCompleta = {
      ...state.info,
      ...state.correo,
      vchPassword: data.vchPassword,
    };

    console.log("Datos a enviar:", infoCompleta);

    try {
      const response = await fetch(
        "https://backbetter-production.up.railway.app/empleados/crear",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(infoCompleta),
        }
      );
      const responseData = await response.json();
      
      if (response.ok) {
        onNext();
      } else {
        console.error("Error en la respuesta del servidor:", responseData);
        alert("Error al registrar el afiliado. Por favor, intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar los datos a la API:", error);
      alert("Error de conexión. Por favor, verifique su conexión a internet.");
    }
  };

  return (
    <div className="pt-3 text-center rounded-lg shadow-md overflow-hidden">
      <div className="container ml-auto mr-auto">
        <div className="bg-white px-12">
          <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
            Formulario de contraseña del afiliado
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
            <div className="mb-4 relative">
              <label
                htmlFor="vchPassword"
                className="block text-gray-800 text-left font-bold"
              >
                Contraseña:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="vchPassword"
                placeholder="Ingrese una contraseña"
                {...register("vchPassword", {
                  required: "El campo es requerido",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  maxLength: { value: 16, message: "Máximo 16 caracteres" },
                })}
                onChange={(e) => {
                  dispatch({
                    type: "UPDATE_CONTRASEÑA",
                    payload: e.target.value
                  });
                }}
                className="mt-1 p-2 border rounded-md w-full"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-2 top-9 transform"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              {errors.vchPassword && (
                <span className="text-red-500 text-sm mt-1">
                  *{errors.vchPassword.message}
                </span>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="vchPasswordConf"
                className="block text-gray-800 text-left font-bold"
              >
                Ingresa nuevamente tu contraseña:
              </label>
              <input
                type={showConfirPass ? "text" : "password"}
                id="vchPasswordConf"
                placeholder="Ingresa nuevamente la contraseña"
                {...register("vchPasswordConf", {
                  required: "El campo es requerido",
                  validate: (value) =>
                    value === vchPassword || "Las contraseñas no coinciden",
                })}
                className="mt-1 p-2 border rounded-md w-full"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-2 top-9 transform"
                onClick={() => setShowConfirPass(!showConfirPass)}
              >
                <FontAwesomeIcon icon={showConfirPass ? faEyeSlash : faEye} />
              </button>
              {errors.vchPasswordConf && (
                <span className="text-red-500 text-sm mt-1">
                  *{errors.vchPasswordConf.message}
                </span>
              )}
            </div>

            <PasswordChecklist
              className="text-left"
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "letter",
                "match",
              ]}
              minLength={8}
              value={vchPassword}
              valueAgain={passwordConf}
              onChange={setPasswordChecklistValid}
              messages={{
                minLength: "La contraseña tiene más de 8 caracteres.",
                specialChar: "La contraseña tiene caracteres especiales.",
                number: "La contraseña tiene un número.",
                capital: "La contraseña tiene una letra mayúscula.",
                letter: "La contraseña tiene una letra minúscula.",
                match: "Las contraseñas coinciden.",
              }}
            />
            <br />

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
                  Object.keys(errors).length === 0 &&
                  passwordChecklistValid &&
                  vchPassword &&
                  passwordConf
                    ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
                disabled={
                  !(
                    Object.keys(errors).length === 0 &&
                    passwordChecklistValid &&
                    vchPassword &&
                    passwordConf
                  )
                }
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

export default RContraseña;