import { useState } from 'react';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    intClvCliente: 0,
    vchNomCliente: '',
    vchAPaterno: '',
    vchAMaterno: '',
    vchCorreo: '',
    chrSexo: '',
    dtFechaNacimiento: '',
    vchTelefono: '',
    vchPassword: '',
    Calle: '',
    intIdColonia: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Cliente guardado con éxito');
        // Puedes redirigir al usuario o realizar alguna otra acción después de guardar exitosamente.
      } else {
        console.error('Error al guardar el cliente');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  return (
    <div className='py-32 min-h-screen flex items-center justify-center'>
      <form className='w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="vchNomCliente">Nombre Cliente:</label>
        <input
          type="text"
          id="vchNomCliente"
          name="vchNomCliente"
          value={formData.vchNomCliente}
          onChange={handleChange}
          required
        />

        <label htmlFor="vchAPaterno" className='block text-gray-700 text-sm font-bold mb-2'>Apellido Paterno:</label>
        <input
          type="text"
          id="vchAPaterno"
          name="vchAPaterno"
          value={formData.vchAPaterno}
          onChange={handleChange}
          required
        />

        <label htmlFor="vchAMaterno" className='block text-gray-700 text-sm font-bold mb-2'>Apellido Materno:</label>
        <input
          type="text"
          id="vchAMaterno"
          name="vchAMaterno"
          value={formData.vchAMaterno}
          onChange={handleChange}
          required
        />

        <label htmlFor="vchCorreo" className='block text-gray-700 text-sm font-bold mb-2'>Correo Electrónico:</label>
        <input
          type="email"
          id="vchCorreo"
          name="vchCorreo"
          value={formData.vchCorreo}
          onChange={handleChange}
          required
        />

        <label htmlFor="chrSexo" className='block text-gray-700 text-sm font-bold mb-2'>Género:</label>
        <select
          id="chrSexo"
          name="chrSexo"
          value={formData.chrSexo}
          onChange={handleChange}
          required
        >
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>

        <label htmlFor="dtFechaNacimiento" className='block text-gray-700 text-sm font-bold mb-2'>Fecha de Nacimiento:</label>
        <input
          type="date"
          id="dtFechaNacimiento"
          name="dtFechaNacimiento"
          value={formData.dtFechaNacimiento}
          onChange={handleChange}
          required
        />

        <label htmlFor="vchTelefono" className='block text-gray-700 text-sm font-bold mb-2'>Teléfono:</label>
        <input
          type="tel"
          id="vchTelefono"
          name="vchTelefono"
          value={formData.vchTelefono}
          onChange={handleChange}
          required
        />

        <label htmlFor="vchPassword" className='block text-gray-700 text-sm font-bold mb-2'>Contraseña:</label>
        <input
          type="password"
          id="vchPassword"
          name="vchPassword"
          value={formData.vchPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="Calle" className='block text-gray-700 text-sm font-bold mb-2'>Calle:</label>
        <input
          type="text"
          id="Calle"
          name="Calle"
          value={formData.Calle}
          onChange={handleChange}
          required
        />

        <label htmlFor="intIdColonia" className='block text-gray-700 text-sm font-bold mb-2'>ID de Colonia:</label>
        <input
          type="number"
          id="intIdColonia"
          name="intIdColonia"
          value={formData.intIdColonia}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar Cliente</button>
      </form>
    </div>
  );
};

export default ClientForm;
