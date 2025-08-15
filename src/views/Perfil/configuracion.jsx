import Fot from '../../components/Footer';
import { Link } from 'react-router-dom';
import Barra from "../../components/Navegacion/barra";
import { MapPinIcon, KeyIcon, UserIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Barra/>
      <div className='pt-40 pb-10 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <div className='flex justify-center mb-4'>
              <div className='p-3 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full'>
                <UserIcon className='h-8 w-8 text-white' />
              </div>
            </div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Configuración</h1>
            <p className='text-gray-600 text-lg'>Gestiona tu información personal y preferencias</p>
          </div>

          {/* Configuration Cards */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
            {/* Address Card */}
            <div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <div className='flex items-center mb-4'>
                  <div className='p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300'>
                    <MapPinIcon className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Dirección</h3>
                    <p className='text-gray-500 text-sm'>Gestiona tu dirección de entrega</p>
                  </div>
                </div>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  Actualiza tu dirección principal para asegurar que tus pedidos lleguen al lugar correcto.
                </p>
                <Link 
                  to='/VerDireccion'
                  className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                >
                  Ver información
                  <svg className='ml-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Password Card */}
            <div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden'>
              <div className='p-8'>
                <div className='flex items-center mb-4'>
                  <div className='p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300'>
                    <KeyIcon className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>Seguridad</h3>
                    <p className='text-gray-500 text-sm'>Cambia tu contraseña</p>
                  </div>
                </div>
                <p className='text-gray-600 mb-6 leading-relaxed'>
                  Mantén tu cuenta segura actualizando regularmente tu contraseña.
                </p>
                <Link 
                  to='/CambiarContraseñaPerfil'
                  className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                >
                  Cambiar contraseña
                  <svg className='ml-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Fot />
    </div>
  );
}

export default App;