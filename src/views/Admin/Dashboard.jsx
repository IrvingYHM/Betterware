import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  BookOpen, 
  Users, 
  UserPlus, 
  Trophy,
  Bell,
  Search,
  Plus,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

// Importar componentes de la carpeta admin
import ProductsList from './productos/productos';
import CatalogosAd from './Catalogos/CatalogosAd';
import Clientes from './Clientes/Clientes';
import Afiliados from './Empleados/Afiliados';
import Retos from './Retos/Retos';
import InicioAdmin from './inicioadmin';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [timeFilter, setTimeFilter] = useState('mes');

  // Paleta de colores extraída del logo Betterware
  const colors = {
    primary: '#00B4D8',      // Azul turquesa principal
    secondary: '#0077B6',    // Azul más oscuro
    accent: '#90E0EF',       // Azul claro
    light: '#CAF0F8',        // Azul muy claro
    dark: '#03045E',         // Azul marino
    success: '#06FFA5',      // Verde aguamarina
    warning: '#FFB700',      // Amarillo dorado
    danger: '#FF006E'        // Rosa fucsia
  };

  const menuSections = [
    { id: 'inicio', label: 'Inicio', icon: Home, color: colors.primary },
    { id: 'productos', label: 'Productos', icon: Package, color: colors.secondary },
    { id: 'catalogos', label: 'Catálogos', icon: BookOpen, color: colors.accent },
    { id: 'clientes', label: 'Clientes', icon: Users, color: colors.warning },
    { id: 'afiliados', label: 'Afiliados', icon: UserPlus, color: colors.danger },
    { id: 'retos', label: 'Retos', icon: Trophy, color: colors.success }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transition-all duration-500 ease-in-out transform ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl`}>
        
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 border-b border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r opacity-20"
               style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}></div>
          <div className="relative flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <span className="text-white font-bold text-xl">B</span>
            </div>
            {!sidebarCollapsed && (
              <div className="transition-all duration-300">
                <h1 className="text-xl font-bold text-white">Betterware</h1>
                <p className="text-xs text-gray-400">Hogar en armonía</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8 px-4">
          {menuSections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group relative w-full flex items-center mb-2 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                style={isActive ? { 
                  background: `linear-gradient(135deg, ${section.color}, ${colors.secondary})`,
                  boxShadow: `0 8px 32px ${section.color}40`
                } : {}}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                <Icon className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${
                  sidebarCollapsed ? 'mx-auto' : 'mr-4'
                }`} />
                {!sidebarCollapsed && (
                  <span className="font-semibold transition-all duration-300 group-hover:translate-x-1">
                    {section.label}
                  </span>
                )}
                {isActive && !sidebarCollapsed && (
                  <ChevronRight className="w-5 h-5 ml-auto animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-4 top-20 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
        >
          <ChevronLeft className={`w-4 h-4 text-white transition-transform duration-300 ${
            sidebarCollapsed ? 'rotate-180' : ''
          }`} />
        </button>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className={`flex items-center transition-all duration-300 ${
            sidebarCollapsed ? 'justify-center' : 'space-x-3'
          }`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <span className="text-sm font-bold text-white">AD</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-gray-400">admin@betterware.mx</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`transition-all duration-500 ${sidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
        {/* Header */}
        <header className="bg-betterware_claro/95 backdrop-blur-sm shadow-lg border-b border-betterware sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 capitalize flex items-center">
                  {React.createElement(menuSections.find(s => s.id === activeSection)?.icon || Home, {
                    className: "w-8 h-8 mr-3",
                    style: { color: menuSections.find(s => s.id === activeSection)?.color }
                  })}
                  {activeSection}
                </h2>
                <p className="text-gray-600 mt-1">
                  {activeSection === 'inicio' && 'Resumen general de tu negocio Betterware'}
                  {activeSection === 'productos' && 'Gestión de inventario y catálogo de productos'}
                  {activeSection === 'catalogos' && 'Administración de catálogos digitales'}
                  {activeSection === 'clientes' && 'Base de datos y análisis de clientes'}
                  {activeSection === 'afiliados' && 'Red de afiliados y comisiones'}
                  {activeSection === 'retos' && 'Retos activos y gamificación'}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Barra busqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 w-64 focus:ring-blue-500"
                  />
                </div>
                
                {/* Notificaciones */}
                <button className="p-3 hover:text-blue-600 relative transition-all duration-300 rounded-xl hover:bg-blue-50">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">          
          {/* Contenido dinámico basado en la sección activa */}
          {activeSection === 'inicio' && (
            <div className="-mt-6 -mx-6">
              <InicioAdmin />
            </div>
          )}

          {/* Renderizar componentes específicos según la sección activa */}
          {activeSection === 'productos' && (
            <div className="-mt-6 -mx-6">
              <ProductsList />
            </div>
          )}
          
          {activeSection === 'catalogos' && (
            <div className="-mt-6 -mx-6">
              <CatalogosAd />
            </div>
          )}
          
          {activeSection === 'clientes' && (
            <div className="-mt-6 -mx-6">
              <Clientes />
            </div>
          )}
          
          {activeSection === 'afiliados' && (
            <div className="-mt-6 -mx-6">
              <Afiliados />
            </div>
          )}
          
          {activeSection === 'retos' && (
            <div className="-mt-6 -mx-6">
              <Retos />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;