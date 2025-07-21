import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link} from "react-router-dom";


function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:3000/productos_Better/Productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        const categoriasMap = {};
        data.forEach((producto) => {
            categoriasMap[producto.IdCategoria] = producto.categoria.NombreCategoria;
        });
        setCategorias(categoriasMap);
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <ToastContainer />
      <div className="flex-center my-32">
        <h1 className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">
          Productos
        </h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-blue-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4 text-center">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  NOMBRE DEL PRODUCTO
                </th>
                <th scope="col" className="px-6 py-3">
                  IMAGEN
                </th>
                <th scope="col" className="px-6 py-3">
                  DESCRIPCION
                </th>
                <th scope="col" className="px-6 py-3">
                  EXISTENCIA
                </th>
                <th scope="col" className="px-6 py-3">
                  PRECIO
                </th>
                <th scope="col" className="px-6 py-3">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3">
                  ACCION
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr
                  key={producto.IdProducto}
                  className="bg-black border-b dark:bg-white dark:border-black hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                    {producto.IdProducto}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                  >
                    {producto.vchNombreProducto}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                  >
                    {producto.vchNomImagen}
                  </td>
                  <td 
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                  
                    {producto.vchDescripcion}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {producto.Existencias}
                  </td>
                  <td
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                  
                    {producto.Precio}
                  </td>
                  <td
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">                                    
                    {categorias[producto.IdCategoria] || 'Sin categoria'}
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3"
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      style={{ cursor: "pointer" }}
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">

            <Link
               className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
               border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            to="/ProductosAg">
            Dar de alta{" "}
            
            </Link>
        </div>
      </div>
    </>
  );
}

export default App;
