// Configuración centralizada de la API
export const API_BASE_URL = "https://backbetter-production.up.railway.app";
export const Apiurl = `${API_BASE_URL}/auth/login`;

// Endpoints específicos
export const API_ENDPOINTS = {
  productos: {
    getById: `${API_BASE_URL}/productos_better/productosId`,
    getByIdAlt: `${API_BASE_URL}/productos_better/Productos`, // Para modificar producto
    getAll: `${API_BASE_URL}/productos_better/Productos`,
    getAllAdmin: `${API_BASE_URL}/productos_better/ProductosAll`,
    search: `${API_BASE_URL}/productos_better/Buscar_productos`,
    filter: `${API_BASE_URL}/productos_better/filtro_producto`,
    update: `${API_BASE_URL}/productos_better/actualizar`,
    create: `${API_BASE_URL}/productos_better/crear`,
  },
  carrito: {
    crear: `${API_BASE_URL}/Carrito/crearCarrito`,
    detalles: `${API_BASE_URL}/DetalleCarrito/crear`,
    obtenerUno: `${API_BASE_URL}/Carrito/uno`,
    eliminarCompleto: `${API_BASE_URL}/Carrito/eliminarCa`,
    // Endpoints correctos según backend
    detalleModificarCantidad: `${API_BASE_URL}/DetalleCarrito/modificarCantidad`,
    detalleEliminarProducto: `${API_BASE_URL}/DetalleCarrito/eliminar/producto`,
    detalleEliminarCarrito: `${API_BASE_URL}/DetalleCarrito/eliminar`,
  },
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  catalogos: {
    getAll: `${API_BASE_URL}/catalogos/`,
    create: `${API_BASE_URL}/catalogos/agregar-catalogo`,
    delete: `${API_BASE_URL}/catalogos/eliminar`,
  },
  categorias: {
    getAll: `${API_BASE_URL}/categoria/`,
    getById: `${API_BASE_URL}/categoria`,
    checkProducts: `${API_BASE_URL}/categoria/check-products`,
    create: `${API_BASE_URL}/categoria/agregar-categoria`,
    update: `${API_BASE_URL}/categoria/actualizar-categoria`,
    delete: `${API_BASE_URL}/categoria/eliminar-categoria`,
  },
};