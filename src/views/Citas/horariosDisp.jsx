import { useState, useEffect } from "react";
import axios from "axios";

const useFetchHorarios = (fecha) => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fecha) {
      setHorarios([]);
      setLoading(false);
      return;
    }

    const fetchHorarios = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://backopt-production.up.railway.app/horarios/HrPorFecha?fecha=${fecha}`
        );
        setHorarios(response.data);

        if (response.data.length === 0) {
          console.log(
            "No hay horarios disponibles para la fecha seleccionada."
          );
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // Maneja el error 404 específicamente
          setHorarios([]); // Asegúrate de establecer un arreglo vacío si no se encuentran horarios
          console.log(
            "No hay horarios disponibles para la fecha seleccionada."
          );
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [fecha]);

  return { horarios, loading, error };
};

export default useFetchHorarios;
