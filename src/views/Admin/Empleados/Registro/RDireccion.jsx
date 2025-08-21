import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { RegistroContext } from "./RegistroContext";
import fetchIdCliente from "./getId_Cliente";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const RDireccion = ({ onNext, onBack, onValidationChange, setMaxWidth }) => {
  const { state, dispatch } = useContext(RegistroContext);
  const [previousPostalCod, setPreviousPostalCod] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [numExtValue, setNumExtValue] = useState("");
  const [sinNumChecked, setSinNumChecked] = useState(false);
  const [idCliente, setIdCliente] = useState(null);
  const [referenciaLength, setReferenciaLength] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: state.direccion,
    mode: "onChange"
  });

  useEffect(() => {
    // No establecer maxWidth aquí ya que se controla desde RegistroPage
    
    // Cargar datos persistidos del contexto
    if (state.direccion) {
      Object.keys(state.direccion).forEach(key => {
        setValue(key, state.direccion[key]);
      });
      setNumExtValue(state.direccion.NumExt || "");
      setReferenciaLength((state.direccion.Referencia || "").length);
    }

    // Obtener el IdCliente
    const obtenerIdCliente = async () => {
      const id = await fetchIdCliente(state.correo.vchCorreo);
      if (id) {
        setIdCliente(id);
      }
    };
    obtenerIdCliente();
  }, [state.direccion, state.correo.vchCorreo, setValue, setMaxWidth]);

  useEffect(() => {
    const subscription = watch((value) => {
      // Actualizar contexto en tiempo real
      dispatch({
        type: "UPDATE_DIRECCION",
        payload: { ...value, NumExt: numExtValue }
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch, numExtValue]);

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
    setValue("CP", value);
    
    if (value.length === 5 && value !== previousPostalCod) {
      fetchLocationData(value);
      setPreviousPostalCod(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSinNumChecked(isChecked);
    const newValue = isChecked ? "S/N" : "";
    setNumExtValue(newValue);
    setValue("NumExt", newValue);
  };

  const handleReferenciaChange = (e) => {
    const value = e.target.value;
    setReferenciaLength(value.length);
  };

  const handleNumExtChange = (e) => {
    if (!sinNumChecked) {
      const value = e.target.value;
      setNumExtValue(value);
    }
  };

  const onSubmit = async (data) => {
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
            IdCliente: idCliente,
          }),
        }
      );

      if (response.ok) {
        toast.success("El registro se completó exitosamente");
        setTimeout(() => {
          navigate("/inicioAd");
        }, 3000);
      } else {
        toast.error("Hubo un error al guardar los datos");
      }
    } catch (error) {
      toast.error("Hubo un error al enviar la solicitud");
    }
  };

  return (
    <>
      <div className="pt-3 text-center rounded-lg shadow-md overflow-hidden">
        <div className="container ml-auto mr-auto">
          <div className="bg-white px-12">
            <p className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4">
              Formulario de direccion del afiliado
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    onChange={handleNumExtChange}
                    readOnly={numExtValue === "S/N"}
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
                      checked={numExtValue === "S/N"}
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
                  className="bg-teal-600 border border-black hover:bg-teal-700 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
                  disabled={Object.keys(errors).length > 0}
                >
                  Omitir
                </Link>
                <button
                  type="submit"
                  className="bg-teal-600 border border-black hover:bg-teal-700 text-white rounded-lg font-bold flex px-4 py-2 my-5 justify-center mx-auto items-center"
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
        autoClose={3000}
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