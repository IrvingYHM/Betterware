import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonProductCard from "../../../components/SkeletonProductCard";
import { API_ENDPOINTS } from "../../../service/apirest";
import { Search, Filter, Package, Tags, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import CreateProductForm from "./agregarProductos";
import ModificarProducto from "./modificarProducto";
import GestionCategorias from "./gestionCategorias";

function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [listaCategoria, setListaCategoria] = useState([]);
  const [mostrarDescripcion, setMostrarDescripcion] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [editingProductId, setEditingProductId] = useState(null);
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 40;

  useEffect(() => {
    // Cargar productos
    fetch(API_ENDPOINTS.productos.getAllAdmin)
      .then((response) => {
        if (!response.ok) {
          toast.error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        const categoriasMap = {};
        data.forEach((producto) => {
          categoriasMap[producto.IdCategoria] =
            producto.categoria.NombreCategoria;
        });
        setCategorias(categoriasMap);
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
      
    // Cargar categorías para el filtro
    fetch("https://backbetter-production.up.railway.app/categoria/")
      .then((response) => response.json())
      .then((data) => {
        setListaCategoria(data);
      })
      .catch((error) => {
        console.log("Error al cargar categorías:", error);
      });
  }, []);

  // Reset página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const toggleDescripcion = (id) => {
    setMostrarDescripcion((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtrar productos por búsqueda y categoría/promociones
  const filteredProductos = productos.filter((producto) => {
    const matchesSearch = producto.vchNombreProducto
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      producto.vchDescripcion
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === "") {
      matchesCategory = true; // Todas las categorías
    } else if (selectedCategory === "promociones") {
      matchesCategory = producto.EnOferta && producto.PrecioOferta; // Solo promociones
    } else {
      matchesCategory = producto.IdCategoria.toString() === selectedCategory; // Categoría específica
    }
    
    return matchesSearch && matchesCategory;
  });

  // Lógica de paginación
  const totalProducts = filteredProductos.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProductos = filteredProductos.slice(startIndex, endIndex);


  // Funciones de navegación de páginas
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const handleAddProduct = () => {
    setCurrentView("add");
  };

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setCurrentView("edit");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setEditingProductId(null);
    // Recargar productos después de agregar/editar
    fetch(API_ENDPOINTS.productos.getAllAdmin)
      .then((response) => response.json())
      .then((data) => {
        const categoriasMap = {};
        data.forEach((producto) => {
          categoriasMap[producto.IdCategoria] =
            producto.categoria.NombreCategoria;
        });
        setCategorias(categoriasMap);
        setProductos(data);
      })
      .catch((error) => console.log(error));
  };

  if (currentView === "add") {
    return (
      <CreateProductForm
        integratedMode={true}
        onBack={handleBackToList}
        showNavBar={false}
      />
    );
  }

  if (currentView === "edit" && editingProductId) {
    return (
      <ModificarProducto
        integratedMode={true}
        onBack={handleBackToList}
        showNavBar={false}
        productId={editingProductId}
      />
    );
  }

  if (currentView === "categories") {
    return (
      <GestionCategorias
        integratedMode={true}
        onBack={handleBackToList}
        showNavBar={false}
      />
    );
  }

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 mt-6 mb-10">
        {/* Barra de búsqueda y filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
                <p className="text-gray-600">
                  Total: {productos.length} | Filtrados: {totalProducts} | 
                  Mostrando: {startIndex + 1}-{Math.min(endIndex, totalProducts)} | 
                  Página: {currentPage} de {totalPages}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setCurrentView("categories")}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
              Gestionar Categorías
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Barra de búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            {/* Filtro por categoría */}
            <div className="md:w-64">
              <div className="relative">
                <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                >
                  <option value="">Todas las categorías</option>
                  <option value="promociones">Promociones</option>
                  {listaCategoria.map((categoria) => (
                    <option key={categoria.IdCategoria} value={categoria.IdCategoria}>
                      {categoria.NombreCategoria}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Botón limpiar filtros */}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
                className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Limpiar
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {totalProducts === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron productos</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || selectedCategory 
                      ? "Intenta con otros términos de búsqueda o cambia el filtro de categoría"
                      : "No hay productos disponibles en este momento"
                    }
                  </p>
                  {(searchTerm || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("");
                        setCurrentPage(1);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-row flex-wrap justify-center gap-6">
                {paginatedProductos.map((producto) => (
                <div
                  key={producto.IdProducto}
                  className="w-72 bg-white rounded-xl shadow-md flex flex-col justify-between"
                >
                  <div className="relative h-72 w-full rounded-t-xl overflow-hidden">
                    <img
                      src={producto.vchNomImagen}
                      alt={producto.vchNombreProducto}
                      className="h-full w-full object-cover"
                    />

                    {/* Texto AGOTADO en diagonal */}
                    {producto.Existencias <= 0 && (
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-red-600 bg-opacity-75 text-white font-bold text-3xl px-6 py-1
                      rotate-[-45deg] pointer-events-none select-none"
                        style={{ userSelect: "none" }}
                      >
                        AGOTADO
                      </div>
                    )}
                  </div>

                  <div className="flex-grow p-5 -mt-4">
                    <h2 className="font-bold mb-1">
                      {producto.vchNombreProducto}
                    </h2>
                    {/* Descripción oculta/desplegable */}
                    {mostrarDescripcion[producto.IdProducto] ? (
                      <p className="text-sm mb-1">{producto.vchDescripcion}</p>
                    ) : (
                      <button
                        onClick={() => toggleDescripcion(producto.IdProducto)}
                        className="text-sm font-semibold text-blue-600 underline mb-1"
                      >
                        Ver descripción
                      </button>
                    )}

                    {mostrarDescripcion[producto.IdProducto] && (
                      <button
                        onClick={() => toggleDescripcion(producto.IdProducto)}
                        className="text-sm font-semibold text-blue-600 underline mb-1"
                      >
                        Ocultar descripción
                      </button>
                    )}
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Precio:</span>{" "}
                      {producto.EnOferta && producto.PrecioOferta ? (
                        <>
                          <span className="line-through text-red-500 mr-2">
                            ${producto.Precio}
                          </span>
                          <span className="text-green-600 font-bold">
                            ${producto.PrecioOferta}
                          </span>
                        </>
                      ) : (
                        `$${producto.Precio}`
                      )}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Existencias:</span>{" "}
                      {producto.Existencias > 0
                        ? producto.Existencias
                        : "Agotado"}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-semibold">Categoría:</span>{" "}
                      {categorias[producto.IdCategoria] || "Sin categoría"}
                    </p>
                    {producto.empleado && (
                      <p className="text-sm italic">
                        <span className="font-semibold">Agregado por:</span>{" "}
                        {`${producto.empleado.vchNombre} ${producto.empleado.vchAPaterno} ${producto.empleado.vchAMaterno}`}
                      </p>
                    )}

                    <div className="mt-4">
                      <button
                        onClick={() => handleEditProduct(producto.IdProducto)}
                        className="inline-block font-semibold bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}

            {/* Componente de Paginación Mejorado */}
            {totalPages > 1 && (
              <div className="mt-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Información de resultados */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Package className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">
                          {startIndex + 1} - {Math.min(endIndex, totalProducts)} de {totalProducts}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                        <span>Página</span>
                        <span className="font-semibold text-blue-600">{currentPage}</span>
                        <span>de</span>
                        <span className="font-semibold text-blue-600">{totalPages}</span>
                      </div>
                    </div>
                    
                    {/* Controles de navegación */}
                    <div className="flex items-center justify-center space-x-2">
                      {/* Botón Primera Página */}
                      {currentPage > 2 && (
                        <button
                          onClick={() => goToPage(1)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 shadow-sm transition-all duration-200"
                          title="Primera página"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <ChevronLeft className="w-4 h-4 -ml-2" />
                        </button>
                      )}

                      {/* Botón Anterior */}
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md'
                        }`}
                        title="Página anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Números de página */}
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum = i + 1;
                          if (totalPages > 5) {
                            if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                          }

                          if (pageNum < 1 || pageNum > totalPages) return null;

                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                                pageNum === currentPage
                                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                                  : 'bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md hover:scale-105'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Botón Siguiente */}
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            : 'bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 shadow-sm hover:shadow-md'
                        }`}
                        title="Página siguiente"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Botón Última Página */}
                      {currentPage < totalPages - 1 && (
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 shadow-sm transition-all duration-200"
                          title="Última página"
                        >
                          <ChevronRight className="w-4 h-4" />
                          <ChevronRight className="w-4 h-4 -ml-2" />
                        </button>
                      )}
                    </div>

                    {/* Selector rápido de página (solo móvil) */}
                    <div className="lg:hidden w-full max-w-xs">
                      <select
                        value={currentPage}
                        onChange={(e) => goToPage(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-white border border-blue-200 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                      >
                        {Array.from({ length: totalPages }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Página {i + 1} de {totalPages}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botón flotante visible siempre */}
            <button
              onClick={handleAddProduct}
              className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              + Nuevo producto
            </button>
          </>
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
    </>
  );  
}

export default ProductsList;
