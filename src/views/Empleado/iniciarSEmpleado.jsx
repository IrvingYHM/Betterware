import Fot from "../../components/Footer";
import { useState, useEffect } from "react";
import imagen from "../../img/pai.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"; // Importa ToastContainer
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

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
        const response = await fetch("http://localhost:3000/empleados/login", {
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
      {/* Agrega el ToastContainer aquí */}
      <div className="flex-center my-8">
        <div className="w-full h-22 flex items-start flex-col sm:flex-row">
          <div className="sm:block relative w-1/2  h-full  flex flex-col">
            <div className="absolute top-[25%] left-[10%] flex flex-col"></div>
            <div className=" w-full sm:w-1/2 sm:flex-shrink-0 hidden md:block relative">
              <img
                src={imagen}
                alt=""
                className="w-full h-full object-cover sm:rounded-lg"
              />
            </div>
          </div>
          <div className="w-full sm:w-1.5 bg-white  p-6 sm:p-20">
            <div className="max-w-[550px]">
              <div className="text-center mb-4">
                <div className="sm:hidden relative w-full"></div>
                <div className="sm:hidden relative w-full">
                  <img
                    src={imagen}
                    alt=""
                    className="w-full h-full object-cover sm:rounded-lg p-4"
                  />
                </div>
                <h3 className="text-3xl font-semibold"> Login Empleado</h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col">
                  <label htmlFor="vchCorreo" className="input-text">
                    Correo Electronico:
                  </label>
                  <input
                    type="email"
                    placeholder="Correo electronico"
                    {...register("vchCorreo", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "El formato no es correcto",
                      },
                    })}
                    className={`w-full text-black py-2 my-2 bg-transparent border-b focus:border-2 outline-none focus:outline-none ${getInputBorderClasses(
                      errors.vchCorreo
                    )}`}
                    onFocus={(e) => {
                      e.target.classList.add("focus:border-blue-800"); // Agrega una clase para resaltar el campo cuando está enfocado
                    }}
                    onBlur={(e) => {
                      e.target.classList.remove("focus:border-blue-800"); // Remueve la clase cuando pierde el foco
                    }}

                  />
                  {errors.vchCorreo && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.vchCorreo.message}
                    </span>
                  )}
                  <label htmlFor="vchPassword" className="input-text">
                    Contraseña:
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="current-password"
                      type={mostrarContra ? "text" : "password"}
                      placeholder="Contraseña"
                      {...register("vchPassword", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 8,
                          message:
                            "La contraseña debe tener al menos 8 caracteres",
                        },
                      })}
                      className={`w-full text-black py-2 my-2 bg-transparent border-b focus:border-2 outline-none focus:outline-none ${getInputBorderClasses(
                        errors.vchPassword
                      )}`}
                      onFocus={(e) => {
                        e.target.classList.add("focus:border-blue-800"); // Agrega una clase para resaltar el campo cuando está enfocado
                      }}
                      onBlur={(e) => {
                        e.target.classList.remove("focus:border-blue-800"); // Remueve la clase cuando pierde el foco
                      }}
                    />
                    {errors.vchPassword && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.vchPassword.message}
                      </span>
                    )}
                    <FontAwesomeIcon
                      icon={mostrarContra ? faEye : faEyeSlash}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setMostrarContra(!mostrarContra)}
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="w-full flex items-center">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <p className="text-sm">Recordar contraseña</p>
                  </div>
{/*                   <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                    <Link to="/Recuperar">¿Olvidaste tu contraseña?</Link>
                  </p> */}
                </div>
                  <div className="justify-center items-center w-full flex flex-col my-5">
                    <div className="recaptcha">
                      <ReCAPTCHA
                        ref={captcha}
                        sitekey="6LfZCW4pAAAAANILT3VzQtWcH_w6JIX1hzNyOBeF"
                        onChange={onChange}
                      />
                  </div>
                  <button
                    className=" mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md p-4 text-center flex items-center justify-center"
                    type="submit"
                    disabled={intentosFallidos >= 3}
                  >
                    {intentosFallidos >= 3
                      ? "Botón inhabilitado por el máximo de intentos"
                      : "Ingresar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
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
