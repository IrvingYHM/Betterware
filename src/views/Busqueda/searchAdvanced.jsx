import React, { useState, useEffect } from "react";
import lentesData from "../Busqueda/lentesData";

const SearchAdvanced = () => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("all");
  const [genero, setGenero] = useState("all");
  const [marca, setMarca] = useState("all");
  const [precio, setPrecio] = useState("all");
  const [resultados, setResultados] = useState([]);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [generosUnicos, setGenerosUnicos] = useState([]);
  const [marcasUnicas, setMarcasUnicas] = useState([]);
  const [preciosUnicos, setPreciosUnicos] = useState([]);

  useEffect(() => {
    // Extraer categorías únicas
    const categorias = [...new Set(lentesData.map((item) => item.categoria))];
    setCategoriasUnicas(["all", ...categorias]);

    // Extraer géneros únicos
    const generos = [...new Set(lentesData.map((item) => item.genero))];
    setGenerosUnicos(["all", ...generos]);

    // Extraer marcas únicas
    const marcas = [...new Set(lentesData.map((item) => item.marca))];
    setMarcasUnicas(["all", ...marcas]);

    // Extraer géneros únicos
    const precios = [...new Set(lentesData.map((item) => item.precio))];
    setPreciosUnicos(["all", ...precios]);
  }, []);

  const buscar = () => {
    fetch(`http://localhost:3000/productos/Buscar_productos?busqueda=${nombre}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al buscar productos");
        }
        return response.json();
      })
      .then((data) => {
        setResultados(data);
      })
      .catch((error) => {
        console.error(error);
        setResultados([]);
      });
  };

  const mostrarResultados = () => {
    if (resultados.length === 0) {
      return <p>No se encontraron resultados.</p>;
    }

    return resultados.map((item) => (
      <div
        key={item.nombre}
        className="w-3/4 p-4 flex flex-wrap bg-white border border-gray-300 mb-4"
      >
        <img src={item.imagen} alt={item.nombre} className="mr-4 max-w-16" />
        <div className="flex-grow">
          <label className="block mb-2">
            <strong>Nombre: </strong>
            {item.vchNombreProducto}
          </label>
          <label className="block mb-2">
            <strong>Categoria: </strong>
            {item.categoria}
          </label>
          <label className="block mb-2">
            <strong>Género: </strong>
            {item.genero}
          </label>
          <label className="block mb-2">
            <strong>Precio: </strong>${item.Precio}
          </label>
          <label className="block mb-2">
            <strong>Marca: </strong>
            {item.marca}
          </label>
          <label className="block mb-2">
            <strong>Graduación: </strong>
            {item.graduacion}
          </label>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <label className="block mb-2" htmlFor="name">
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 mb-4"
        />

        <label className="block mb-2" htmlFor="category">
          Categoría:
        </label>
        <select
          className="capitalize w-full border p-2 mb-4"
          id="category"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "Todas las categorías" : cat}
            </option>
          ))}
        </select>

        <label className="block mb-2" htmlFor="genero">
          Género:
        </label>
        <select
          className="capitalize w-full border p-2 mb-4"
          id="genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          {generosUnicos.map((gen) => (
            <option key={gen} value={gen}>
              {gen === "all" ? "Todos los géneros" : gen}
            </option>
          ))}
        </select>

        <label className="block mb-2" htmlFor="marca">
          Marca:
        </label>
        <select
          className="capitalize w-full border p-2 mb-4"
          id="marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        >
          {marcasUnicas.map((mar) => (
            <option key={mar} value={mar}>
              {mar === "all" ? "Todas las marcas" : mar}
            </option>
          ))}
        </select>

        <button onClick={buscar} className="bg-blue-500 text-white p-2">
          Buscar
        </button>
      </div>

      <div id="resultados">{mostrarResultados()}</div>
    </div>
  );
};

export default SearchAdvanced;
