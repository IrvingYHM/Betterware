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
    
    if (!formData.NombreCategoria.trim()) {
      toast.error("El nombre de la categoría es requerido");
      return;
    }

    try {
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
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategory(categoria);
    setFormData({
      NombreCategoria: categoria.NombreCategoria
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id, nombreCategoria) => {
    try {
      // Primero verificar si la categoría tiene productos asociados
      const checkResponse = await fetch(`${API_ENDPOINTS.categorias.checkProducts}/${id}`);
      if (!checkResponse.ok) {
        throw new Error("Error al verificar la categoría");
      }

      const checkData = await checkResponse.json();
      
      // Si la categoría tiene productos, no permitir eliminarla
      if (!checkData.canDelete) {
        toast.error(`No se puede eliminar la categoría "${nombreCategoria}" porque tiene ${checkData.productCount} producto(s) asociado(s). Primero debes reasignar o eliminar los productos.`);
        return;
      }

      // Solo pedir confirmación si la categoría está vacía
      const confirmMessage = `¿Estás seguro de que quieres eliminar la categoría "${nombreCategoria}"?`;
      if (!window.confirm(confirmMessage)) {
        return;
      }

      // Proceder con la eliminación
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

  const resetForm = () => {
    setFormData({ NombreCategoria: "" });
    setEditingCategory(null);
    setShowAddForm(false);
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
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Ej: Electrónicos, Ropa, Hogar..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                {editingCategory ? "Actualizar" : "Crear"} Categoría
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300"
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
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar categoría"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(
                                categoria.IdCategoria,
                                categoria.NombreCategoria
                              )
                            }
                            disabled={!productInfo.canDelete}
                            className={`p-2 rounded-lg transition-colors ${
                              productInfo.canDelete
                                ? "text-red-600 hover:bg-red-50"
                                : "text-gray-400 cursor-not-allowed bg-gray-100"
                            }`}
                            title={
                              productInfo.canDelete
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
    </div>
  );
}

GestionCategorias.propTypes = {
  onBack: PropTypes.func,
  integratedMode: PropTypes.bool,
};

export default GestionCategorias;