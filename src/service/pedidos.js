import { API_BASE_URL } from './apirest';

export const PEDIDOS_ENDPOINTS = {
  crear: `${API_BASE_URL}/pedido/agregar`,
  obtenerPorCliente: `${API_BASE_URL}/pedido/cliente`,
  obtenerTodos: `${API_BASE_URL}/pedido/todos`,
  actualizar: `${API_BASE_URL}/pedido/actualizar`,
  detallePedido: {
    crear: `${API_BASE_URL}/detallePedido/crear`,
    obtenerPorPedido: `${API_BASE_URL}/detallePedido/pedido`
  },
  direcciones: {
    obtenerCliente: `${API_BASE_URL}/clientes/clientes`,
    actualizar: `${API_BASE_URL}/clientes/actualizar`
  }
};

export const ADMIN_CONTACT = {
  nombre: "Administrador",
  telefono: "Pendiente de configurar",
  whatsapp: "#",
  cuentaBanco: {
    banco: "Por definir",
    cuenta: "Por definir", 
    clabe: "Por definir",
    titular: "Por definir"
  },
  email: "pendiente@configurar.com"
};

export const ESTADOS_PEDIDO = {
  PENDIENTE: 1,
  CONFIRMADO: 2,
  PREPARACION: 3,
  EN_CAMINO: 4,
  ENTREGADO: 5,
  CANCELADO: 6
};

export const ESTADOS_ENVIO = {
  PENDIENTE: 1,
  PROCESANDO: 2,
  EN_TRANSITO: 3,
  ENTREGADO: 4,
  DEVUELTO: 5
};

export const crearPedido = async (pedidoData) => {
  try {
    const response = await fetch(PEDIDOS_ENDPOINTS.crear, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedidoData)
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

export const obtenerPedidosCliente = async (clienteId) => {
  try {
    const response = await fetch(`${PEDIDOS_ENDPOINTS.obtenerPorCliente}/${clienteId}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener pedidos del cliente:', error);
    throw error;
  }
};

export const formatearEstadoPedido = (estadoId) => {
  const estados = {
    1: { texto: 'Pendiente', color: 'yellow', icono: '⏳' },
    2: { texto: 'Confirmado', color: 'blue', icono: '✅' },
    3: { texto: 'En Preparación', color: 'orange', icono: '📦' },
    4: { texto: 'En Camino', color: 'purple', icono: '🚚' },
    5: { texto: 'Entregado', color: 'green', icono: '✅' },
    6: { texto: 'Cancelado', color: 'red', icono: '❌' }
  };
  
  return estados[estadoId] || { texto: 'Desconocido', color: 'gray', icono: '❓' };
};

export const generarNumeroPedido = () => {
  const fecha = new Date();
  const timestamp = fecha.getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `BW${timestamp}${random}`;
};

export const obtenerDireccionCliente = async (clienteId) => {
  try {
    const response = await fetch(`${PEDIDOS_ENDPOINTS.direcciones.obtenerCliente}/${clienteId}/direccion`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener dirección del cliente:', error);
    throw error;
  }
};

export const obtenerDatosCliente = async (clienteId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clientes/id/${clienteId}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos del cliente:', error);
    throw error;
  }
};

export const actualizarCostoEnvioPedido = async (pedidoId, costoEnvio, notas = '') => {
  try {
    const response = await fetch(`${PEDIDOS_ENDPOINTS.actualizar}/${pedidoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CostoEnvio: costoEnvio,
        NotasEnvio: notas
      })
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar costo de envío:', error);
    throw error;
  }
};