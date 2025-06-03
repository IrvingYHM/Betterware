import { useState } from 'react';
import Fot from '../components/Footer';
import Lente from '../img/lente1.png';

const Lentes = () => {
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const lentes = [
    { id: 1, nombre: 'Lentes 1', genero: 'hombres', tipo: 'de sol', precio: 50, imagen: Lente, seccion: 'lente1' },
    { id: 2, nombre: 'Lentes 2', genero: 'mujeres', tipo: 'de sol', precio: 60, imagen: 'url_imagen_2', seccion: 'lente2' },
    // ... otros lentes
  ];

  const lentesFiltrados = lentes.filter(lente =>
  (  filtro === 'todos' || lente.genero === filtro || lente.tipo === filtro) &&
  (busqueda.trim()=== '' || lente.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className='flex-center'>
      <div className='my-32'>
        <p className='text-center'>¡Descubre nuestra colección de lentes!</p>

        {/* Filtros */}
        <div className="mt-4">
          <label className="mr-2">Filtrar por:</label>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="rounded-md px-2 py-1 mt-2"
          />

          <select onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="hombres">Hombres</option>
            <option value="mujeres">Mujeres</option>
            <option value="de sol">Lentes de Sol</option>
            <option value="otros">Otros</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
        </div>

        {/* Lentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {lentesFiltrados.map(lente => (
            <div key={lente.id} className="bg-white p-4 rounded-md shadow-md">
              <img src={lente.imagen} alt={lente.nombre} className="w-36 h-32 object-cover mb-4" />
              <h2 className="text-xl font-semibold mb-2">{lente.nombre}</h2>
              <p className="text-gray-600">${lente.precio}</p>
              <p className="text-gray-600">Género: {lente.genero}</p>
              <p className="text-gray-600">Tipo: {lente.tipo}</p>
              <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md">Agregar al Carrito</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Fot />
    </div>
  );
}

export default Lentes;
