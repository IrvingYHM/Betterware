import { useEffect, useState } from "react";
import Fot from "../../components/Footer";
import { useCart } from "./hooks/useCart";
import Barra from '../../components/Navegacion/barra';

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
  const [total, setTotal] = useState("");
  const [rules, setRules] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);

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
            `https://backopt-production.up.railway.app/Carrito/uno?userId=${clienteId}`
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

  useEffect(() => {
    const subtotal = detalleCarrito.reduce(
      (total, detalle) => total + detalle.SubTotal,
      0
    );
    setTotal(subtotal);
  }, [detalleCarrito]);

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
        const response = await fetch('https://backopt-production.up.railway.app/productos/Productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const productosEnCarrito = detalleCarrito.map(detalle => detalle.producto.vchNombreProducto.trim().replace(/\s+/g, ' '));
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
  }, [detalleCarrito, rules]);

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
      const orderResponse = await fetch("https://backopt-production.up.railway.app/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: detalleCarrito.map((detalle) => ({
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
      const pedidoResponse = await fetch("https://backopt-production.up.railway.app/pedido/agregar", {
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
      for (const detalle of detalleCarrito) {
        await fetch("https://backopt-production.up.railway.app/detallePedido/crear", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            IdProducto: detalle.producto.IdProducto,
            IdGraduacion: detalle.IdGraduacion,
            IdTratamiento: detalle.IdTratamiento,
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
        "https://backopt-production.up.railway.app/productos/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ detalleCarrito }),
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
        "https://backopt-production.up.railway.app/Carrito/eliminarCa",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const eliminarCarritoData = await eliminarCarritoResponse.json();
      console.log(eliminarCarritoData);
    } catch (error) {
      console.error("Error al eliminar el carrito:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Barra />
      <h1 className="mb-10 mt-8 text-center text-2xl font-bold">
        Carrito de compras
      </h1>
      <div className="mx-auto max-w-7xl px-6 md:flex md:space-x-6 xl:px-0">
        <div className="w-full md:w-2/3">
          {detalleCarrito.map((detalle) => (
            <div
              key={detalle.IdDetalle_Carrito}
              className="mb-6 rounded-lg bg-white p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={detalle.producto.vchNomImagen}
                  alt={detalle.producto.vchNombreProducto}
                  className="w-20 md:w-40 rounded-lg"
                />
                <div className="mx-7 ">
                  <h2 className="text-lg font-bold text-gray-900 ">
                    {detalle.producto.vchNombreProducto}
                  </h2>
                  <p className="text-xs text-gray-700 ">
                    {detalle.Descripcion}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center border-gray-100">
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="number"
                    value={detalle.Cantidad}
                    min="1"
                    readOnly
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">${detalle.Precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3">
          <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold mb-4">Detalle de tu compra</h2>
            <h3 className="text-gray-700 font-semibold mb-2">
              Productos SubTotal
            </h3>
            {detalleCarrito.map((detalle) => (
              <div
                key={detalle.IdDetalle_Carrito}
                className="flex justify-between mb-2"
              >
                <p>{detalle.producto.vchNombreProducto}</p>
                <p>${detalle.SubTotal}</p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">${total}</p>
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="mt-6 mb-8 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-center mt-10 mb-6">
          Recomendaciones
        </h2>
        <div className="flex flex-wrap justify-center">
          {recomendacionesConDetalles.length ? (
            recomendacionesConDetalles.map((producto) => (
              <div className="flex items-center flex-col m-2 max-w-5xl w-52">
                <div
                  key={producto.IdProducto}
                  className="mb-4 rounded-lg bg-white p-6 shadow-md"
                >
                  <img
                    src={producto.vchNomImagen}
                    alt={producto.vchNombreProducto}
                    className="w-36 h-20 object-cover rounded-lg shadow-md"
                  />
                  <h3 className="mt-2 text-lg font-semibold">
                    {producto.vchNombreProducto}
                  </h3>
                  <p className="text-gray-600">${producto.Precio}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay recomendaciones disponibles.</p>
          )}
        </div>
      </div>
      <Fot />
    </div>
  );
};

export default Carrito;
