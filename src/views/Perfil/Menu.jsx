import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
/* import bcrypt from "bcryptjs"; */
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";

// Función para decodificar JWT
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

function ProfileCard() {
  const [profileData, setProfileData] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { register, handleSubmit, setValue } = useForm();

  // Desencriptar la contraseña
/*   const decryptedPassword = bcrypt.compareSync(
    profileData.vchPassword, // Contraseña encriptada en la base de datos
    "la-contraseña-en-texto-plano" // Contraseña en texto plano
  ); */

  useEffect(() => {
    const fetchProfileData = async (clienteId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/clientes/id/${clienteId}`
        );
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    // Verificar el token al cargar la página
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      setDecodedToken(decoded);
      fetchProfileData(decoded.clienteId);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };
  const handleSave = async () => {
    // Verificar que el campo vchNomCliente no esté vacío
    if (!editedData.vchNomCliente.trim()) {
      alert("El nombre no puede estar vacío");
      return;
    }

    try {
      // Enviar la solicitud al servidor para actualizar el campo
      await fetch(
        `https://backopt-production.up.railway.app/clientes/ids/${decodedToken.clienteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vchNomCliente: editedData.vchNomCliente,
            vchAPaterno: editedData.vchAPaterno,
            vchAMaterno: editedData.vchAMaterno,
            vchCorreo: editedData.vchCorreo,
            vchTelefono: editedData.vchTelefono,
          }),
        }
      );

      // Actualizar el estado con los datos editados
      setProfileData((prevData) => ({
        ...prevData,
        vchNomCliente: editedData.vchNomCliente,
        vchAPaterno: editedData.vchAPaterno,
        vchAMaterno: editedData.vchAMaterno,
        vchCorreo: editedData.vchCorreo,
        vchTelefono: editedData.vchTelefono,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el campo:", error);
    }
  };

  if (!profileData || !decodedToken) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
    <div className="flex flex-col justify-center items-center py-24">
      <Barra/>
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-3">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl text-center font-bold text-navy-700">
            Información General
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full text-center">
          {/* Nombre */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500">
            <p className="text-sm text-gray-600">Nombre</p>
            {isEditing ? (
              <input
                type="text"
                {...register("vchNomCliente")}
                value={editedData.vchNomCliente}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    vchNomCliente: e.target.value,
                  })
                }
              />
            ) : (
              <p className="text-base font-medium text-navy-700">
                {profileData.vchNomCliente}
              </p>
            )}
          </div>
          {/* Apellidos */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500">
            <p className="text-sm text-gray-600">Apellidos</p>
            {isEditing ? (
              <input
                type="text"
                value={`${editedData.vchAPaterno} ${editedData.vchAMaterno}`}
                onChange={(e) => {
                  const [apellidoPaterno, apellidoMaterno] =
                    e.target.value.split(" ");
                  setEditedData({
                    ...editedData,
                    vchAPaterno: apellidoPaterno,
                    vchAMaterno: apellidoMaterno,
                  });
                }}
              />
            ) : (
              <p className="text-base font-medium text-navy-700">{`${profileData.vchAPaterno} ${profileData.vchAMaterno}`}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500">
            <p className="text-sm text-gray-600">Correo electrónico:</p>
            {isEditing ? (
              <input
                type="email"
                value={editedData.vchCorreo}
                onChange={(e) =>
                  setEditedData({ ...editedData, vchCorreo: e.target.value })
                }
              />
            ) : (
              <p className="text-base font-medium text-navy-700">
                {profileData.vchCorreo}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500">
            <p className="text-sm text-gray-600">Número de teléfono:</p>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.vchTelefono}
                onChange={(e) =>
                  setEditedData({ ...editedData, vchTelefono: e.target.value })
                }
              />
            ) : (
              <p className="text-base font-medium text-navy-700">
                {profileData.vchTelefono}
              </p>
            )}
          </div>
{/*           <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500">
            <p className="text-sm text-gray-600">Contraseña:</p>
            {isEditing ? (
              <input
                type="password"
                value={editedData.vchPassword}
                onChange={(e) =>
                  setEditedData({ ...editedData, vchPassword: e.target.value })
                }
              />
            ) : (
              <p className="text-base font-medium text-navy-700">
                {decryptedPassword
                  ? "la-contraseña-en-texto-plano"
                  : "********"}
              </p>
            )}
          </div> */}
        </div>
      </div>
      {/* Botones */}
      <div className="mt-4">
        {isEditing ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={() => handleSave()}
          >
            Guardar
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={() => handleEdit()}
          >
            Editar
          </button>
        )}
      </div>

    </div>
    <Fot/>
    </div>
  );
}

export default ProfileCard;
