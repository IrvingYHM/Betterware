import React, { useState, useEffect } from "react";
import Fot from "../../components/Footer";
import Barra from "../../components/Navegacion/barra";

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
      fetch(`http://localhost:3000/clientes/clientes/${clienteId}/direccion`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener la dirección del cliente");
          }
          return response.json();
        })
        .then((data) => {
          setDireccioncli(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [clienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccioncli({ ...direccioncli, [name]: value });
  };

  const guardarCambios = () => {
    fetch(`http://localhost:3000/clientes/actualizar/${clienteId}/direccion`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(direccioncli),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar la dirección del cliente");
        }
        return response.json();
      })
      .then((data) => {
        setDireccioncli(data);
        setEditando(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Barra />
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-bold text-center leading-6 ">
                Dirección del Cliente
              </h3>
              <p className="text-center text-sm ">
                Información actual de la dirección del cliente.
              </p>
            </div>
            <div className="border-t border-gray-200 text-center">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold ">Calle y Número</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {editando ? (
                      <input
                        type="text"
                        name="Calle"
                        value={direccioncli.Calle || ""}
                        onChange={handleChange}
                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      <span>{direccioncli.Calle}</span>
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold">Colonia</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {editando ? (
                      <input
                        type="text"
                        name="Colonia"
                        value={direccioncli.Colonia || ""}
                        onChange={handleChange}
                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      <span>{direccioncli.Colonia}</span>
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold">Ciudad</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {editando ? (
                      <input
                        type="text"
                        name="Municipio"
                        value={direccioncli.Municipio || ""}
                        onChange={handleChange}
                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      <span>{direccioncli.Municipio}</span>
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold">Estado</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {editando ? (
                      <input
                        type="text"
                        name="Estado"
                        value={direccioncli.Estado || ""}
                        onChange={handleChange}
                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      <span>{direccioncli.Estado}</span>
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold">Código Postal</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {editando ? (
                      <input
                        type="text"
                        name="CP"
                        value={direccioncli.CP || ""}
                        onChange={handleChange}
                        className="block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    ) : (
                      <span>{direccioncli.CP}</span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {editando ? (
                <>
                  <button
                    onClick={guardarCambios}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditando(false)}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditando(true)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
}

export default VerEditarDireccion;
