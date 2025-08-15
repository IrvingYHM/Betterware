import { useEffect, useState, useMemo } from "react";
import Fot from "../../components/Footer";
import { useCart } from "./hooks/useCart";
import Barra from '../../components/Navegacion/barra';
import { API_ENDPOINTS, API_BASE_URL } from "../../service/apirest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Carrito = () => {
  const { cart, clearCart } = useCart();
  const [detalleCarrito, setDetalleCarrito] = useState([]);
  const [userType, setUserType] = useState(null);
  const [clienteId, setClienteId] = useState("");
  const [rules, setRules] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);

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
      const fetchDetalleCarrito = async () => {
        try {
          const response = await fetch(
            `${API_ENDPOINTS.carrito.obtenerUno}?userId=${clienteId}`
          );
          if (!response.ok) {
            throw new Error("Error al obtener el detalle del carrito");
          }
          const data = await response.json();
          setDetalleCarrito(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDetalleCarrito();
    }
  }, [clienteId]);

  // Agrupar productos duplicados usando useMemo para evitar recálculo infinito
  const detalleCarritoAgrupado = useMemo(() => {
    const productosAgrupados = detalleCarrito.reduce((acc, detalle) => {
      const key = detalle.producto.IdProducto;
      if (acc[key]) {
        acc[key].Cantidad += detalle.Cantidad;
        acc[key].SubTotal += detalle.SubTotal;
      } else {
        acc[key] = { ...detalle };
      }
      return acc;
    }, {});
    return Object.values(productosAgrupados);
  }, [detalleCarrito]);

  // Calcular total usando useMemo
  const total = useMemo(() => {
    return detalleCarritoAgrupado.reduce(
      (total, detalle) => total + (detalle.Precio * detalle.Cantidad), 
      0
    );
  }, [detalleCarritoAgrupado]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('association_rules.json'); // O la URL de tu API
        const data = await response.json();
        setRules(data);
        console.log('Reglas cargadas:', data); // Añade este log
      } catch (error) {
        console.error('Error al cargar las reglas:', error);
      }
    };

    fetchRules();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/productos_better/Productos`);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const productosEnCarrito = detalleCarritoAgrupado.map(detalle => detalle.producto.vchNombreProducto.trim().replace(/\s+/g, ' '));
    console.log('Productos en carrito:', productosEnCarrito);

    if (productosEnCarrito.length && rules.length) {
      const newRecommendations = rules
        .filter(rule => rule.antecedents.some(antecedent => productosEnCarrito.includes(antecedent.trim().replace(/\s+/g, ' '))))
        .flatMap(rule => rule.consequents);

      // Filtrar recomendaciones duplicadas
      const uniqueRecommendations = [...new Set(newRecommendations)];

      // Obtener solo los primeros 5 elementos
      const limitedRecommendations = uniqueRecommendations.slice(0, 7);

      setRecomendaciones(limitedRecommendations);
    }
  }, [detalleCarritoAgrupado, rules]);

  useEffect(() => {
    console.log('Recomendaciones:', recomendaciones); // Añade este log
  }, [recomendaciones]);

  // Obtener productos recomendados con detalles adicionales
  const recomendacionesConDetalles = recomendaciones.map((recomendacion) => {
    const producto = productos.find(p => p.vchNombreProducto.trim().replace(/\s+/g, ' ') === recomendacion);
    return producto ? { ...producto, vchNombreProducto: recomendacion } : null;
  }).filter(Boolean);

  const handlePayment = async () => {
    try {
      // Realizar la compra en MercadoPago
      const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: detalleCarritoAgrupado.map((detalle) => ({
            title: detalle.producto.vchNombreProducto,
            unit_price: detalle.Precio,
            currency_id: "MXN",
            quantity: detalle.Cantidad,
          })),
          clienteId: clienteId, // Incluye clienteId en el cuerpo de la solicitud
        }),
      });
      const orderData = await orderResponse.json();
      window.location.href = orderData.init_point;

      // Espera hasta que la compra esté completa y después crea el pedido
      const pedidoResponse = await fetch(`${API_BASE_URL}/pedido/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          IdCliente: clienteId,
          TotalPe: total,
          IdMetodoPago: 1,
          IdEstado_Pedido: 1,
          IdEstado_Envio: 1,
          IdDireccion: 1,
          IdPaqueteria: 1,
          IdEmpleado: 1,
        }),
      });

      if (!pedidoResponse.ok) {
        throw new Error("Error al crear el pedido");
      }

      const pedidoData = await pedidoResponse.json();
      const IdPedido = pedidoData.pedido.IdPedido;

      // Crear los detalles del pedido
      for (const detalle of detalleCarritoAgrupado) {
        await fetch(`${API_BASE_URL}/detallePedido/crear`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdProducto: detalle.producto.IdProducto,
            Precio: detalle.Precio,
            Descripcion: detalle.producto.vchDescripcion,
            SubTotal: detalle.SubTotal,
            Cantidad: detalle.Cantidad,
            IdPedido: IdPedido,
          }),
        });
      }

      // Enviar la información de la compra al backend
      const updateResponse = await fetch(
        `${API_BASE_URL}/productos_better/actualizar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ detalleCarrito: detalleCarritoAgrupado }),
        }
      );
      const updateData = await updateResponse.json();
      console.log(updateData);

      // Llamar a la función para eliminar el carrito después de la compra
      await eliminarCarritoDespuesCompra();

    } catch (error) {
      console.error(error);
    }
  };

  const eliminarCarritoDespuesCompra = async () => {
    try {
      // Eliminar el carrito del cliente después de la compra
      const eliminarCarritoResponse = await fetch(
        API_ENDPOINTS.carrito.eliminarCompleto,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ IdCliente: clienteId }),
        }
      );
      const eliminarCarritoData = await eliminarCarritoResponse.json();
      console.log(eliminarCarritoData);
    } catch (error) {
      console.error("Error al eliminar el carrito:", error);
    }
  };

  // Función para actualizar cantidad de un producto
  const actualizarCantidad = async (idDetalle, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      await eliminarProducto(idDetalle);
      return;
    }

    const cantidadActual = detalleCarrito.find(d => d.IdDetalle_Carrito === idDetalle)?.Cantidad || 1;
    const accion = nuevaCantidad > cantidadActual ? 'aumentar' : 'disminuir';
    const diferencia = Math.abs(nuevaCantidad - cantidadActual);

    setUpdatingItem(idDetalle);
    try {
      // Hacer múltiples llamadas si la diferencia es mayor a 1
      for (let i = 0; i < diferencia; i++) {
        const response = await fetch(`${API_ENDPOINTS.carrito.detalleModificarCantidad}/${idDetalle}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accion }),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar la cantidad");
        }
      }

      // Actualizar el estado local
      setDetalleCarrito(prev => 
        prev.map(detalle => 
          detalle.IdDetalle_Carrito === idDetalle 
            ? { ...detalle, Cantidad: nuevaCantidad, SubTotal: detalle.Precio * nuevaCantidad }
            : detalle
        )
      );
      
      toast.success("Cantidad actualizada");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la cantidad");
    } finally {
      setUpdatingItem(null);
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = async (idDetalle) => {
    console.log('Intentando eliminar producto con ID:', idDetalle);
    setUpdatingItem(idDetalle);
    
    try {
      // Usar el endpoint correcto del backend
      const response = await fetch(`${API_ENDPOINTS.carrito.detalleEliminarProducto}/${idDetalle}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      console.log('Response status:', response?.status);

      if (!response.ok) {
        const errorData = await response?.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData?.message || `Error ${response?.status}: Error al eliminar producto`);
      }

      const responseData = await response.json().catch(() => null);
      console.log('Response data:', responseData);

      // Actualizar el estado local
      setDetalleCarrito(prev => 
        prev.filter(detalle => detalle.IdDetalle_Carrito !== idDetalle)
      );
      
      toast.success("Producto eliminado del carrito");
    } catch (error) {
      console.error('Error completo al eliminar producto:', error);
      toast.error(error.message || "Error al eliminar el producto");
    } finally {
      setUpdatingItem(null);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 mt-36">
      <Barra />
      <h1 className="mb-10 text-center text-2xl font-bold">
        Carrito de compras
      </h1>
      <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0 mb-10">
        <div className="w-full md:w-2/3">
          {detalleCarritoAgrupado.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <a
                href="/productos"
                className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Ir a productos
              </a>
            </div>
          ) : (
            detalleCarritoAgrupado.map((detalle) => (
              <div
                key={detalle.IdDetalle_Carrito}
                className="mb-6 rounded-lg bg-white p-6 shadow-md"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                  <div className="flex items-center mb-4 md:mb-0">
                    <img
                      src={detalle.producto.vchNomImagen}
                      alt={detalle.producto.vchNombreProducto}
                      className="w-20 md:w-32 h-20 md:h-32 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-900 mb-2">
                        {detalle.producto.vchNombreProducto}
                      </h2>
                      <p className="text-xs text-gray-700 mb-2">
                        {detalle.Descripcion}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        Precio unitario: ${detalle.Precio}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarProducto(detalle.IdDetalle_Carrito)}
                    disabled={updatingItem === detalle.IdDetalle_Carrito}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 text-sm"
                  >
                    {updatingItem === detalle.IdDetalle_Carrito
                      ? "Eliminando..."
                      : "Eliminar"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        actualizarCantidad(
                          detalle.IdDetalle_Carrito,
                          detalle.Cantidad - 1
                        )
                      }
                      disabled={
                        updatingItem === detalle.IdDetalle_Carrito ||
                        detalle.Cantidad <= 1
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      className="h-8 w-16 border bg-white text-center text-sm outline-none rounded"
                      type="number"
                      value={detalle.Cantidad}
                      min="1"
                      onChange={(e) => {
                        const nuevaCantidad = parseInt(e.target.value) || 1;
                        if (nuevaCantidad !== detalle.Cantidad) {
                          actualizarCantidad(
                            detalle.IdDetalle_Carrito,
                            nuevaCantidad
                          );
                        }
                      }}
                      disabled={updatingItem === detalle.IdDetalle_Carrito}
                    />
                    <button
                      onClick={() =>
                        actualizarCantidad(
                          detalle.IdDetalle_Carrito,
                          detalle.Cantidad + 1
                        )
                      }
                      disabled={updatingItem === detalle.IdDetalle_Carrito}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-bold">
                      Subtotal: $
                      {(detalle.Precio * detalle.Cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full md:w-1/3">
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold mb-4">Detalle de tu compra</h2>
            <h3 className="text-gray-700 font-semibold mb-2">
              Resumen de productos
            </h3>
            {detalleCarritoAgrupado.map((detalle) => (
              <div
                key={detalle.IdDetalle_Carrito}
                className="flex justify-between mb-2 text-sm"
              >
                <div className="flex-1">
                  <p className="truncate pr-2">
                    {detalle.producto.vchNombreProducto}
                  </p>
                  <p className="text-xs text-gray-500">
                    Cantidad: {detalle.Cantidad} x ${detalle.Precio}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(detalle.Precio * detalle.Cantidad).toFixed(2)}
                </p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">${total.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/checkout-pedido'}
              disabled={detalleCarritoAgrupado.length === 0}
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {`Realizar Pedido - $${total.toFixed(2)}`}
            </button>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start">
                <span className="text-yellow-500 mr-2">💡</span>
                <div className="text-xs text-yellow-800">
                  <p className="font-medium mb-1">Pago contra entrega:</p>
                  <p>• El admin se contactará contigo para confirmar tu pedido</p>
                  <p>• Realizarás el depósito cuando te lo indique</p>
                  <p>• Tu pedido será enviado una vez confirmado el pago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Fot />
      
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
};

export default Carrito;
