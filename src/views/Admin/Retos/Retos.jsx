import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";

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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backbetter-production.up.railway.app/top-vendedor?month=${mes}&year=${año}`)
      .then((res) => setTopVentas(res.data.slice(0, 10)))
      .catch((err) => console.error("Error cargando top ventas", err));

    axios
      .get(`https://backbetter-production.up.railway.app/top-referidos?month=${mes}&year=${año}`)
      .then((res) => setTopReferidos(res.data.slice(0, 10)))
      .catch((err) => console.error("Error cargando top referidos", err));

    const tipos = [
      "retos-ventas",
      "ganadores-ventas",
      "retos-afiliados",
      "ganadores-afiliados",
    ];

    tipos.forEach((tipo) => {
      axios
        .get(`https://backbetter-production.up.railway.app/imagenes/filtrar/${tipo}`)
        .then((res) => {
          setImagenes((prev) => ({ ...prev, [tipo]: res.data }));
        })
        .catch((err) => console.error(`Error cargando imágenes de tipo ${tipo}`, err));
    });
  }, [mes, año]);

  const renderTop = (lista, tipo) => {
    const tipoRuta = tipo.toLowerCase() === "ventas" ? "ventas" : "referidos";
    return (
      <div className="bg-white shadow-md p-4 rounded-lg w-full lg:w-1/2">
        <h2 className="text-xl font-bold text-center mb-4">
          Top {tipo} - {mes} {año}
        </h2>
        <ul className="divide-y divide-gray-200">
          {lista.map((item, index) => (
            <li key={item.id || index} className="py-3">
              <span className="font-semibold mr-2">#{index + 1}</span>
              {item.empleado?.vchNombre} {item.empleado?.vchAPaterno} {item.empleado?.vchAMaterno} -{" "}
              <span className="text-blue-600 font-bold">
                {tipo === "Ventas"
                  ? `${item.numVentas} ventas`
                  : `${item.numReferidos} referidos`}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Link
            to={`/nuevo-top-${tipoRuta}`}
            className="inline-block font-bold bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Editar
          </Link>
        </div>
      </div>
    );
  };

  const renderImagenConBotones = (
    tipoReto,
    tipoGanador,
    titulo,
    imagenes,
    navigate
  ) => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const imagenReto = imagenes[tipoReto]?.[0]?.Imagen;
    const imagenGanador = imagenes[tipoGanador]?.[0]?.Imagen;

    return (
      <>
        <div className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-center">{titulo}</h2>

          {/* Imagen del reto (se muestra directamente) */}
          {imagenReto && (
            <img
              src={imagenReto}
              alt="Imagen del reto"
              className="rounded-lg object-cover max-h-[480px] mb-4"
            />
          )}

          <div className="flex gap-6">
          {/* Botón para ver imagen de ganadores */}
          {imagenGanador && (
            <button
              onClick={() => setModalAbierto(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-bold"
            >
              Ver ganadores
            </button>
          )}

          {/* Botones para subir imágenes */}
            <button
              onClick={() => navigate(`/imagen-reto/${tipoReto}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold"
            >
              Subir reto
            </button>
            <button
              onClick={() => navigate(`/imagen-reto/${tipoGanador}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
            >
              Subir ganadores
            </button>
          </div>
        </div>

        {/* Modal flotante para ver la imagen de ganadores */}
        {modalAbierto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={() => setModalAbierto(false)}
          >
            <div
              className="relative max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagenGanador}
                alt="Vista completa de ganadores"
                className="rounded-lg w-full max-h-[90vh] object-contain shadow-lg"
              />
              <button
                onClick={() => setModalAbierto(false)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen mt-6">
      <div className="container mx-auto px-4 mb-10 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {renderTop(topVentas, "Ventas")}
          {renderImagenConBotones("retos-ventas", "ganadores-ventas", "Reto - Ventas", imagenes, navigate)}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {renderTop(topReferidos, "Afiliados")}
          {renderImagenConBotones("retos-afiliados", "ganadores-afiliados", "Reto - Afiliaciones", imagenes, navigate)}

        </div>
      </div>
    </div>
  );
}

export default Retos;
