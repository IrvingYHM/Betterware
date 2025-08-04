# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Este es un proyecto de e-commerce para Betterware, una aplicación web progresiva (PWA) construida con React + Vite. La aplicación incluye funcionalidades para clientes y administradores, con módulos de productos, catálogos, citas, empleados y sistema de carrito de compras.

## Commands

### Development
- `npm run dev` - Inicia el servidor de desarrollo con Vite
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint para revisar el código

### API Backend
- API Base URL: `https://backopt-production.up.railway.app`
- La URL de autenticación está definida en `src/service/apirest.js`

## Architecture

### Core Structure
- **Frontend**: React 18 con React Router DOM para navegación
- **Styling**: Tailwind CSS con Material-UI y Material Tailwind
- **State Management**: Context API para autenticación (`AuthContext`) y carrito (`CartProvider`)
- **Build Tool**: Vite con plugin PWA para funcionalidad offline
- **Payment**: Integración con Stripe y MercadoPago

### Key Contexts
1. **AuthContext** (`src/views/AuthContext.jsx`): Maneja el estado de autenticación
2. **CartProvider** (`src/views/Productos/context/cart.jsx`): Gestiona el carrito de compras

### Route Structure
- **Public Routes**: Inicio, productos, catálogos, login, registro
- **Protected Routes**: Utiliza `RutaProtegida` component que verifica token en localStorage
- **Admin Routes**: Panel administrativo con prefijo `/` (Dashboard, productos, empleados, etc.)

### Main Modules
1. **Products**: Catálogo de productos con detalle, carrito y checkout
2. **Authentication**: Login/registro para clientes y empleados
3. **Appointments**: Sistema de citas con calendario
4. **Admin Panel**: CRUD para productos, empleados, clientes y reportes
5. **Profile**: Gestión de perfil de usuario, direcciones y pedidos

### Component Organization
- `src/components/`: Componentes reutilizables (navegación, alertas, errores)
- `src/views/`: Páginas principales organizadas por módulo
- `src/views/Admin/`: Todas las vistas del panel administrativo
- `src/views/Productos/`: Módulo completo de productos y carrito

### Key Libraries
- **UI**: Material-UI, Material Tailwind, Headless UI
- **Forms**: Formik, React Hook Form, Yup validation
- **Charts**: Chart.js, Recharts
- **Icons**: FontAwesome, React Icons, Lucide React
- **Utils**: Axios, date-fns, jwt-decode, bcryptjs

### PWA Configuration
La aplicación está configurada como PWA con:
- Service Worker personalizado en `/service-worken.js`
- Caché para productos, imágenes y recursos de la app
- Soporte offline con `offline.html`
- Manifesto configurado para "OptiCenter Huejutla"

### Styling System
- Tailwind con colores personalizados para Betterware: `betterware`, `betterware_card`, `betterware_claro`
- Colores específicos: `turquesa`, `teal` (con variantes 50-900), `azulOp`
- Configuración responsive con breakpoints extendidos

### Authentication Flow
- Token JWT almacenado en localStorage
- Componente `RutaProtegida` para rutas que requieren autenticación
- Separación entre login de clientes (`/inicioS`) y empleados (`/Login_Empleado`)