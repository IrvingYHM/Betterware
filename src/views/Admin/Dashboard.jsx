import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  BookOpen, 
  Users, 
  UserPlus, 
  Trophy, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Star,
  Target,
  Calendar,
  Bell,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Gift,
  Crown,
  Award,
  Activity,
  Clock,
  MapPin,
  Phone,
  Mail,
  TrendingDown,
  ChevronRight,
  RefreshCw,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from 'recharts';

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

  // Datos específicos para las secciones de Betterware
  const sectionMetrics = {
    inicio: {
      ventasHoy: '$45,230',
      pedidosActivos: 127,
      clientesNuevos: 23,
      promocionesActivas: 8
    },
    productos: {
      totalProductos: 2847,
      categoriasActivas: 15,
      stockBajo: 34,
      masVendidos: 156
    },
    catalogos: {
      catalogosPublicados: 12,
      descargas: 3420,
      visualizaciones: 15600,
      conversion: '8.2%'
    },
    clientes: {
      clientesActivos: 4521,
      clientesVIP: 287,
      satisfaccion: '94%',
      retencion: '78%'
    },
    afiliados: {
      afiliadosActivos: 156,
      comisionesGeneradas: '$12,450',
      ventasAfiliados: 89,
      topAfiliado: 'María González'
    },
    retos: {
      retosActivos: 5,
      participantes: 234,
      premiosEntregados: 45,
      proximoReto: '15 días'
    }
  };

  const salesData = [
    { mes: 'Ene', ventas: 185000, afiliados: 25000, retos: 8000 },
    { mes: 'Feb', ventas: 210000, afiliados: 32000, retos: 12000 },
    { mes: 'Mar', ventas: 195000, afiliados: 28000, retos: 15000 },
    { mes: 'Abr', ventas: 245000, afiliados: 38000, retos: 18000 },
    { mes: 'May', ventas: 265000, afiliados: 42000, retos: 22000 },
    { mes: 'Jun', ventas: 290000, afiliados: 48000, retos: 25000 }
  ];

  const productCategories = [
    { name: 'Cocina', productos: 856, ventas: 35, color: colors.primary },
    { name: 'Organización', productos: 642, ventas: 28, color: colors.secondary },
    { name: 'Baño', productos: 523, ventas: 22, color: colors.accent },
    { name: 'Limpieza', productos: 387, ventas: 15, color: colors.dark }
  ];

  const topAffiliates = [
    { name: 'María González', ventas: '$8,450', comision: '$1,690', nivel: 'Oro' },
    { name: 'Carlos Mendoza', ventas: '$6,230', comision: '$1,246', nivel: 'Plata' },
    { name: 'Ana López', ventas: '$5,890', comision: '$1,178', nivel: 'Plata' },
    { name: 'Luis Martínez', ventas: '$4,560', comision: '$912', nivel: 'Bronce' }
  ];

  const activeRetos = [
    { name: 'Reto Cocina Perfecta', participantes: 89, premio: '$500', vence: '12 días', progress: 75 },
    { name: 'Organiza tu Hogar', participantes: 67, premio: 'Set Premium', vence: '8 días', progress: 60 },
    { name: 'Limpieza Express', participantes: 45, premio: '$300', vence: '5 días', progress: 90 },
    { name: 'Baño Spa', participantes: 33, premio: 'Kit Baño', vence: '20 días', progress: 40 }
  ];

  const catalogDownloads = [
    { catalogo: 'Catálogo Primavera 2024', descargas: 1245, fecha: '15 Mar 2024', trend: 'up' },
    { catalogo: 'Especial Cocina', descargas: 987, fecha: '8 Mar 2024', trend: 'up' },
    { catalogo: 'Organización Total', descargas: 756, fecha: '1 Mar 2024', trend: 'down' },
    { catalogo: 'Catálogo General', descargas: 432, fecha: '22 Feb 2024', trend: 'up' }
  ];

  const menuSections = [
    { id: 'inicio', label: 'Inicio', icon: Home, color: colors.primary },
    { id: 'productos', label: 'Productos', icon: Package, color: colors.secondary },
    { id: 'catalogos', label: 'Catálogos', icon: BookOpen, color: colors.accent },
    { id: 'clientes', label: 'Clientes', icon: Users, color: colors.warning },
    { id: 'afiliados', label: 'Afiliados', icon: UserPlus, color: colors.danger },
    { id: 'retos', label: 'Retos', icon: Trophy, color: colors.success }
  ];

  const AnimatedStatCard = ({ title, value, subtitle, icon: Icon, trend, change, bgColor, textColor }) => (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500" 
           style={{ background: `linear-gradient(135deg, ${bgColor}, ${textColor})` }}></div>
      
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                 style={{ backgroundColor: bgColor }}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1 transition-all duration-300 group-hover:scale-105">
                {value}
              </p>
              {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
          </div>
          {trend && (
            <div className={`flex items-center text-sm font-bold transition-all duration-300 group-hover:scale-110 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              <span className="ml-1">{change}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const AnimatedCard = ({ title, children, headerColor = colors.primary, headerActions = null }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      <div className="px-6 py-5 border-b border-gray-100 relative overflow-hidden"
           style={{ background: `linear-gradient(135deg, ${headerColor}, ${colors.secondary})` }}>
        <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-700"></div>
        <div className="relative flex items-center justify-between">
          <h3 className="text-xl font-bold text-white drop-shadow-sm">{title}</h3>
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const getMetricsForSection = (section) => {
    const metrics = sectionMetrics[section];
    const configs = {
      inicio: [
        { title: 'Ventas del Día', value: metrics.ventasHoy, icon: DollarSign, trend: 'up', change: '+12.5%', bgColor: colors.primary, textColor: colors.secondary },
        { title: 'Pedidos Activos', value: metrics.pedidosActivos, icon: ShoppingCart, trend: 'up', change: '+8.2%', bgColor: colors.secondary, textColor: colors.primary },
        { title: 'Clientes Nuevos', value: metrics.clientesNuevos, icon: Users, trend: 'up', change: '+15.3%', bgColor: colors.warning, textColor: colors.dark },
        { title: 'Promociones', value: metrics.promocionesActivas, icon: Gift, trend: 'up', change: '+2', bgColor: colors.success, textColor: colors.primary }
      ],
      productos: [
        { title: 'Total Productos', value: metrics.totalProductos, icon: Package, subtitle: '15 categorías', bgColor: colors.primary, textColor: colors.secondary },
        { title: 'Categorías Activas', value: metrics.categoriasActivas, icon: BarChart3, subtitle: 'todas funcionando', bgColor: colors.secondary, textColor: colors.primary },
        { title: 'Stock Bajo', value: metrics.stockBajo, icon: Activity, subtitle: 'requieren atención', bgColor: colors.danger, textColor: colors.dark },
        { title: 'Más Vendidos', value: metrics.masVendidos, icon: Star, subtitle: 'este mes', bgColor: colors.success, textColor: colors.primary }
      ],
      catalogos: [
        { title: 'Catálogos Publicados', value: metrics.catalogosPublicados, icon: BookOpen, subtitle: '4 este mes', bgColor: colors.accent, textColor: colors.secondary },
        { title: 'Descargas Totales', value: metrics.descargas, icon: Download, trend: 'up', change: '+18.4%', bgColor: colors.primary, textColor: colors.secondary },
        { title: 'Visualizaciones', value: metrics.visualizaciones, icon: Eye, trend: 'up', change: '+22.1%', bgColor: colors.secondary, textColor: colors.primary },
        { title: 'Conversión', value: metrics.conversion, icon: Target, trend: 'up', change: '+1.2%', bgColor: colors.success, textColor: colors.primary }
      ],
      clientes: [
        { title: 'Clientes Activos', value: metrics.clientesActivos, icon: Users, trend: 'up', change: '+15.2%', bgColor: colors.warning, textColor: colors.dark },
        { title: 'Clientes VIP', value: metrics.clientesVIP, icon: Crown, subtitle: '6.3% del total', bgColor: colors.danger, textColor: colors.dark },
        { title: 'Satisfacción', value: metrics.satisfaccion, icon: Star, trend: 'up', change: '+2.1%', bgColor: colors.success, textColor: colors.primary },
        { title: 'Retención', value: metrics.retencion, icon: Award, trend: 'up', change: '+5.3%', bgColor: colors.primary, textColor: colors.secondary }
      ],
      afiliados: [
        { title: 'Afiliados Activos', value: metrics.afiliadosActivos, icon: UserPlus, trend: 'up', change: '+12', bgColor: colors.danger, textColor: colors.dark },
        { title: 'Comisiones', value: metrics.comisionesGeneradas, icon: DollarSign, trend: 'up', change: '+18.5%', bgColor: colors.primary, textColor: colors.secondary },
        { title: 'Ventas Afiliados', value: metrics.ventasAfiliados, icon: TrendingUp, trend: 'up', change: '+25.2%', bgColor: colors.secondary, textColor: colors.primary },
        { title: 'Top Afiliado', value: metrics.topAfiliado, icon: Trophy, subtitle: '$8,450 este mes', bgColor: colors.success, textColor: colors.primary }
      ],
      retos: [
        { title: 'Retos Activos', value: metrics.retosActivos, icon: Trophy, subtitle: '2 por finalizar', bgColor: colors.success, textColor: colors.primary },
        { title: 'Participantes', value: metrics.participantes, icon: Users, trend: 'up', change: '+45', bgColor: colors.warning, textColor: colors.dark },
        { title: 'Premios Entregados', value: metrics.premiosEntregados, icon: Gift, subtitle: 'este mes', bgColor: colors.primary, textColor: colors.secondary },
        { title: 'Próximo Reto', value: metrics.proximoReto, icon: Calendar, subtitle: 'para finalizar', bgColor: colors.danger, textColor: colors.dark }
      ]
    };
    return configs[section] || configs.inicio;
  };

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
        <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-30">
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 w-64 focus:ring-blue-500"
                  />
                </div>

                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 focus:ring-blue-500"
                >
                  <option value="dia">Hoy</option>
                  <option value="semana">Esta semana</option>
                  <option value="mes">Este mes</option>
                  <option value="año">Este año</option>
                </select>

                <button className="p-3 text-gray-500 hover:text-blue-600 relative transition-all duration-300 rounded-xl hover:bg-blue-50">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                </button>

                <button className="flex items-center space-x-2 px-6 py-3 text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Nuevo</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getMetricsForSection(activeSection).map((metric, index) => (
              <AnimatedStatCard key={index} {...metric} />
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Section */}
            <AnimatedCard 
              title={`Tendencias - ${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}`}
              headerColor={menuSections.find(s => s.id === activeSection)?.color}
              headerActions={[
                <button key="refresh" className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300">
                  <RefreshCw className="w-5 h-5 text-white" />
                </button>,
                <button key="maximize" className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300">
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              ]}
            >
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id={`colorGradient-${activeSection}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={menuSections.find(s => s.id === activeSection)?.color} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={menuSections.find(s => s.id === activeSection)?.color} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="mes" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke={menuSections.find(s => s.id === activeSection)?.color}
                    fillOpacity={1} 
                    fill={`url(#colorGradient-${activeSection})`}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </AnimatedCard>

            {/* Categories/Products */}
            <AnimatedCard 
              title="Distribución por Categorías"
              headerColor={colors.secondary}
            >
              <div className="space-y-4">
                {productCategories.map((category, index) => (
                  <div key={index} className="group p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110" 
                             style={{ backgroundColor: category.color }}></div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                            {category.name}
                          </p>
                          <p className="text-sm text-gray-600">{category.productos} productos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:scale-105">
                          {category.ventas}%
                        </p>
                        <p className="text-sm text-gray-600">de ventas</p>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${category.ventas}%`,
                          backgroundColor: category.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* Section Specific Content */}
          {activeSection === 'afiliados' && (
            <AnimatedCard title="Top Afiliados del Mes" headerColor={colors.danger}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Afiliado</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Ventas</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Comisión</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Nivel</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topAffiliates.map((affiliate, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-300">
                        <td className="py-4 px-4 font-medium">{affiliate.name}</td>
                        <td className="py-4 px-4 text-green-600 font-bold">{affiliate.ventas}</td>
                        <td className="py-4 px-4 text-blue-600 font-bold">{affiliate.comision}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            affiliate.nivel === 'Oro' ? 'bg-yellow-100 text-yellow-800' :
                            affiliate.nivel === 'Plata' ? 'bg-gray-100 text-gray-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {affiliate.nivel}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-300">
                              <Eye className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-300">
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedCard>
          )}

          {activeSection === 'retos' && (
            <AnimatedCard title="Retos Activos" headerColor={colors.success}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeRetos.map((reto, index) => (
                  <div key={index} className="group p-6 border-2 border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {reto.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{reto.participantes} participantes</p>
                        <p className="text-sm font-medium mt-2" style={{ color: colors.success }}>
                          Premio: {reto.premio}
                        </p>
                      </div>
                      <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                        {reto.vence}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progreso</span>
                        <span className="text-sm font-bold text-gray-900">{reto.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${reto.progress}%`,
                            backgroundColor: colors.success
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          )}

          {activeSection === 'catalogos' && (
            <AnimatedCard title="Rendimiento de Catálogos" headerColor={colors.accent}>
              <div className="space-y-4">
                {catalogDownloads.map((catalogo, index) => (
                  <div key={index} className="group flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-transparent rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                           style={{ backgroundColor: colors.accent }}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {catalogo.catalogo}
                        </p>
                        <p className="text-sm text-gray-600">{catalogo.fecha}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:scale-105">
                          {catalogo.descargas}
                        </p>
                        <p className="text-sm text-gray-600">descargas</p>
                      </div>
                      <div className={`flex items-center ${
                        catalogo.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {catalogo.trend === 'up' ? 
                          <TrendingUp className="w-5 h-5" /> : 
                          <TrendingDown className="w-5 h-5" />
                        }
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          )}

          {activeSection === 'productos' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedCard title="Productos con Stock Bajo" headerColor={colors.danger}>
                <div className="space-y-3">
                  {[
                    { name: 'Set Cuchillos Premium', stock: 8, categoria: 'Cocina' },
                    { name: 'Organizador Modular', stock: 12, categoria: 'Organización' },
                    { name: 'Kit Limpieza Eco', stock: 5, categoria: 'Limpieza' },
                    { name: 'Contenedores Herméticos', stock: 15, categoria: 'Cocina' }
                  ].map((producto, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-300">
                      <div>
                        <p className="font-medium text-gray-900">{producto.name}</p>
                        <p className="text-sm text-gray-600">{producto.categoria}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">{producto.stock}</p>
                        <p className="text-xs text-gray-600">unidades</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>

              <AnimatedCard title="Productos Más Vendidos" headerColor={colors.success}>
                <div className="space-y-3">
                  {[
                    { name: 'Organizador de Closet', ventas: 234, revenue: '$18,720' },
                    { name: 'Set Cocina Completo', ventas: 189, revenue: '$28,350' },
                    { name: 'Kit Baño Premium', ventas: 156, revenue: '$12,480' },
                    { name: 'Limpiador Multiusos', ventas: 142, revenue: '$4,260' }
                  ].map((producto, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                             style={{ backgroundColor: colors.success }}>
                          <span className="text-white text-sm font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{producto.name}</p>
                          <p className="text-sm text-gray-600">{producto.ventas} ventas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{producto.revenue}</p>
                        <p className="text-xs text-gray-600">ingresos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>
          )}

          {activeSection === 'clientes' && (
            <AnimatedCard title="Clientes Recientes" headerColor={colors.warning}>
              <div className="space-y-4">
                {[
                  { name: 'María Fernández', email: 'm.fernandez@email.com', gasto: '$2,450', tipo: 'VIP', ultimaCompra: '2 días' },
                  { name: 'Carlos Mendoza', email: 'c.mendoza@email.com', gasto: '$1,230', tipo: 'Regular', ultimaCompra: '5 días' },
                  { name: 'Ana López', email: 'a.lopez@email.com', gasto: '$3,890', tipo: 'VIP', ultimaCompra: '1 día' },
                  { name: 'Luis Martínez', email: 'l.martinez@email.com', gasto: '$890', tipo: 'Regular', ultimaCompra: '8 días' }
                ].map((cliente, index) => (
                  <div key={index} className="group flex items-center justify-between p-5 bg-gradient-to-r from-yellow-50 to-transparent rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                           style={{ backgroundColor: colors.warning }}>
                        <span className="text-white font-bold">
                          {cliente.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{cliente.name}</p>
                        <p className="text-sm text-gray-600">{cliente.email}</p>
                        <p className="text-xs text-gray-500">Última compra: hace {cliente.ultimaCompra}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{cliente.gasto}</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        cliente.tipo === 'VIP' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {cliente.tipo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;