import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'; // Importa el idioma español

const AgregarCita = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const buttonClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  
  return (
    <div className="py-20">
      <h1 className="text-center text-xl font-black ">Agregar Cita</h1>

      <div className="bg-gray-100 py-4 px-6 rounded-lg shadow-md max-w-4xl mx-auto mt-8 flex">
        <form className="w-full" action="">
          <div className="mb-4">
            <label htmlFor="Nombre" className="block text-sm font-medium text-gray-800 mb-1">Nombre:</label>
            <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="Nombre" className="block text-sm font-medium text-gray-800 mb-1">Apellido Paterno:</label>
            <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="Nombre" className="block text-sm font-medium text-gray-800 mb-1">Apellido Materno:</label>
            <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full" />
          </div>

          <div className="mb-4">
            <label htmlFor="Nombre" className="block text-sm font-medium text-gray-800 mb-1">Numero de telefono:</label>
            <input type="num" className="border border-gray-300 rounded-md py-2 px-3 w-full" />
          </div>
          <div className='mb-4'>
          <label htmlFor="calendario" className="block text-sm font-medium text-black  mb-1">Horario:</label>
            <input type="text" />
          </div>
          <div className='flex items-center'>
        <button className={buttonClasses}>Crear cita</button>
        </div>
        </form>

        <div className="w-1/3 ml-8">
          <div className="mb-4">
            <label htmlFor="calendario" className="block text-sm font-medium text-black text-center mb-1">Seleccione la fecha que este disponible:</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              inline
               locale={es} // Configura el idioma español
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholderText="Seleccione una fecha"
              dateFormat="dd/MM/yyyy"
            />



          </div>

        </div>
      </div>
    </div>
  );
};

export default AgregarCita;


