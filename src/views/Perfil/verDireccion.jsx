import React, { useState, useEffect } from "react";
import Fot from "../../components/Footer";
import Barra from "../../components/Navegacion/barra";
import { API_BASE_URL } from "../../service/apirest";
import { 
  MapPinIcon, 
  PencilSquareIcon, 
  CheckIcon, 
  XMarkIcon,
  HomeIcon,
  BuildingOffice2Icon,
  MapIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

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

function VerEditarDireccion() {
  const [direccioncli, setDireccioncli] = useState({});
  const [editando, setEditando] = useState(false);
  const [userType, setUserType] = useState(null);
  const [clienteId, setClienteId] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.userType);
      setClienteId(decodedToken.clienteId);
    }
  }, []);

  useEffect(() => {
    if (clienteId) {
      setLoading(true);
      fetch(`${API_BASE_URL}/clientes/clientes/${clienteId}/direccion`)
        .then((response) => {
          if (response.status === 404) {
            // No address found, user needs to create one
            setHasAddress(false);
            setEditando(true); // Start in edit mode for new address
            setDireccioncli({
              Estado: "",
              CP: "",
              Municipio: "",
              Colonia: "",
              Calle: "",
              NumExt: "",
              NumInt: "",
              Referencia: ""
            });
            return null;
          }
          if (!response.ok) {
            throw new Error("Error al obtener la dirección del cliente");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setDireccioncli(data);
            setHasAddress(true);
          }
        })
        .catch((error) => {
          console.log("Error fetching address:", error);
          // If there's an error, assume no address exists
          setHasAddress(false);
          setEditando(true);
          setDireccioncli({
            Estado: "",
            CP: "",
            Municipio: "",
            Colonia: "",
            Calle: "",
            NumExt: "",
            NumInt: "",
            Referencia: ""
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [clienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccioncli({ ...direccioncli, [name]: value });
  };

  const guardarCambios = async () => {
    setSaving(true);
    
    // Validation: Check if required fields are filled
    if (!direccioncli.Calle || !direccioncli.NumExt || !direccioncli.Colonia || 
        !direccioncli.Municipio || !direccioncli.Estado || !direccioncli.CP) {
      alert("Por favor, completa todos los campos obligatorios (Calle, Número Exterior, Colonia, Municipio, Estado, Código Postal)");
      setSaving(false);
      return;
    }
    
    console.log("Saving address...", { hasAddress, clienteId, direccioncli });
    
    try {
      let response;
      let url;
      const requestData = {
        Estado: direccioncli.Estado,
        CP: direccioncli.CP,
        Municipio: direccioncli.Municipio,
        Colonia: direccioncli.Colonia,
        Calle: direccioncli.Calle,
        NumExt: direccioncli.NumExt,
        NumInt: direccioncli.NumInt || "",
        Referencia: direccioncli.Referencia || "",
        IdCliente: clienteId,
      };
      
      if (hasAddress) {
        // Update existing address
        const addressId = direccioncli.IdDirec_Client;
        console.log("Updating address with ID:", addressId);
        
        if (!addressId) {
          throw new Error("No se encontró el ID de la dirección");
        }
        
        url = `${API_BASE_URL}/direcciones-clientes/${addressId}`;
        console.log("PUT URL:", url);
        console.log("Request data:", requestData);
        
        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      } else {
        // Create new address
        url = `${API_BASE_URL}/direcciones-clientes/`;
        console.log("POST URL:", url);
        console.log("Request data:", requestData);
        
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
      }

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response error:", errorText);
        throw new Error(`${hasAddress ? "Error al actualizar" : "Error al crear"} la dirección: ${errorText}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      setDireccioncli(data);
      setHasAddress(true);
      setEditando(false);
      
      // Show success message
      alert(hasAddress ? "Dirección actualizada exitosamente" : "Dirección creada exitosamente");
      
    } catch (error) {
      console.error("Error saving address:", error);
      // Show error message to user
      alert(error.message || (hasAddress ? "Error al actualizar la dirección" : "Error al crear la dirección"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Barra />
      <div className="pt-40 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-full ${
                loading ? 'bg-gray-400 animate-pulse' :
                !hasAddress ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                'bg-gradient-to-r from-blue-600 to-cyan-600'
              }`}>
                {loading ? (
                  <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : !hasAddress ? (
                  <PlusIcon className="h-8 w-8 text-white" />
                ) : (
                  <MapPinIcon className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {loading ? "Cargando..." : !hasAddress ? "Agregar Dirección" : "Mi Dirección"}
            </h1>
            <p className="text-gray-600 text-lg">
              {loading ? "Obteniendo información de tu dirección..." :
               !hasAddress ? "Agrega tu dirección principal para recibir tus pedidos" :
               "Gestiona tu dirección de entrega principal"}
            </p>
          </div>

          {!loading && (
            <div className="bg-white overflow-hidden shadow-2xl rounded-2xl border border-gray-100">
              {/* Card Header */}
              <div className={`px-6 py-8 ${
                !hasAddress ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                'bg-gradient-to-r from-blue-600 to-cyan-600'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {!hasAddress ? (
                      <PlusIcon className="h-8 w-8 text-white mr-3" />
                    ) : (
                      <HomeIcon className="h-8 w-8 text-white mr-3" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {!hasAddress ? "Nueva Dirección" : "Dirección Principal"}
                      </h3>
                      <p className={`mt-1 ${
                        !hasAddress ? 'text-orange-100' : 'text-blue-100'
                      }`}>
                        {!hasAddress ? "Completa los datos para agregar tu dirección" :
                         "Esta dirección se usará para tus entregas"}
                      </p>
                    </div>
                  </div>
                  {!editando && hasAddress && (
                    <button
                      onClick={() => setEditando(true)}
                      className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
                    >
                      <PencilSquareIcon className="h-5 w-5 mr-2" />
                      Editar
                    </button>
                  )}
                </div>
              </div>
            {/* Form Content */}
            <div className="p-8">
              {editando ? (
                /* Edit Mode */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Street */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MapIcon className="h-4 w-4 inline mr-2" />
                        Calle
                      </label>
                      <input
                        type="text"
                        name="Calle"
                        value={direccioncli.Calle || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Ingrese el nombre de la calle"
                      />
                    </div>

                    {/* External Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <BuildingOffice2Icon className="h-4 w-4 inline mr-2" />
                        Número Exterior
                      </label>
                      <input
                        type="text"
                        name="NumExt"
                        value={direccioncli.NumExt || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Número exterior"
                      />
                    </div>

                    {/* Internal Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número Interior
                        <span className="text-gray-400 text-xs ml-1">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        name="NumInt"
                        value={direccioncli.NumInt || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Número interior (opcional)"
                      />
                    </div>

                    {/* Neighborhood */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Colonia
                      </label>
                      <input
                        type="text"
                        name="Colonia"
                        value={direccioncli.Colonia || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Nombre de la colonia"
                      />
                    </div>

                    {/* Municipality */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Municipio
                      </label>
                      <input
                        type="text"
                        name="Municipio"
                        value={direccioncli.Municipio || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Nombre del municipio"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="Estado"
                        value={direccioncli.Estado || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Nombre del estado"
                      />
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="CP"
                        value={direccioncli.CP || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Código postal"
                      />
                    </div>

                    {/* Reference */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Referencias
                      </label>
                      <textarea
                        name="Referencia"
                        value={direccioncli.Referencia || ""}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                        placeholder="Referencias adicionales para ubicar la dirección (color de casa, puntos de referencia, etc.)"
                      />
                    </div>
                  </div>
                </div>
              ) : hasAddress ? (
                /* View Mode - Has Address */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Street and Numbers */}
                    <div className="md:col-span-2 bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapIcon className="h-5 w-5 mr-2 text-blue-600" />
                        Dirección Principal
                      </h4>
                      <p className="text-lg text-gray-700">
                        {direccioncli.Calle} {direccioncli.NumExt}
                        {direccioncli.NumInt && `, Interior ${direccioncli.NumInt}`}
                      </p>
                    </div>

                    {/* Location Details */}
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Ubicación</h4>
                      <div className="space-y-2">
                        <p><span className="font-medium">Colonia:</span> {direccioncli.Colonia}</p>
                        <p><span className="font-medium">Municipio:</span> {direccioncli.Municipio}</p>
                        <p><span className="font-medium">Estado:</span> {direccioncli.Estado}</p>
                        <p><span className="font-medium">C.P:</span> {direccioncli.CP}</p>
                      </div>
                    </div>

                    {/* References */}
                    <div className="bg-green-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Referencias</h4>
                      <p className="text-gray-700">
                        {direccioncli.Referencia || "Sin referencias adicionales"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* No Address State */
                <div className="text-center py-12">
                  <ExclamationTriangleIcon className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No tienes una dirección registrada
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Para poder recibir tus pedidos, necesitas agregar una dirección de entrega.
                  </p>
                  <button
                    onClick={() => setEditando(true)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Agregar Dirección
                  </button>
                </div>
              )}
            </div>
            {/* Action Buttons */}
            {editando && (
              <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
                  {hasAddress && (
                    <button
                      onClick={() => setEditando(false)}
                      disabled={saving}
                      className="flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XMarkIcon className="h-5 w-5 mr-2" />
                      Cancelar
                    </button>
                  )}
                  <button
                    onClick={guardarCambios}
                    disabled={saving}
                    className={`flex items-center justify-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-xl text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      hasAddress 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-green-500'
                        : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:ring-orange-500'
                    }`}
                  >
                    {saving ? (
                      <>
                        <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {hasAddress ? 'Actualizando...' : 'Guardando...'}
                      </>
                    ) : (
                      <>
                        {hasAddress ? (
                          <CheckIcon className="h-5 w-5 mr-2" />
                        ) : (
                          <PlusIcon className="h-5 w-5 mr-2" />
                        )}
                        {hasAddress ? 'Guardar Cambios' : 'Crear Dirección'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
}

export default VerEditarDireccion;
