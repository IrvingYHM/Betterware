import Fot from "../../components/Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { CartContext } from "./context/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Importa useHistory para manejar la redirección
import Barra from "../../components/Navegacion/barra";


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

const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart(CartContext);
  const [producto, setProducto] = useState({ Existencias: 1 });
  const [existencias, setExistencias] = useState(producto.Existencias);
  const [mostrarGraduacion, setMostrarGraduacion] = useState(false);
  const [mostrarDetalles, setMostrarDetalles] = useState(true);
  const [mostrarTratamiento, setMostrarTratamiento] = useState(false);
  /*   const [lensOption, setLensOption] = useState(""); // Estado para almacenar la opción seleccionada */
  const [selectedLens, setSelectedLens] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [usuarioLogueado, setusuarioLogueado] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario
  /*   const [nombreUsuario, setNombreUsuario] = useState(""); */
  const [clienteId, setClienteId] = useState("");
  const [tratamientos, setTratamientos] = useState([]);
  const [graduaciones, setGraduaciones] = useState([]);
  ///
  const [precioBase, setPrecioBase] = useState(producto.Precio);
  const [precioGraduacion, setPrecioGraduacion] = useState(0);
  const [precioTratamiento, setPrecioTratamiento] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);

  const [rules, setRules] = useState([]);
  const [productos, setProductos] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);

  const carritoApiBaseUrl = "https://backopt-production.up.railway.app/Carrito";
  const detallesCarritoApiBaseUrl = "https://backopt-production.up.railway.app/DetalleCarrito/";

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          "https://backopt-production.up.railway.app/productos/productosId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ IdProducto: id }),
          }
        );
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducto();
  }, [id]);

  const incrementarExistencias = () => {
    if (existencias < producto.Existencias) {
      setExistencias(existencias + 1);
    } else {
      toast.error("No hay suficientes productos en existencia.");
    }
  };

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('../association_rules.json');
        const data = await response.json();
        setRules(data);
        console.log('Reglas cargadas:', data);
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
    if (producto && productos.length && rules.length) {
      const productoNombre = producto.vchNombreProducto?.trim().replace(/\s+/g, ' ') || '';
      console.log('Nombre del producto:', productoNombre);

      const newRecommendations = rules
        .filter(rule => {
          console.log('Antecedents:', rule.antecedents);
          return rule.antecedents.includes(productoNombre);
        })
        .flatMap(rule => rule.consequents);

      console.log('New Recommendations:', newRecommendations);

      const uniqueRecommendations = [...new Set(newRecommendations)];
      const limitedRecommendations = uniqueRecommendations.slice(0, 7);
      const productosRecomendados = productos.filter(p => 
        limitedRecommendations.includes(p.vchNombreProducto.trim().replace(/\s+/g, ' '))
      );

      console.log('Productos Recomendados:', productosRecomendados);

      setRecomendaciones(productosRecomendados);
    }
  }, [producto, productos, rules]);

  useEffect(() => {
    console.log('Recomendaciones:', recomendaciones);
  }, [recomendaciones]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setUserType(decodedToken.userType);
      /*       setNombreUsuario(decodedToken.nombre); */
      setClienteId(decodedToken.clienteId);

      setusuarioLogueado(true);
      console.log(clienteId);
      /*  console.log(nombreUsuario) */
    }
  }, [/* nombreUsuario */ clienteId]);

  useEffect(() => {
    const fetchGraduaciones = async () => {
      try {
        const response = await fetch("https://backopt-production.up.railway.app/graduaciones");
        const data = await response.json();
        setGraduaciones(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGraduaciones();
  }, []);

  useEffect(() => {
    const fetchTratamientos = async () => {
      try {
        const response = await fetch("https://backopt-production.up.railway.app/Tratamiento");
        const data = await response.json();
        setTratamientos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTratamientos();
  }, []);

  const decrementarExistencias = () => {
    if (existencias > 0) {
      setExistencias(existencias - 1);
    }
  };

  useEffect(() => {
    // Convierte los precios a números y verifica si son válidos
    const precioProducto = parseFloat(producto.Precio) || 0;
    const precioGrad = parseFloat(precioGraduacion) || 0;
    const precioTrat = parseFloat(precioTratamiento) || 0;

    // Calcula el precio total sumando el precio base, de graduación y de tratamiento
    const total = precioProducto + precioGrad + precioTrat;

    // Actualiza el estado del precio total
    setPrecioTotal(total);
  }, [producto.Precio, precioGraduacion, precioTratamiento]); // Agrega los estados que afectan al cálculo del precio total como dependencias

  const agregarAlCarrito = async () => {
    if (!usuarioLogueado) {
      toast.error("Aún no has iniciado sesión.");
      return;
    }

    if (!selectedTreatment) {
      toast.error("Por favor, selecciona un tratamiento.");
      return;
    }

    if (existencias > 0) {
      const cantidadAAgregar =
        existencias > producto.Existencias ? producto.Existencias : existencias;
      try {
        const carritoResponse = await fetch(
          `${carritoApiBaseUrl}/crearCarrito`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              IdProducto: producto.IdProducto,
              cantidad: cantidadAAgregar,
              IdCliente: clienteId,
            }),
          }
        );

        if (!carritoResponse.ok) {
          throw new Error("Error al agregar producto al carrito.");
        }

        const carritoData = await carritoResponse.json();
        const IdCarrito = carritoData.IdCarrito;

        const detallesCarritoResponse = await fetch(
          `${detallesCarritoApiBaseUrl}crear`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              IdProducto: producto.IdProducto,
              IdGraduacion: selectedLens,
              IdTratamiento: selectedTreatment,
              Precio: precioTotal,
              Descripcion: producto.vchDescripcion,
              SubTotal: precioTotal * cantidadAAgregar,
              Cantidad: cantidadAAgregar,
              IdCarrito: IdCarrito,
            }),
          }
        );

        if (detallesCarritoResponse.ok) {
          addToCart({
            ...producto,
            quantity: cantidadAAgregar,
            graduacion: selectedLens,
            tratamiento: selectedTreatment,
            precioTotal: producto.Precio + precioGraduacion + precioTratamiento,
          });
          setExistencias(existencias - cantidadAAgregar);
          setSelectedTreatment("");
          toast.success("Producto(s) agregado(s) al carrito.");
          setTimeout(() => {
            navigate("/carrito");
          }, 3000);
        } else {
          throw new Error("Error al agregar producto al carrito.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al agregar producto al carrito.");
      }
    } else {
      toast.error("No hay suficientes productos en existencia.");
    }
  };

  /*   const checkProductInCart = () => {
    return cart.some((item) => item.IdProducto === producto.IdProducto);
  }; */

  /*   // Función para manejar el cambio de opción
  const handleLensOptionChange = (e) => {
    setLensOption(e.target.value);
    console.log(e);
  }; */

  const handleLensOptionChange = (e) => {
    setSelectedLens(e.target.value);
    const graduacionSeleccionada = graduaciones.find(
      (graduacion) => graduacion.IdGraduacion.toString() === e.target.value
    );
    if (graduacionSeleccionada) {
      setPrecioGraduacion(graduacionSeleccionada.Precio);
    } else {
      setPrecioGraduacion(0);
    }
  };

  const handleTreatmentOptionChange = (e) => {
    setSelectedTreatment(e.target.value);
    const tratamientoSeleccionado = tratamientos.find(
      (tratamiento) => tratamiento.IdTratamiento.toString() === e.target.value
    );
    if (tratamientoSeleccionado) {
      setPrecioTratamiento(tratamientoSeleccionado.Precio);
    } else {
      setPrecioTratamiento(0);
    }
  };

  return (
    <div>
      <Barra />
      {mostrarDetalles && (
        <div className="container mx-auto px-6 my-20 mt-36">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-cover max-w-lg mx-auto "
                src={producto.vchNomImagen}
                alt="Lentes"
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 className="text-black uppercase text-lg font-bold">
                {producto.vchNombreProducto}
              </h3>
              <span className="text-black mt-3 font-bold">
                ${producto.Precio}
              </span>
              <h3 className="text-gray-700  text-sm mt-8">
                Productos disponible
              </h3>
              <span className="text-black mt-3 font-bold">
                {producto.Existencias}
              </span>
              <hr className="my-3" />
              <p className="text-gray-700 mt-4">{producto.vchDescripcion}</p>
              <hr className="my-3" />

              <div className="mt-2">
                <label className="text-gray-700 text-sm" htmlFor="count">
                  Cantidad
                </label>
                <div className="flex items-center mt-1">
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                    onClick={decrementarExistencias}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <span className="text-gray-700 text-lg mx-2">
                    {existencias}
                  </span>
                  <button
                    className="text-gray-500 focus:outline-none focus:text-gray-600"
                    onClick={incrementarExistencias}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-6">
                <button
                  onClick={() => {
                    /* agregarAlCarrito(); */
                    setMostrarGraduacion(true);
                    setMostrarDetalles(false);
                  }}
                  className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarGraduacion && (
        <div className="container mx-auto px-6 my-20 mt-36">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                src={producto.vchNomImagen}
                alt="Lentes"
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 className="text-black uppercase text-lg font-bold">
                Graduacion
              </h3>
              <hr className="my-3" />

              <div className="mt-2 space-y-3">
                {graduaciones.map((graduacion) => (
                  <div key={graduacion.IdGraduacion}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={graduacion.nombre}
                        name="lens"
                        className="appearance-none w-6 h-5 border border-gray-300 rounded-full checked:bg-indigo-600 checked:border-transparent focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        value={graduacion.IdGraduacion}
                        checked={
                          selectedLens === graduacion.IdGraduacion.toString()
                        }
                        onChange={handleLensOptionChange}
                      />
                      <label
                        htmlFor={graduacion.ValorGraduacion}
                        className="cursor-pointer ml-2"
                      >
                        <div>
                          <p className="font-bold">
                            {graduacion.ValorGraduacion}
                          </p>
                          <p className="text-black font-semibold">
                            {graduacion.Precio === 0
                              ? "Gratis"
                              : `$ ${graduacion.Precio}`}
                          </p>
                          <p className="text-sm text-black">
                            {graduacion.descripcion}
                          </p>
                        </div>
                      </label>
                    </div>
                    <hr className="my-2" />
                  </div>
                ))}
              </div>
              <p className="mt-4">Seleccionaste: {selectedLens}</p>

              <div className="flex items-center mt-6">
                <button
                  onClick={() => {
                    if (!selectedLens) {
                      toast.error("Por favor, selecciona una graduacion.");
                      return;
                    }
                    setMostrarGraduacion(false); // Cambia el estado a false para ocultar la sección de graduación
                    setMostrarTratamiento(true); // Cambia el estado a true para mostrar la sección de tratamiento
                  }}
                  className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarTratamiento && (
        <div className="container mx-auto px-6 my-20 mt-36">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                src={producto.vchNomImagen}
                alt="Lentes"
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <h3 className="text-black uppercase text-lg font-bold">
                Tratamiento
              </h3>
              <hr className="my-3" />

              <div className="mt-2 space-y-3">
                {tratamientos.map((tratamiento) => (
                  <div
                    key={tratamiento.IdTratamiento}
                    className="flex items-center"
                  >
                    <input
                      type="radio"
                      id={`tratamiento-${tratamiento.IdTratamiento}`}
                      name="tratamiento"
                      className="appearance-none w-6 h-5 border border-gray-300 rounded-full checked:bg-indigo-600 checked:border-transparent focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={tratamiento.IdTratamiento.toString()}
                      checked={
                        selectedTreatment ===
                        tratamiento.IdTratamiento.toString()
                      }
                      onChange={handleTreatmentOptionChange}
                    />
                    <label
                      htmlFor={`tratamiento-${tratamiento.IdTratamiento}`}
                      className="cursor-pointer ml-2"
                    >
                      <div>
                        <p className="font-bold">{tratamiento.Nombre}</p>
                        <p className="text-black font-semibold">
                          $ {tratamiento.Precio}
                        </p>
                        <p className="text-sm text-black">
                          {/* Descripción del tratamiento */}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <p className="mt-4">Seleccionaste: {selectedTreatment}</p>

              <div className="flex items-center mt-6">
                <button
                  onClick={() => agregarAlCarrito()}
                  className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sección de recomendaciones */}
      {/*     {recomendaciones.length > 0 && (
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-black uppercase text-lg font-bold">Recomendaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recomendaciones.map((recomendado) => (
            <div key={recomendado.IdProducto} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-20 h-20 object-cover rounded-md"
                src={recomendado.vchNomImagen}
                alt={recomendado.vchNombreProducto}
              />
              <div className="p-4">
                <h3 className="text-gray-700 font-bold">{recomendado.vchNombreProducto}</h3>
                <p className="mt-2 text-gray-700">${recomendado.Precio}</p>
                <button
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                  onClick={() => navigate(`/detalle-producto/${recomendado.IdProducto}`)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )} */}

      <Fot />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default DetalleProducto;
