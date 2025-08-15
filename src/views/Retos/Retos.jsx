import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Trophy, Crown, Users, TrendingUp, Upload, Eye, Edit3, Award, Target, X } from "lucide-react";
import Barra from "../../components/Navegacion/barra";
import Fot from "../../components/Footer";
import { TopListSkeleton, ImageSkeleton } from "./RetosSkeletons";

const obtenerMesAnteriorYAño = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  return {
    mes: meses[date.getMonth()],
    año: date.getFullYear(),
  };
};

function Retos() {
  const [{ mes, año }] = useState(obtenerMesAnteriorYAño());
  const [topVentas, setTopVentas] = useState([]);
  const [topReferidos, setTopReferidos] = useState([]);
  const [imagenes, setImagenes] = useState({});
  const [loading, setLoading] = useState({
    topVentas: true,
    topReferidos: true,
    imagenesVentas: true,
    imagenesAfiliados: true
  });
  const navigate = useNavigate();
  
  // Betterware color palette matching dashboard
  const colors = {
    primary: '#00B4D8',
    secondary: '#0077B6', 
    accent: '#90E0EF',
    light: '#CAF0F8',
    dark: '#03045E',
    success: '#06FFA5',
    warning: '#FFB700',
    danger: '#FF006E'
  };

  useEffect(() => {
    // Reset loading states
    setLoading({
      topVentas: true,
      topReferidos: true,
      imagenesVentas: true,
      imagenesAfiliados: true
    });

    // Load top ventas
    axios
      .get(`https://backbetter-production.up.railway.app/top-vendedor?month=${mes}&year=${año}`)
      .then((res) => {
        setTopVentas(res.data.slice(0, 10));
        setLoading(prev => ({ ...prev, topVentas: false }));
      })
      .catch((err) => {
        console.error("Error cargando top ventas", err);
        setLoading(prev => ({ ...prev, topVentas: false }));
      });

    // Load top referidos
    axios
      .get(`https://backbetter-production.up.railway.app/top-referidos?month=${mes}&year=${año}`)
      .then((res) => {
        setTopReferidos(res.data.slice(0, 10));
        setLoading(prev => ({ ...prev, topReferidos: false }));
      })
      .catch((err) => {
        console.error("Error cargando top referidos", err);
        setLoading(prev => ({ ...prev, topReferidos: false }));
      });

    const tipos = [
      "retos-ventas",
      "ganadores-ventas",
      "retos-afiliados",
      "ganadores-afiliados",
    ];

    let imagenesVentasLoaded = 0;
    let imagenesAfiliadosLoaded = 0;
    const ventasTypes = ["retos-ventas", "ganadores-ventas"];
    const afiliadosTypes = ["retos-afiliados", "ganadores-afiliados"];

    tipos.forEach((tipo) => {
      axios
        .get(`https://backbetter-production.up.railway.app/imagenes/filtrar/${tipo}`)
        .then((res) => {
          setImagenes((prev) => ({ ...prev, [tipo]: res.data }));
          
          // Update loading states for images
          if (ventasTypes.includes(tipo)) {
            imagenesVentasLoaded++;
            if (imagenesVentasLoaded === ventasTypes.length) {
              setLoading(prev => ({ ...prev, imagenesVentas: false }));
            }
          }
          
          if (afiliadosTypes.includes(tipo)) {
            imagenesAfiliadosLoaded++;
            if (imagenesAfiliadosLoaded === afiliadosTypes.length) {
              setLoading(prev => ({ ...prev, imagenesAfiliados: false }));
            }
          }
        })
        .catch((err) => {
          console.error(`Error cargando imágenes de tipo ${tipo}`, err);
          
          // Update loading states even on error
          if (ventasTypes.includes(tipo)) {
            imagenesVentasLoaded++;
            if (imagenesVentasLoaded === ventasTypes.length) {
              setLoading(prev => ({ ...prev, imagenesVentas: false }));
            }
          }
          
          if (afiliadosTypes.includes(tipo)) {
            imagenesAfiliadosLoaded++;
            if (imagenesAfiliadosLoaded === afiliadosTypes.length) {
              setLoading(prev => ({ ...prev, imagenesAfiliados: false }));
            }
          }
        });
    });
  }, [mes, año]);


  const renderTop = (lista, tipo, isLoading) => {
    if (isLoading) {
      return <TopListSkeleton tipo={tipo} />;
    }

    const isVentas = tipo === "Ventas";
    const icon = isVentas ? TrendingUp : Users;
    const headerColor = isVentas ? colors.success : colors.warning;
    
    return (
      <div className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 p-6 rounded-2xl w-full lg:w-1/2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${headerColor}, ${colors.secondary})` }}>
              {React.createElement(icon, { className: "w-5 h-5 text-white" })}
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Top {tipo}
              </h2>
              <p className="text-sm text-gray-600">{mes} {año}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {lista.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                {React.createElement(icon, { className: "w-12 h-12 mx-auto" })}
              </div>
              <p className="text-gray-500">No hay datos disponibles para {mes} {año}</p>
            </div>
          ) : (
            lista.map((item, index) => {
              const isTop3 = index < 3;
              const rankColors = ['bg-yellow-100 text-yellow-800', 'bg-gray-100 text-gray-800', 'bg-orange-100 text-orange-800'];
              const rankColor = isTop3 ? rankColors[index] : 'bg-blue-100 text-blue-800';
              
              return (
                <div key={item.id || index} 
                     className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                       isTop3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                     } transform hover:scale-105`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${rankColor} transition-all duration-200`}>
                        {isTop3 && index === 0 ? <Crown className="w-4 h-4" /> : `#${index + 1}`}
                      </span>
                      <div>
                        <p className="font-semibold">
                          {item.empleado?.vchNombre} {item.empleado?.vchAPaterno} {item.empleado?.vchAMaterno}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg" style={{ color: headerColor }}>
                        {tipo === "Ventas" ? item.numVentas : item.numReferidos}
                      </span>
                      <p className="text-xs text-gray-500">
                        {tipo === "Ventas" ? "ventas" : "referidos"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const renderImagenConBotones = (
    tipoReto,
    tipoGanador,
    titulo,
    imagenes,
    isLoading
  ) => {
    const [modalAbierto, setModalAbierto] = useState(false);
    
    if (isLoading) {
      return <ImageSkeleton titulo={titulo} />;
    }

    const imagenReto = imagenes[tipoReto]?.[0]?.Imagen;
    const imagenGanador = imagenes[tipoGanador]?.[0]?.Imagen;
    const isVentas = titulo.includes("Ventas");
    const headerColor = isVentas ? colors.success : colors.warning;

    return (
      <>
        <div className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl p-6 w-full lg:w-1/2 flex flex-col">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${headerColor}, ${colors.secondary})` }}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{titulo}</h2>
            </div>
          </div>

          {/* Imagen del reto */}
          <div className="flex-1 flex flex-col items-center mb-6">
            {imagenReto ? (
              <div className="relative group">
                <img
                  src={imagenReto}
                  alt="Imagen del reto"
                  className="rounded-xl object-cover max-h-[400px] w-full shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300"></div>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 font-medium">No hay imagen de reto</p>
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between">
            {imagenGanador && (
              <button
                onClick={() => setModalAbierto(true)}
                className="flex items-center w-full justify-center px-4 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Ganadores
              </button>
            )}
          </div>
        </div>

        {/* Modal mejorado para ver ganadores */}
        {modalAbierto && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalAbierto(false)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    Ganadores del Reto
                  </h3>
                  <button
                    onClick={() => setModalAbierto(false)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <img
                  src={imagenGanador}
                  alt="Vista completa de ganadores"
                  className="rounded-xl w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="mt-24 lg:mt-40">
      <Barra/>
      <div className="min-h-screen bg-gradient-to-br mb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Ventas Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 pt-3 pb-6 border border-gray-200">
            <div className="flex justify-center space-x-3 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.success}, ${colors.primary})`,
                }}
              >
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold">
                Retos de Ventas
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {renderTop(topVentas, "Ventas", loading.topVentas)}
              {renderImagenConBotones(
                "retos-ventas",
                "ganadores-ventas",
                "Reto - Ventas",
                imagenes,
                loading.imagenesVentas
              )}
            </div>
          </div>

          {/* Afiliaciones Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 pb-6 pt-3 border border-gray-200">
            <div className="flex justify-center space-x-3 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.warning}, ${colors.primary})`,
                }}
              >
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold">
                Retos de Afiliaciones
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {renderTop(topReferidos, "Afiliados", loading.topReferidos)}
              {renderImagenConBotones(
                "retos-afiliados",
                "ganadores-afiliados",
                "Reto - Afiliaciones",
                imagenes,
                loading.imagenesAfiliados
              )}
            </div>
          </div>
        </div>
      </div>
      <Fot/>
    </div>
  );
}

export default Retos;
