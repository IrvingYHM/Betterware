import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerPedidosCliente } from '../service/pedidos';

const PedidosContext = createContext();

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos debe ser usado dentro de un PedidosProvider');
  }
  return context;
};

export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoActual, setPedidoActual] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarPedidosCliente = async (clienteId) => {
    if (!clienteId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const pedidosData = await obtenerPedidosCliente(clienteId);
      setPedidos(pedidosData);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      setError('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const agregarPedido = (nuevoPedido) => {
    setPedidos(prevPedidos => [nuevoPedido, ...prevPedidos]);
    setPedidoActual(nuevoPedido);
  };

  const actualizarEstadoPedido = (pedidoId, nuevoEstado) => {
    setPedidos(prevPedidos => 
      prevPedidos.map(pedido => 
        pedido.IdPedido === pedidoId 
          ? { ...pedido, IdEstado_Pedido: nuevoEstado }
          : pedido
      )
    );
  };

  const limpiarPedidoActual = () => {
    setPedidoActual(null);
  };

  const value = {
    pedidos,
    pedidoActual,
    loading,
    error,
    cargarPedidosCliente,
    agregarPedido,
    actualizarEstadoPedido,
    limpiarPedidoActual,
    setPedidoActual
  };

  return (
    <PedidosContext.Provider value={value}>
      {children}
    </PedidosContext.Provider>
  );
};