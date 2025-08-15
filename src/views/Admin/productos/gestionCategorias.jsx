import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../service/apirest";
import { ChevronLeft, Plus, Edit2, Trash2, Tags, Save, X } from "lucide-react";

function GestionCategorias({ onBack, integratedMode = false }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriasConProductos, setCategoriasConProductos] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoriaParaEliminar, setCategoriaParaEliminar] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    NombreCategoria: ""
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.categorias.getAll);
      if (!response.ok) {
        throw new Error("Error al cargar categorías");
      }
      const data = await response.json();
      setCategorias(data);

      // Cargar información de productos para cada categoría
      const productInfo = {};
      for (const categoria of data) {
        try {
          const checkResponse = await fetch(`${API_ENDPOINTS.categorias.checkProducts}/${categoria.IdCategoria}`);
          if (checkResponse.ok) {
            const checkData = await checkResponse.json();
            productInfo[categoria.IdCategoria] = {
              productCount: checkData.productCount,
              canDelete: checkData.canDelete
            };
          }
        } catch (error) {
          console.error(`Error al verificar productos para categoría ${categoria.IdCategoria}:`, error);
          productInfo[categoria.IdCategoria] = { productCount: 0, canDelete: true };
        }
      }
      setCategoriasConProductos(productInfo);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevenir múltiples envíos
    if (submitting) {
      return;
    }
    
    if (!formData.NombreCategoria.trim()) {
      toast.error("El nombre de la categoría es requerido");
      return;
    }

    try {
      setSubmitting(true);
      
      const url = editingCategory 
        ? `${API_ENDPOINTS.categorias.update}/${editingCategory.IdCategoria}`
        : API_ENDPOINTS.categorias.create;
      
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al procesar la solicitud");
      }

      toast.success(
        editingCategory 
          ? "Categoría actualizada correctamente" 
          : "Categoría creada correctamente"
      );
      
      resetForm();
      cargarCategorias();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategory(categoria);
    setFormData({
      NombreCategoria: categoria.NombreCategoria
    });
    setShowAddForm(true);
  };

  // Confirmar eliminación con toast personalizado
  const confirmarEliminacion = async (categoria) => {
    try {
      // Primero verificar si la categoría tiene productos asociados
      const checkResponse = await fetch(`${API_ENDPOINTS.categorias.checkProducts}/${categoria.IdCategoria}`);
      if (!checkResponse.ok) {
        throw new Error("Error al verificar la categoría");
      }

      const checkData = await checkResponse.json();
      
      // Si la categoría tiene productos, mostrar mensaje de error y no continuar
      if (!checkData.canDelete) {
        toast.error(
          <div className="flex flex-col items-center text-center gap-4 p-2">
            {/* Icono de error */}
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            {/* Mensaje de error */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-red-900">No se puede eliminar</h3>
              <p className="text-sm text-gray-700">
                La categoría <span className="font-semibold">"{categoria.NombreCategoria}"</span> tiene
              </p>
              <p className="text-sm font-semibold text-red-800 bg-red-100 px-3 py-1 rounded-lg">
                {checkData.productCount} producto{checkData.productCount !== 1 ? 's' : ''} asociado{checkData.productCount !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-600">
                Primero debes reasignar o eliminar los productos de esta categoría
              </p>
            </div>
            
            {/* Botón de cerrar */}
            <div className="flex justify-center w-full">
              <button
                onClick={() => toast.dismiss()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Entendido
              </button>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
            className: "toast-confirmation"
          }
        );
        return;
      }

      // Si la categoría está vacía, mostrar confirmación de eliminación
      setCategoriaParaEliminar(categoria);
      toast.info(
        <div className="flex flex-col items-center text-center gap-4 p-2">
          {/* Icono de advertencia */}
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          {/* Mensaje principal */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900">¿Estás seguro?</h3>
            <p className="text-sm text-gray-600">
              ¿Realmente deseas eliminar la categoría
            </p>
            <p className="text-sm font-semibold text-gray-800 bg-purple-100 px-3 py-1 rounded-lg">
              "{categoria.NombreCategoria}"
            </p>
            <p className="text-xs text-orange-600">
              Esta acción no se puede deshacer
            </p>
          </div>
          
          {/* Botones centrados */}
          <div className="flex gap-3 justify-center w-full">
            <button
              onClick={() => {
                eliminarCategoria(categoria.IdCategoria, categoria.NombreCategoria);
                toast.dismiss();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Sí, Eliminar
            </button>
            <button
              onClick={() => {
                setCategoriaParaEliminar(null);
                toast.dismiss();
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            >
              Cancelar
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
          className: "toast-confirmation"
        }
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al verificar la categoría");
    }
  };

  const eliminarCategoria = async (id, nombreCategoria) => {
    try {
      // Proceder directamente con la eliminación (la verificación ya se hizo en confirmarEliminacion)
      const deleteResponse = await fetch(`${API_ENDPOINTS.categorias.delete}/${id}`, {
        method: "DELETE",
      });

      const deleteData = await deleteResponse.json();

      if (!deleteResponse.ok) {
        // Si el servidor rechaza la eliminación, mostrar el mensaje específico
        toast.error(deleteData.message || "Error al eliminar la categoría");
        return;
      }

      toast.success("Categoría eliminada correctamente");
      cargarCategorias();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la solicitud");
    }
  };

  // Mantener la función original por compatibilidad (pero ya no se usa)
  const handleDelete = async (id, nombreCategoria) => {
    // Esta función ya no se usa, pero la mantengo por si acaso
    return;
  };

  const resetForm = () => {
    setFormData({ NombreCategoria: "" });
    setEditingCategory(null);
    setShowAddForm(false);
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-6 mb-10">
      {/* Header */}
      <div className="mb-6">
        {integratedMode && (
          <button
            onClick={onBack}
            className="flex items-center text-xl font-bold text-teal-600 hover:text-teal-700 mb-6 transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
            Regresar
          </button>
        )}
      </div>
      <div className="max-w-6xl bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <Tags className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestión de Categorías
              </h1>
              <p className="text-gray-600">
                Total de categorías: {categorias.length}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            disabled={submitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              submitting 
                ? "bg-purple-400 text-white cursor-not-allowed" 
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <Plus className="w-5 h-5" />
            Nueva Categoría
          </button>
        </div>
      </div>

      {/* Formulario de agregar/editar */}
      {showAddForm && (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
            </h2>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Categoría
              </label>
              <input
                type="text"
                value={formData.NombreCategoria}
                onChange={(e) =>
                  setFormData({ ...formData, NombreCategoria: e.target.value })
                }
                disabled={submitting}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                  submitting 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-gray-50"
                }`}
                placeholder="Ej: Electrónicos, Ropa, Hogar..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  submitting 
                    ? "bg-purple-400 cursor-not-allowed" 
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white`}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {editingCategory ? "Actualizando..." : "Creando..."}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingCategory ? "Actualizar" : "Crear"} Categoría
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={submitting}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  submitting 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de categorías */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {categorias.length === 0 ? (
          <div className="text-center py-16">
            <Tags className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No hay categorías
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza creando tu primera categoría para organizar tus
              productos.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Crear Primera Categoría
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Nombre de la Categoría
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Productos
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categorias.map((categoria) => {
                  const productInfo = categoriasConProductos[
                    categoria.IdCategoria
                  ] || { productCount: 0, canDelete: true };
                  return (
                    <tr
                      key={categoria.IdCategoria}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        #{categoria.IdCategoria}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                            <Tags className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {categoria.NombreCategoria}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              productInfo.productCount === 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {productInfo.productCount} producto
                            {productInfo.productCount !== 1 ? "s" : ""}
                          </span>
                          {productInfo.productCount === 0 && (
                            <span className="text-xs text-green-600 font-medium">
                              ✓ Eliminable
                            </span>
                          )}
                          {productInfo.productCount > 0 && (
                            <span className="text-xs text-red-600 font-medium">
                              ✕ Protegida
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(categoria)}
                            disabled={submitting}
                            className={`p-2 rounded-lg transition-colors ${
                              submitting 
                                ? "text-gray-400 cursor-not-allowed bg-gray-100" 
                                : "text-blue-600 hover:bg-blue-50"
                            }`}
                            title={submitting ? "Operación en curso..." : "Editar categoría"}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => confirmarEliminacion(categoria)}
                            disabled={!productInfo.canDelete || submitting}
                            className={`p-2 rounded-lg transition-colors ${
                              !productInfo.canDelete || submitting
                                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                                : "text-red-600 hover:bg-red-50"
                            }`}
                            title={
                              submitting
                                ? "Operación en curso..."
                                : productInfo.canDelete
                                ? "Eliminar categoría"
                                : "No se puede eliminar: tiene productos asociados"
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        className="toast-container"
      />
      
      <style jsx>{`
        .toast-confirmation .Toastify__toast {
          background: white;
          color: #374151;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          min-width: 400px;
          padding: 20px;
        }
        .toast-confirmation .Toastify__toast-body {
          padding: 0;
          margin: 0;
        }
        .toast-confirmation .Toastify__toast-icon {
          display: none;
        }
        @media (max-width: 480px) {
          .toast-confirmation .Toastify__toast {
            min-width: 320px;
            margin: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}

GestionCategorias.propTypes = {
  onBack: PropTypes.func,
  integratedMode: PropTypes.bool,
};

export default GestionCategorias;