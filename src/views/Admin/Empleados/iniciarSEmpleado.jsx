import Fot from "../../../components/Footer";
import { useState, useEffect } from "react";
import imagen from "../../../img/user/user_girl.png";
import logo from "../../../img/betterware.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"; // Importa ToastContainer
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import Barra from "../../../components/Navegacion/barra";

function App() {
  const [mostrarContra, setMostrarContra] = useState(false);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [token, setToken] = useState(null); // Estado para almacenar el token
/*   const [usuarioLogueado, setUsuarioLogueado] = useState(false); */
  const [usuarioLogueado, setUsuarioLogueado] = useState(false); // Estado para almacenar si el usuario está logueado

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsuarioLogueado(true);
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
        const response = await fetch("https://backopt-production.up.railway.app/empleados/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          const receivedToken = responseData.token;
          setToken(receivedToken);
          console.log(receivedToken);
          toast.success("Inicio de sesión exitoso");

          // Guardar el estado de usuario logueado en el localStorage
          localStorage.setItem("token", receivedToken);
          setUsuarioLogueado(true);




          setTimeout(() => {
            window.location.href = "/inicioAd";
          }, 4000);
        } else {
          setIntentosFallidos(intentosFallidos + 1);
          if (intentosFallidos >= 2) {
            toast.error("Máximo de intentos fallidos alcanzado");
          } else {
            toast.error("Error al iniciar sesión correo/contraseña incorrecta");
          }
        }
      } catch (error) {
        toast.error("Error de red, vuelvalo a intentar más tarde:", error);
      }
    } else {
      toast.error("Por favor acepta el captcha");
    }
  };

  // Función para cerrar sesión del empleado
const handleLogout = () => {
  localStorage.removeItem("token");
  setUsuarioLogueado(false);
};

  const getInputBorderClasses = (error) => {
    if (error) {
      return "border-red-500 focus:border-red-700";
    } else {
      return "border-green-500 focus:border-green-900";
    }
  };

  return (
    <>
      {/* <Barra /> */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#00aec7] via-[#45b9d2] to-[#87c3db] px-4">
        <img
          src={logo}
          alt="Perfil"
          className="my-8"
        />

        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 mb-16">
          <div className="flex justify-center mb-4">
            <img
              src={imagen}
              alt="Perfil"
              className="w-36 h-36 rounded-full shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-1">¡Hola!</h2>
          <p className="text-center text-2xl font-bold mb-6">
            Ingresa a tu cuenta
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Correo electrónico</label>
              <input
                type="email"
                placeholder="Escribe tu usuario"
                {...register("vchCorreo", {
                  required: "Este campo es requerido",
                })}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${getInputBorderClasses(
                  errors.vchCorreo
                )}`}
              />
              {errors.vchCorreo && (
                <span className="text-sm text-red-500">
                  {errors.vchCorreo.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Contraseña</label>
              <div className="relative">
                <input
                  type={mostrarContra ? "text" : "password"}
                  placeholder="Escribe tu contraseña"
                  {...register("vchPassword", {
                    required: "Este campo es requerido",
                  })}
                  className={`w-full px-4 py-2 border rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 ${getInputBorderClasses(
                    errors.vchPassword
                  )}`}
                />
                <FontAwesomeIcon
                  icon={mostrarContra ? faEye : faEyeSlash}
                  className="absolute right-3 top-2 text-2xl font-bold cursor-pointer"
                  onClick={() => setMostrarContra(!mostrarContra)}
                />
              </div>
              {errors.vchPassword && (
                <span className="text-sm text-red-500">
                  {errors.vchPassword.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Recordar contraseña
              </label>
            </div>

            <div className="recaptcha flex justify-center">
              <ReCAPTCHA
                ref={captcha}
                sitekey="6LfZCW4pAAAAANILT3VzQtWcH_w6JIX1hzNyOBeF"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold"
              disabled={intentosFallidos >= 3}
            >
              {intentosFallidos >= 3
                ? "Botón inhabilitado por intentos fallidos"
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

      {/* <Fot /> */}
    </>
  );
}

export default App;
