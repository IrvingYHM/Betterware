import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Users, Edit3, Trash2, Plus, Search, Filter, Phone, Mail, } from "lucide-react";
import Loader from "../../../components/Loader";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Betterware color palette matching dashboard
  const colors = {
    primary: "#00B4D8",
    secondary: "#0077B6",
    accent: "#90E0EF",
    light: "#CAF0F8",
    dark: "#03045E",
    success: "#06FFA5",
    warning: "#FFB700",
    danger: "#FF006E",
  };

  useEffect(() => {
    fetch("https://backbetter-production.up.railway.app/clientes")
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al obtener los clientes");
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error de conexión al servidor");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter clients based on search term
  const filteredClientes = clientes.filter(
    (cliente) =>
      `${cliente.vchNomCliente} ${cliente.vchAPaterno} ${cliente.vchAMaterno}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      cliente.vchCorreo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.vchTelefono.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader mensaje="Cargando información de los clientes..." />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.warning}, ${colors.secondary})`,
                  }}
                >
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Base de Clientes
                  </h1>
                  <p className="text-gray-600">
                    Total de clientes registrados: {clientes.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo o teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Clients Table Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  }}
                >
                  <tr className="text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Fecha de Nacimiento
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClientes.map((cliente, index) => (
                    <tr
                      key={cliente.intClvCliente}
                      className={`transition-colors duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 ${
                        index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          #{cliente.intClvCliente}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                            style={{
                              background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                            }}
                          >
                            {cliente.vchNomCliente.charAt(0)}
                            {cliente.vchAPaterno.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {`${cliente.vchNomCliente} ${cliente.vchAPaterno} ${cliente.vchAMaterno}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm mb-1">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {cliente.vchCorreo}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {cliente.vchTelefono}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(cliente.dtFechaNacimiento).toLocaleDateString(
                          "es-MX"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            cliente.intentosLogin <= 2
                              ? "bg-green-100 text-green-800"
                              : cliente.intentosLogin <= 4
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {cliente.intentosLogin} intentos
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                            }}
                          >
                            <Edit3
                              className="w-4 h-4"
                              style={{ color: colors.primary }}
                            />
                          </button>
                          <button
                            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${colors.danger}20, #ff6b9d20)`,
                            }}
                          >
                            <Trash2
                              className="w-4 h-4"
                              style={{ color: colors.danger }}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredClientes.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron clientes con esos criterios"
                    : "No hay clientes registrados"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
        className="toast-container"
      />
    </div>
  );
}
export default Clientes;
