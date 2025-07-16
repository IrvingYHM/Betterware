import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { UserPlus, Edit3, Trash2, Plus, Search, Filter, Badge, Phone, Mail, IdCard } from "lucide-react";
import Loader from "../../../components/Loader";

function Afiliados() {
  const [empleado, setEmpleado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Betterware color palette matching dashboard
  const colors = {
    primary: '#00B4D8',
    secondary: '#0077B6', 
    accent: '#90E0EF',
    light: '#CAF0F8',
    dark: '#03045E',
    success: '#06FFA5',
    warning: '#FFB700',
    danger: '#FF006E'
  };

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch(
          "https://backbetter-production.up.railway.app/empleados/empleado"
        );
        if (!response.ok) {
          toast.error("Error al obtener los afiliados");
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
        toast.error("Error de conexión al servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  // Filter employees based on search term
  const filteredEmpleados = empleado.filter(emp =>
    `${emp.vchNombre} ${emp.vchAPaterno} ${emp.vchAMaterno}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    emp.vchCorreo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.vchTelefono.includes(searchTerm) ||
    emp.vchCURP.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.TipoEmp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle employee deactivation
  const handleDeactivate = (empleadoId) => {
    if (!window.confirm('¿Estás seguro de que deseas dar de baja a este afiliado?')) {
      return;
    }
    
    fetch(
      `https://backbetter-production.up.railway.app/empleados/empleado/${empleadoId}/baja`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al dar de baja al afiliado");
          throw new Error('Failed to deactivate');
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Afiliado dado de baja con éxito");
        // Refresh the list
        setEmpleado(prev => prev.map(emp => 
          emp.intClvEmpleado === empleadoId 
            ? { ...emp, EstadoEmp: 'Inactivo' }
            : emp
        ));
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al dar de baja al afiliado");
      });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'aceptado': return 'bg-green-100 text-green-800';
      case 'rechazado': return 'bg-red-100 text-red-800';
      case 'en espera': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get employee type color
  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'administrador': return 'bg-blue-100 text-blue-800';
      case 'asociado': return 'bg-purple-100 text-purple-800';
      case 'gerente': return 'bg-indigo-100 text-indigo-800';
      case 'vendedor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader mensaje="Cargando información de los afiliados..." />
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
                    background: `linear-gradient(135deg, ${colors.danger}, ${colors.secondary})`,
                  }}
                >
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Red de Afiliados</h1>
                  <p className="text-gray-600">
                    Total de afiliados registrados: {empleado.length}
                  </p>
                </div>
              </div>

              <Link
                to="/AgEmpleado"
                className="flex items-center px-4 py-2 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.success}, ${colors.primary})`,
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Agregar Afiliado
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo, teléfono, CURP o tipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Affiliates Table Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  style={{
                    background: `linear-gradient(135deg, ${colors.danger}, ${colors.secondary})`,
                  }}
                >
                  <tr className="text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Afiliado
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      CURP
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Tipo usuario
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
                  {filteredEmpleados.map((empleado, index) => (
                    <tr
                      key={empleado.intClvEmpleado}
                      className={`transition-colors duration-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 ${
                        index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                          #{empleado.intClvEmpleado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                            style={{
                              background: `linear-gradient(135deg, ${colors.danger}, ${colors.primary})`,
                            }}
                          >
                            {empleado.vchNombre.charAt(0)}
                            {empleado.vchAPaterno.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {`${empleado.vchNombre} ${empleado.vchAPaterno} ${empleado.vchAMaterno}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm mb-1">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {empleado.vchCorreo}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {empleado.vchTelefono}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-naranja-100">
                          <IdCard className="w-4 h-4 mr-1" />
                          {empleado.vchCURP}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                            empleado.TipoEmp
                          )}`}
                        >
                          <Badge className="w-3 h-3 mr-1" />
                          {empleado.TipoEmp}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            empleado.EstadoEmp
                          )}`}
                        >
                          {empleado.EstadoEmp}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Link
                            to={`/editarEmpleado/${empleado.intClvEmpleado}`}
                            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                            }}
                          >
                            <Edit3
                              className="w-4 h-4"
                              style={{ color: colors.primary }}
                            />
                          </Link>
                          <button
                            onClick={() =>
                              handleDeactivate(empleado.intClvEmpleado)
                            }
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

            {filteredEmpleados.length === 0 && (
              <div className="text-center py-12">
                <UserPlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {searchTerm
                    ? "No se encontraron afiliados con esos criterios"
                    : "No hay afiliados registrados"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
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

export default Afiliados;
