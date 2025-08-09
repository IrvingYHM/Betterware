import { useState, useEffect, useRef } from "react";
/* import Navbar from "../components/BarraNavegacion"; */
import Slider from "../Inicio/slider";
import Scrool from '../../../components/scroll';
import { obtenerProductos } from "../../Productos/Api";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PromocionesLoading from "../../../components/PromocionesLoading";

function inicioAdmin() {
  const [promociones, setPromociones] = useState([]);
  const [loadingPromociones, setLoadingPromociones] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carruselRef = useRef(null);

  useEffect(() => {
    const cargarPromociones = async () => {
      try {
        setLoadingPromociones(true);
        const productos = await obtenerProductos();
        
        // Filtrar productos con ofertas reales
        const productosEnOferta = productos.filter(producto => {
          if (!producto.EnOferta || !producto.PrecioOferta) return false;
          const precioOriginal = parseFloat(producto.Precio) || 0;
          const precioOferta = parseFloat(producto.PrecioOferta) || 0;
          return precioOferta < precioOriginal;
        });
        
        // Tomar TODAS las promociones disponibles (sin límite)
        setPromociones(productosEnOferta);
      } catch (error) {
        console.error("Error al cargar promociones:", error);
        setPromociones([]);
      } finally {
        setLoadingPromociones(false);
      }
    };

    cargarPromociones();
  }, []);

  const calcularDescuento = (precioOriginal, precioOferta) => {
    const descuento = ((precioOriginal - precioOferta) / precioOriginal) * 100;
    return Math.round(descuento);
  };

  // Funciones del carrusel - desplaza de 5 cards (visibleCards) cada vez
  const nextSlide = () => {
    if (promociones.length > visibleCards) {
      setCurrentSlide((prev) => {
        const nextSlideIndex = prev + visibleCards;
        // Si el siguiente grupo excede las cards disponibles, volver al inicio
        return nextSlideIndex >= promociones.length ? 0 : nextSlideIndex;
      });
    }
  };

  const prevSlide = () => {
    if (promociones.length > visibleCards) {
      setCurrentSlide((prev) => {
        if (prev === 0) {
          // Si estamos al inicio, ir al último grupo completo
          const lastGroupStart = Math.floor((promociones.length - 1) / visibleCards) * visibleCards;
          return lastGroupStart;
        }
        return Math.max(0, prev - visibleCards);
      });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Función para obtener las tarjetas visibles según el tamaño de pantalla
  const getVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 640) return 1; // móvil: 1 card
    if (width < 768) return 2; // tablet pequeña: 2 cards  
    if (width < 1024) return 3; // tablet: 3 cards
    return 5; // desktop y superiores: 5 cards
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  // Auto-play del carrusel - cambia cada 8 segundos
  useEffect(() => {
    if (promociones.length > visibleCards) {
      const interval = setInterval(() => {
        nextSlide();
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [promociones.length, visibleCards]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
      // Ajustar currentSlide si es necesario para que esté alineado con grupos
      setCurrentSlide((prev) => {
        if (promociones.length > 0) {
          const currentGroup = Math.floor(prev / newVisibleCards);
          const newSlideIndex = currentGroup * newVisibleCards;
          return Math.min(newSlideIndex, promociones.length - newVisibleCards);
        }
        return 0;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [promociones.length]);

  return (
    <>
      <div className="flex flex-col lg:flex-row mt-6 px-4 lg:px-12 gap-6">
        <div className="w-full lg:w-3/4">
          <Slider />
          <br />

          {/* Separador de promociones */}
          <div className="flex items-center justify-center my-12">
            <div className="h-2 bg-teal-500 flex-1"></div>
            <span className="mx-4 text-2xl md:text-5xl font-bold uppercase tracking-wider">
              Promociones
            </span>
            <div className="h-2 bg-teal-500 flex-1"></div>
          </div>

          {/* Carrusel de promociones */}
          {loadingPromociones ? (
            <PromocionesLoading visibleCards={visibleCards} />
          ) : promociones.length > 0 ? (
            <>
              <div className="relative max-w-7xl mx-auto px-4">
                {/* Contenedor del carrusel */}
                <div className="relative overflow-hidden rounded-lg">
                  <div 
                    ref={carruselRef}
                    className="flex transition-transform duration-700 ease-out"
                    style={{ 
                      transform: `translateX(-${(currentSlide * 100) / promociones.length}%)`,
                      width: `${promociones.length * (100 / visibleCards)}%`
                    }}
                  >
                    {promociones.map((producto, index) => {
                      const precioOriginal = parseFloat(producto.Precio) || 0;
                      const precioOferta = parseFloat(producto.PrecioOferta) || 0;
                      const descuento = calcularDescuento(precioOriginal, precioOferta);

                      return (
                        <div 
                          key={`${producto.IdProducto}-${index}`} 
                          className="flex-shrink-0 px-2"
                          style={{ 
                            width: `${100 / promociones.length}%`
                          }}
                        >
                          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1">
                            {/* Etiqueta de descuento */}
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                              -{descuento}%
                            </div>
                            
                            <Link to={`/productoDetalle/${producto.IdProducto}`}>
                              <div className="relative overflow-hidden">
                                <img 
                                  className="w-full h-32 sm:h-40 md:h-44 lg:h-40 xl:h-44 object-cover group-hover:scale-105 transition-transform duration-300" 
                                  src={producto.vchNomImagen || "/placeholder-image.png"} 
                                  alt={producto.vchNombreProducto}
                                  onError={(e) => {
                                    e.target.src = "/placeholder-image.png";
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </Link>

                            <div className="px-3 py-3">
                              <Link to={`/productoDetalle/${producto.IdProducto}`}>
                                <h3 className="font-bold mb-2 hover:text-teal-500 transition-colors duration-200 line-clamp-2 h-8 sm:h-10 lg:h-12">
                                  {producto.vchNombreProducto}
                                </h3>
                              </Link>
                              
                              {/* Precios */}
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="font-bold text-green-600">
                                    ${precioOferta.toFixed(2)}
                                  </span>
                                  <span className="text-gray-500 line-through">
                                    ${precioOriginal.toFixed(2)}
                                  </span>
                                </div>
                                <div className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-center">
                                  Ahorras ${(precioOriginal - precioOferta).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Botones de navegación */}
                {promociones.length > visibleCards && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 z-10 hover:scale-110"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-teal-500" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 z-10 hover:scale-110"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-6 h-6 text-teal-500" />
                    </button>
                  </>
                )}
              </div>

              {/* Indicadores de puntos */}
              {promociones.length > visibleCards && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: Math.ceil(promociones.length / visibleCards) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index * visibleCards)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        Math.floor(currentSlide / visibleCards) === index
                          ? 'bg-teal-500 scale-150 shadow-lg' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ir al grupo ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Botón para ver todas las promociones */}
              <div className="flex justify-center mt-8">
                <Link 
                  to="/productos?filter=promociones" 
                  className="bg-gradient-to-r from-teal-400 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-teal-500"
                >
                  Ver todas las promociones ({promociones.length} ofertas disponibles)
                </Link>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg text-center py-12">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-500">
                    Sin promociones activas
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    No hay ofertas disponibles en este momento, pero tenemos muchos productos increíbles esperándote.
                  </p>
                  <Link 
                    to="/productos" 
                    className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg border border-teal-500"
                  >
                    Ver todos los productos
                  </Link>
                </div>
              </div>
            </div>
          )}
          <br />
        </div>
        <Scrool />
      </div>
    </>
  );
}

export default inicioAdmin;
