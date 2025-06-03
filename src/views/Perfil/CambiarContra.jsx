import React, { useState, useEffect } from "react";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function App() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clienteId, setClienteId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setClienteId(decodedToken.clienteId);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/clientes/clientes/${clienteId}/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ password: currentPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Contraseña verificada correctamente", {
          onClose: () => {
            setTimeout(() => {
              navigate("/CambiarContra");
            }, 600);
          },
        });
      } else {
        toast.error(data.message || "Error al verificar la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error en la solicitud");
    }
  };

  return (
    <div>
      <Barra />
      <div className="flex flex-col items-center justify-center min-h-screen py-32 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Verificar Contraseña Actual</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">
              Contraseña Actual
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 pr-12 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className=" text-xl translate-y-3"
              />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Verificar Contraseña
          </button>
        </form>
      </div>
      <Fot />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        className="toast-container"
      />

    </div>
  );
}

export default App;
