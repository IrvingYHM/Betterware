import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Fot from "../../../components/Footer";
import Barra from "../../../components/Navegacion/barraAdmin";


function ProductsList() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [marcas, setMarcas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://backopt-production.up.railway.app/productos/Productos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        const categoriasMap = {};
        const marcasMap = {};
        data.forEach((producto) => {
          categoriasMap[producto.IdCategoria] =
            producto.categoria.NombreCategoria;
          marcasMap[producto.IdMarca] = producto.marca.NombreMarca;
        });
        setCategorias(categoriasMap);
        setMarcas(marcasMap);
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeactivate = (id) => {
    fetch(`https://backopt-production.up.railway.app/productos/desactivar/${id}`, {
      method: "PUT"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al desactivar el producto");
        }
        toast.success("Producto desactivado con éxito");
        setProductos(prevProductos => prevProductos.map(producto => 
          producto.IdProducto === id ? { ...producto, activo: false, Existencias: 0 } : producto
        ));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al desactivar el producto");
      });
  };

  return (
    <>
      <Barra />
      <ToastContainer />
      <div className="flex flex-col items-center my-32">
        <h1 className="sm:text-2xl md:text-base lg:text-2xl text-cyan-950 font-bold mb-4 text-center">
          Productos
        </h1>

        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div key={producto.IdProducto} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={producto.vchNomImagen}
                alt={producto.vchNombreProducto}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{producto.vchNombreProducto}</h2>
              <p className="text-gray-600 mb-2">{producto.vchDescripcion}</p>
              <p className="text-gray-800 font-semibold mb-2">Precio: ${producto.Precio}</p>
              <p className="text-gray-600 mb-2">Existencias: {producto.Existencias > 0 ? producto.Existencias : 'Agotado'}</p>
              <p className="text-gray-600 mb-2">Categoría: {categorias[producto.IdCategoria] || 'Sin categoría'}</p>
              <p className="text-gray-600 mb-4">Marca: {marcas[producto.IdMarca] || 'Sin marca'}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/ModificarProducto/${producto.IdProducto}`}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="py-6 mb-8">
          <Link
            className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            to="/ProductosAg"
          >
            Dar de alta
          </Link>
        </div>
      </div>
      <Fot />
    </>
  );
}

export default ProductsList;
