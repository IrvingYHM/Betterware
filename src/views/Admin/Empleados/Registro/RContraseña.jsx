import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordChecklist from "react-password-checklist";

const RContraseña = ({ onNext, onBack, onValidationChange, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [isValid, setIsValid] = useState(false); // Estado local de validación
  const [showPassword, setShowPassword] = useState(false); // Estado local para mostrar/ocultar la contraseña
  const [showConfirPass, setShowConfirPass] = useState(false);

  const [vchPassword, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [passwordChecklistValid, setPasswordChecklistValid] = useState(false); // Estado local para validar el checklist de la contraseña

  const handleInfoChange = (info) => {
    dispatch({ type: "UPDATE_CONTRASEÑA", payload: info });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(); // Agrega 'watch' a la desestructuración

  const onSubmit = async (data) => {
    // Verificar si hay errores en los campos
    if (Object.keys(errors).length === 0) {
      const infoCompleta = { ...state.info, ...state.correo, ...data };
      handleInfoChange(infoCompleta);
      try {
        /* console.log("contraseña", vchPassword) */
        const response = await enviarDatosAPI(
          infoCompleta,
          state.correo // Agrega el correo al llamar a la función enviarDatosAPI
        );
        /* console.log("Respuesta de la API:", response); */
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
    const isValid = Object.keys(errors).length === 0 && passwordChecklistValid; // Verificar la validez del checklist de la contraseña
    setIsValid(isValid);
    // Verificar si onValidationChange está definida antes de llamarla
    if (typeof onValidationChange === "function") {
      onValidationChange(isValid);
    }
  }, [errors, onValidationChange, passwordChecklistValid]);

  const enviarDatosAPI = async (info, correo) => {
    try {
      /* console.log("Datos a enviar al backend:", info);
      console.log(vchPassword) */
      const response = await fetch("https://backopt-production.up.railway.app/empleados/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...info,
          contrasena: info.vchPassword, // Agrega la contraseña al cuerpo de la solicitud
          correo: correo, // Agrega el correo al cuerpo de la solicitud
        }),
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

  /*   const enviarDatosAPI = async () => {
    try {
      const response = await fetch("http://localhost:3000/clientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          infoPersonal: state.infoPersonal,
          correo: state.correo,
          contrasena: password, // Agrega la contraseña al cuerpo de la solicitud
          confirContra: passwordConf, // Agrega la confirmación de la contraseña al cuerpo de la solicitud
        }),
      });
      const data = await response.json();
      console.log("Respuesta de la API:", data);
    } catch (error) {
      console.error("Error al enviar los datos a la API:", error);
    }
  }; */

  return (
    <>
      {/*       <pre>{JSON.stringify(state, null, 2)}</pre> */}

      <div className="pt-24 text-center rounded-lg shadow-md overflow-hidden">
        <div className="container ml-auto mr-auto">
          <div className="bg-white px-12">
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario de contraseña del contacto
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1"
            >
              <div className="mb-4 relative">
                <label
                  htmlFor="contraseña"
                  className="block text-gray-800 text-left font-bold"
                >
                  Contraseña:
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="vchPassword"
                  name="vchPassword" // Cambia el atributo 'name' al nuevo nombre
                  placeholder="Ingrese una contraseña"
                  value={vchPassword}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInfoChange({ vchPassword: e.target.value });
                  }}
                  required
                  maxLength={16}
                  className="mt-1 p-2 border rounded-md w-full"
                />

                <button
                  type="button"
                  className="absolute right-2 top-5/8 transform"
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
                  className="block text-gray-800 text-left font-bold"
                >
                  Ingresa nuevamente tu contraseña:
                </label>
                <input
                  type={showConfirPass ? "text" : "password"}
                  id="confirContra"
                  name="vchPasswordConf" // Cambia el atributo 'name' al nuevo nombre
                  placeholder="Ingresa nuevamente la contraseña"
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  required
                  maxLength={16}
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <button
                  type="button"
                  className="absolute right-2 top-5/8 transform"
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
                onChange={(isValid) => setPasswordChecklistValid(isValid)} // Actualizar el estado de validación del checklist
                messages={{
                  minLength: "La contraseña tiene más de 8 caracteres.",
                  specialChar: "La contraseña tiene caracteres especiales.",
                  number: "La contraseña tiene un número.",
                  capital: "La contraseña tiene una letra mayúscula.",
                  letter: "La contraseña tiene una letra minúsculas.",
                  match: "Las contraseñas coinciden.",
                }}
              />
              <br />

              {/* Pregunta secreta y respuesta */}
              <div className="mb-4">
                <label
                  htmlFor="question"
                  className="block text-gray-800 text-left font-bold"
                >
                  Selecciona una pregunta secreta:
                </label>
                <select
                  id="vchPreguntaSecreta"
                  required
                  onChange={(e) =>
                    handleInfoChange({ vchPreguntaSecreta: e.target.value })
                  }
                  {...register("vchPreguntaSecreta")}
                  defaultValue=""
                  className="mt-1 p-2 border rounded-md w-full"
                >
                  <option disabled value="">
                    Selecciona la pregunta secreta
                  </option>
                  <option value="¿Cuál es tu color favorito?">
                    ¿Cuál es tu color favorito?
                  </option>
                  <option value="¿Cuál es el nombre de tu mejor amigo?">
                    ¿Cuál es el nombre de tu mejor amigo?
                  </option>
                  <option value="¿Cuál es el nombre de tu mascota?">
                    ¿Cuál es el nombre de tu mascota?
                  </option>
                  <option value="¿Cuál es tu comida favorita?">
                    ¿Cuál es tu comida favorita?
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="answer"
                  className="block text-gray-800 text-left font-bold"
                >
                  Respuesta:
                </label>
                <input
                  type="text"
                  id="vchRespuestaSecreta"
                  required
                  onChange={(e) =>
                    handleInfoChange({ vchRespuestaSecreta: e.target.value })
                  }
                  {...register("vchRespuestaSecreta")}
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Ingresa tu respuesta"
                />
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
                  disabled={!isValid} // Deshabilitar el botón si no es válido
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

export default RContraseña;
