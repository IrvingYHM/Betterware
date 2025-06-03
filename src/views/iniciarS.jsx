import Fot from "../components/Footer";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"; // Importa ToastContainer
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { AuthContext } from "./AuthContext";
/* import Barra from '../components/barra' */
import Barra from "../components/Navegacion/barra";


function App() {
  
  const [mostrarContra, setMostrarContra] = useState(false);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [token, setToken] = useState(null); // Estado para almacenar el token
/*   const [usuarioLogueado, setUsuarioLogueado] = useState(false); */
  const [usuarioLogueado, setUsuarioLogueado] = useState(false); // Estado para almacenar si el usuario está logueado
 /*  const [haIniciadoSesion, setHaIniciadoSesion] = useState(false); // Nueva variable de estado
 */

 const { login } = useContext(AuthContext);

console.log(login);

  
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsuarioLogueado(true);
/*       setHaIniciadoSesion(true); */
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const captcha = useRef(null);

  const onChange = () => {
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot");

    }
  };
  const onSubmit = async (data) => {
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot");
      try {
        const response = await fetch(
          "https://backopt-production.up.railway.app/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          const receivedToken = responseData.token;
          setToken(receivedToken);
          console.log(receivedToken);
          toast.success("Inicio de sesión exitoso");

          // Guardar el estado de usuario logueado en el localStorage
          localStorage.setItem("token", receivedToken);
          login();
          setUsuarioLogueado(true);
 /*          setHaIniciadoSesion(false); // Actualiza el estado de haIniciadoSesion


 */

          setTimeout(() => {
            window.location.href = "/inicio";
          }, 4000);
        } else {
          setIntentosFallidos(intentosFallidos + 1);
          if (intentosFallidos >= 2) {
            toast.error("Máximo de intentos fallidos alcanzado");
          } else {
            toast.error("Error al iniciar sesión");
          }
        }
      } catch (error) {
        toast.error("Error de red, vuelvalo a intentar más tarde:", error);
        setTimeout(() => {
          window.location.href = "/500";
        }, 4000);
      }
    } else {
      toast.error("Por favor acepta el captcha");
    }
  };

// Función para cerrar sesión del cliente
/* const handleLogout = () => {
  localStorage.removeItem("token");
  setUsuarioLogueado(false);
}; */


  const getInputBorderClasses = (error) => {
    if (error) {
      return "border-red-500 focus:border-red-700";
    } else {
      return "border-green-500 focus:border-green-900";
    }
  };

  return (
    <>
      <Barra />
      {/* Agrega el ToastContainer aquí */}
      <div className="min-h-screen flex justify-center items-center mt-14">
        <div className="rounded-2xl shadow-xl w-full max-w-md pb-8 text-center">
          <h2 className="bg-blue-100 rounded-t-2xl py-8 text-2xl font-bold">¡Hola!</h2>
          <p className="text-2xl font-semibold my-6">Inicio de Sesión</p>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-left px-8"
          >
            {/* Correo */}
            <div>
              <label
                htmlFor="vchCorreo"
                className="block text-sm font-medium"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electronico"
                {...register("vchCorreo", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Correo inválido",
                  },
                })}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.vchCorreo ? "border-red-500" : "border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.vchCorreo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vchCorreo.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="vchPassword"
                className="block text-sm font-medium"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={mostrarContra ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  {...register("vchPassword", {
                    required: "Este campo es requerido",
                    minLength: {
                      value: 8,
                      message: "Mínimo 8 caracteres",
                    },
                  })}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.vchPassword ? "border-red-500" : "border-green-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
                <FontAwesomeIcon
                  icon={mostrarContra ? faEye : faEyeSlash}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  onClick={() => setMostrarContra(!mostrarContra)}
                />
              </div>
              {errors.vchPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vchPassword.message}
                </p>
              )}
            </div>

            {/* Recordar contraseña */}
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-sm">Recordar contraseña</span>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={captcha}
                sitekey="6LfZCW4pAAAAANILT3VzQtWcH_w6JIX1hzNyOBeF"
                onChange={onChange}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={intentosFallidos >= 3}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full transition duration-200"
            >
              {intentosFallidos >= 3
                ? "Botón inhabilitado por el máximo de intentos"
                : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
      
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Fot />
    </>
  );
}

export default App;
