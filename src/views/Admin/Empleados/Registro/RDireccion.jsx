import { useNavigate } from "react-router-dom"; // Importa useHistory para manejar la redirección
import { useForm } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";
import fetchIdCliente from "./getId_Cliente";
import { toast, ToastContainer } from "react-toastify"; // Importa ToastContainer
import { Link } from "react-router-dom";

const RDireccion = ({ onNext, onBack, onValidationChange, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [previousPostalCod, setPreviousPostalCod] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [numExtValue, setNumExtValue] = useState(""); // Estado local del valor del input NumExt
  const [sinNumChecked, setSinNumChecked] = useState(false);
  const [idCliente, setIdCliente] = useState(null);
  const [referenciaLength, setReferenciaLength] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInfoChange = (info) => {
    dispatch({ type: "UPDATE_RDIRECCION", payload: info });
  };

  const fetchLocationData = async (codPostal) => {
    const url = `https://mexico-zip-codes3.p.rapidapi.com/${codPostal}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ebc302487bmsh02cff3265862a58p15694ejsn32377e8b9560",
        "X-RapidAPI-Host": "mexico-zip-codes3.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.length > 0) {
        setLocationInfo(result);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handlePostalCodeUp = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    handleInfoChange({ CP: value });
    if (value.length === 5 && value !== previousPostalCod) {
      fetchLocationData(value);
      setPreviousPostalCod(value);
    }
  };

  useEffect(() => {
    setMaxWidth("3xl"); //Tamaño maximo del formulario

    // Obtener el IdCliente utilizando la función fetchIdCliente
    const obtenerIdCliente = async () => {
      const id = await fetchIdCliente(state.info.vchCorreo);
      if (id) {
        setIdCliente(id);
      }
    };
    obtenerIdCliente();
  }, [locationInfo, state.info.vchCorreo]);

  // Manejar la función onSubmit del formulario
  const handleFormSubmit = (formData) => {
    onSubmit(formData); // Llama a la función onSubmit con los datos del formulario
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSinNumChecked(isChecked);
    if (isChecked) {
      setNumExtValue("S/N"); // Actualizar el valor del input a "S/N" si se marca el checkbox
    } else {
      setNumExtValue(""); // Limpiar el valor del input si se desmarca el checkbox
    }
  };

  const handleReferenciaChange = (e) => {
    const value = e.target.value;
    setReferenciaLength(value.length); // Actualizar el estado con la longitud actual del texto en referencia
  };

  const onSubmit = async (data) => {
    // Envía los datos al servidor
    try {
      const response = await fetch(
        "https://backopt-production.up.railway.app/direcciones-clientes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Estado: locationInfo ? locationInfo[0]?.d_estado : "",
            CP: data.CP,
            Municipio: locationInfo ? locationInfo[0]?.D_mnpio : "",
            Colonia: data.Colonia,
            Calle: data.Calle,
            NumExt: numExtValue,
            NumInt: data.NumInt,
            Referencia: data.Referencia,
            IdCliente: idCliente, // Reemplaza "tu_id_cliente" con el valor correcto
          }),
        }
      );

      if (response.ok) {
        // Realiza alguna acción si la solicitud fue exitosa (por ejemplo, redirigir al usuario)
        toast.success("El registro se completo exitosamente");
        setTimeout(() => {
          navigate("/inicioS"); // Redirige al usuario a la página de inicio de sesión
        }, 5000);
      } else {
        toast.error("Hubo un error al guardar los datos");
      }
    } catch (error) {
      toast.error("Hubo un error al enviar la solicitud");
    }
  };

  return (
    <>
      <div className="pt-24 text-center rounded-lg shadow-md overflow-hidden">
        <div className="container ml-auto mr-auto">
          <div className="bg-white px-12">
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario de direccion del contacto
            </p>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="grid grid-cols-2 gap-x-14">
                <div className="mb-4">
                  <label htmlFor="" className="block text-left font-bold">
                    Codigo Postal:
                  </label>
                  <input
                    type="text"
                    name="CP"
                    id="CP"
                    required
                    maxLength={5}
                    onKeyUp={handlePostalCodeUp}
                    onKeyDown={(e) => {
                      if (!/\d/.test(e.key) && e.key !== "Backspace") {
                        e.preventDefault();
                      }
                    }}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Codigo Postal"
                    {...register("CP")}
                  />
                </div>
                <div className="mb-4 text-gray-400 pointer-events-none">
                  <label htmlFor="" className="block text-left font-bold">
                    Estado:
                  </label>
                  <input
                    type="text"
                    name="Estado"
                    id="Estado"
                    required
                    readOnly
                    value={locationInfo ? locationInfo[0]?.d_estado : ""}
                    className="mt-1 p-2 border rounded-md w-full bg-gray-50 cursor-default"
                    placeholder="Estado"
                    {...register("Estado")}
                  />
                </div>
                <div className="mb-4 text-gray-400 pointer-events-none">
                  <label htmlFor="" className="block text-left font-bold">
                    Municipio:
                  </label>
                  <input
                    type="text"
                    name="Municipio"
                    id="Municipio"
                    required
                    readOnly
                    value={locationInfo ? locationInfo[0]?.D_mnpio : ""}
                    className="mt-1 p-2 border rounded-md w-full bg-gray-50 cursor-default"
                    placeholder="Municipio"
                    {...register("Municipio")}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="Colonia"
                    className="block text-left font-bold"
                  >
                    Colonia:
                  </label>
                  <select
                    name="Colonia"
                    id="Colonia"
                    required
                    className="mt-1 p-2 border rounded-md w-full"
                    {...register("Colonia")}
                  >
                    <option value="">Selecciona la colonia</option>
                    {locationInfo &&
                      locationInfo.map((colonia, index) => (
                        <option key={index} value={colonia?.d_asenta}>
                          {colonia?.d_asenta}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="" className="block text-left font-bold">
                    Calle:
                  </label>
                  <input
                    type="text"
                    name="Calle"
                    id="Calle"
                    required
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Calle"
                    {...register("Calle")}
                  />
                </div>
                <div
                  className={`mb-4 ${
                    sinNumChecked ? "text-gray-400 pointer-events-none" : ""
                  }`}
                >
                  <label htmlFor="" className="block text-left font-bold">
                    Numero exterior:
                  </label>
                  <input
                    type="text"
                    name="NumExt"
                    id="NumExt"
                    required
                    maxLength={7}
                    className={`mt-1 p-2 border rounded-md w-full ${
                      sinNumChecked ? "bg-gray-50 cursor-default" : ""
                    }`}
                    placeholder="Numero exterior"
                    {...register("NumExt")}
                    value={numExtValue}
                    onChange={(e) => setNumExtValue(e.target.value)}
                    readOnly={numExtValue === "S/N"} // Deshabilitar el input si el valor es "S/N"
                  />

                  {/* Checkbox para indicar "Sin número" */}
                  <div className="absolute ml-48 -mt-8 pointer-events-auto">
                    <label
                      htmlFor="withoutNumber"
                      className="text-gray-800 ml-1 cursor-pointer"
                    >
                      Sin número
                    </label>
                    <input
                      type="checkbox"
                      id="withoutNumber"
                      name="withoutNumber"
                      className="ml-1"
                      checked={numExtValue === "S/N"} // Marcar el checkbox si el valor del input es "S/N"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="" className="block text-left font-bold">
                    Numero interior (Opcional):
                  </label>
                  <input
                    type="text"
                    name="NumInt"
                    id="NumInt"
                    maxLength={5}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Numero interior"
                    {...register("NumInt")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="" className="block text-left font-bold">
                    Referencia:
                  </label>
                  <textarea
                    name="Referencia"
                    id="Referencia"
                    required
                    maxLength={128}
                    className="mt-1 p-2 border rounded-md w-full h-24 resize-none"
                    placeholder="Descripcion de la fachada, puntos de referencia para encontrala, indicaciones de seguridad, etc."
                    {...register("Referencia")}
                    onChange={handleReferenciaChange}
                  />
                  <div className="text-gray-500 text-sm -mt-1 flex justify-end">
                    {referenciaLength}/128
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-gray-500 border border-black hover:bg-gray-400 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                >
                  Regresar
                </button>
                <Link
                  to="/inicioAd"
                  className="bg-blue-700 border border-black hover:bg-blue-600 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                  disabled={Object.keys(errors).length > 0}
                >
                  Omitir
                </Link>
                <button
                  type="submit"
                  className="bg-blue-700 border border-black hover:bg-blue-600 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                  disabled={Object.keys(errors).length > 0}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default RDireccion;
