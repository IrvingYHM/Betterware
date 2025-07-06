import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Fot from "../../components/Footer";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [imageURL, setImageURL] = useState("");

  // Función para manejar el cambio de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageURL(imageURL);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="py-4 bg-white">
      <div className=" mt-20 mb-20">
        <ToastContainer />
        <div className="flex-center ">
          <div className="flex items-center justify-center p-4">
            <div className="mx-auto w-full max-w-[550px] bg-white border-2 border-black">
              <form className="py-6 px-9" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label
                    htmlFor="vchNombre"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Nombre del producto:
                  </label>
                  <input
                    type="text"
                    name="vchNombre"
                    id="vchNombre"
                    placeholder="Nombre del producto"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("vchNombreProducto", { required: true })}
                  />
                  {errors.vchNombreProducto?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="vchDescripcion"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Descripción:
                  </label>
                  <input
                    type="text"
                    name="vchDescripcion"
                    id="vchDescripcion"
                    placeholder="Descripción del producto"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("vchDescripcion", { required: true })}
                  />
                  {errors.vchDescripcion?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="Existencias"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Existencias:
                  </label>
                  <input
                    type="number"
                    name="Existencias"
                    id="Existencias"
                    placeholder="Cantidad en existencia"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    {...register("Existencias", { required: true })}
                  />
                  {errors.Existencias?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="Categoria"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Categoria:
                  </label>
                  <select
                    name="Categorias"
                    id="Categorias"
                    {...register("IdCategoria", { required: true })}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="" disabled defaultValue>
                      Selecciona
                    </option>
                    <option value="1">Lentes de sol</option>
                    <option value="2">Lentes graduados</option>
                  </select>
                  {errors.IdCategoria?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="Marca"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Marca:
                  </label>
                  <select
                    name="Marcas"
                    id="Marcas"
                    {...register("IdMarca", { required: true })}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="" disabled defaultValue>
                      Selecciona
                    </option>
                    <option value="1">Casio</option>
                    <option value="2">Ray-Ban</option>
                    <option value="3">Oakley</option>
                  </select>
                  {errors.IdMarca?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="Precio"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Precio:
                  </label>
                  <input
                    type="number"
                    name="Precios"
                    id="Precios"
                    placeholder="Precio del producto"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>

                <div className="mb-6 pt-4">
                  <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                    Subir imagen del producto
                  </label>

                  <div className="mb-8">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    {imageURL ? (
                      <div className="relative">
                        <img
                          src={imageURL}
                          alt="Preview"
                          className="w-auto h-[200px] object-cover rounded-md mb-4"
                        />
                        <button
                          onClick={() => setImageURL("")}
                          className="absolute top-0 right-0 mr-4 mt-4 text-[#07074D] bg-white rounded-md px-2 py-1 shadow"
                        >
                          Borrar
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="file"
                        className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-black p-12 text-center"
                      >
                        <div>
                          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                            Arrastra la imagen
                          </span>
                          <span className="mb-2 block text-base font-medium text-white">
                            O
                          </span>
                          <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                            Explorar
                          </span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
              border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  >
                    Agregar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
}

export default App;
