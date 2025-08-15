# Sistema de Pedidos - Betterware

## Descripción

Se ha implementado un sistema completo de pedidos con pago contra entrega, donde el administrador se contacta con el cliente para coordinar el depósito bancario y el envío.

## Características Principales

### 🛒 **Para Clientes**
- **Proceso de pedido simplificado**: Los clientes crean pedidos directamente desde el carrito
- **Uso de direcciones del perfil**: Se utiliza la dirección registrada en el perfil del usuario
- **Información de contacto del admin**: WhatsApp, teléfono, y datos bancarios
- **Seguimiento de pedidos**: Los clientes pueden ver el estado de sus pedidos
- **Pago contra entrega**: No se requiere pago online inmediato
- **Costo de envío determinado por admin**: El cliente no paga envío hasta que el admin lo calcule

### 👨‍💼 **Para Administradores**
- **Panel de gestión completo**: Ver, filtrar y gestionar todos los pedidos
- **Calculadora de costos de envío**: Editor para determinar el costo de envío por pedido
- **Actualización de estados**: Cambiar estados de pedido y envío en tiempo real
- **Información detallada**: Datos del cliente, productos, y detalles de entrega completos
- **Contacto directo**: Enlaces para llamar o enviar WhatsApp al cliente
- **Estadísticas rápidas**: Contadores de pedidos por estado

## Componentes Creados

### **Servicios y Contextos**
- `src/service/pedidos.js` - Configuración de API, costos de envío, y funciones utilitarias
- `src/context/PedidosContext.jsx` - Context para manejo de estado de pedidos

### **Componentes**
- `src/components/Pedidos/SelectorDireccion.jsx` - Selector de dirección del perfil
- `src/components/Pedidos/FormularioPedido.jsx` - Formulario completo de pedido
- `src/components/Pedidos/ConfirmacionPedido.jsx` - Vista de confirmación
- `src/components/Pedidos/EditorCostoEnvio.jsx` - Editor de costos de envío para admin

### **Páginas**
- `src/views/Productos/CheckoutPedido.jsx` - Página de checkout completa
- `src/views/MisPedidos.jsx` - Lista de pedidos para clientes
- `src/views/Admin/Pedidos/GestionPedidos.jsx` - Panel administrativo

## Rutas Agregadas

### **Clientes**
- `/checkout-pedido` - Proceso de checkout (protegida)
- `/mis-pedidos` - Lista de pedidos del cliente (protegida)

### **Administradores**
- `/GestionPedidos` - Panel de gestión de pedidos

## Flujo del Sistema

### **1. Cliente realiza pedido**
1. Agrega productos al carrito
2. Va a `/carrito` y hace clic en "Realizar Pedido"
3. Completa el formulario en `/checkout-pedido`:
   - Ve su dirección registrada en el perfil (puede editarla si es necesario)
   - Llena datos personales de contacto
   - Ve información de contacto del admin
   - Ve que el costo de envío será determinado por el admin
4. Confirma el pedido
5. Ve la confirmación con instrucciones de pago

### **2. Administrador gestiona pedido**
1. Recibe notificación de nuevo pedido
2. Ve el pedido en `/GestionPedidos`
3. Calcula el costo de envío usando el editor incorporado
4. Contacta al cliente por teléfono/WhatsApp para informar el total final
5. Coordina el depósito bancario
6. Actualiza el estado del pedido (Confirmado → En Preparación → En Camino → Entregado)

## Configuración

### **Datos del Administrador**
```javascript
// src/service/pedidos.js
export const ADMIN_CONTACT = {
  nombre: "Admin Betterware",
  telefono: "+52 771 234 5678",
  whatsapp: "https://wa.me/527712345678",
  cuentaBanco: {
    banco: "BBVA",
    cuenta: "1234567890",
    clabe: "012345678901234567",
    titular: "Betterware SA de CV"
  },
  email: "admin@betterware.com"
};
```

### **Sistema de Direcciones**
El sistema utiliza las direcciones registradas en el perfil del usuario, con la siguiente estructura:
```javascript
// Estructura de dirección del cliente
{
  Calle: "Calle y número",
  Colonia: "Nombre de la colonia",
  Municipio: "Ciudad",
  Estado: "Estado",
  CP: "Código postal"
}
```

### **Costos de Envío**
Los costos de envío son determinados dinámicamente por el administrador para cada pedido, considerando:
- Distancia de entrega
- Peso y volumen del pedido
- Urgencia de la entrega
- Condiciones especiales del cliente

## Estados del Sistema

### **Estados de Pedido**
1. **Pendiente** (1) - Recién creado, esperando confirmación
2. **Confirmado** (2) - Admin confirmó y coordinó pago
3. **En Preparación** (3) - Preparando productos para envío
4. **En Camino** (4) - Pedido enviado
5. **Entregado** (5) - Pedido completado
6. **Cancelado** (6) - Pedido cancelado

### **Estados de Envío**
1. **Pendiente** (1) - Sin procesar
2. **Procesando** (2) - Preparando envío
3. **En Tránsito** (3) - En camino al cliente
4. **Entregado** (4) - Entregado exitosamente
5. **Devuelto** (5) - Devuelto al origen

## Integración con Backend

El sistema espera los siguientes endpoints en el backend:

### **Pedidos**
- `POST /pedido/agregar` - Crear nuevo pedido
- `GET /pedido/cliente/:id` - Pedidos de un cliente
- `GET /pedido/todos` - Todos los pedidos (admin)
- `PUT /pedido/actualizar/:id` - Actualizar estado de pedido

### **Detalle de Pedido**
- `POST /detallePedido/crear` - Crear detalle de pedido

### **Direcciones de Cliente**
- `GET /clientes/clientes/:id/direccion` - Obtener dirección del cliente
- `PUT /clientes/actualizar/:id/direccion` - Actualizar dirección del cliente

## Modificaciones Realizadas

### **Sistema de Pedidos Actualizado**
- **Eliminado**: Sistema de costos fijos de envío por ubicación
- **Agregado**: Editor dinámico de costos de envío para administradores
- **Modificado**: Formulario de pedido para usar direcciones del perfil
- **Mejorado**: Panel administrativo con herramientas de gestión de costos

### **Carrito Existente**
- Reemplazado botón de pago de MercadoPago por "Realizar Pedido"
- Agregada información sobre pago contra entrega y costo de envío pendiente
- Mantiene funcionalidad existente de productos y cantidades

### **App.jsx**
- Agregado `PedidosProvider` para contexto global
- Agregadas rutas para las nuevas páginas
- Mantenida compatibilidad con rutas existentes

## Características Técnicas

### **Seguridad**
- Rutas protegidas con token JWT
- Validación de datos en formularios
- Manejo de errores y estados de carga

### **UX/UI**
- Diseño responsive con Tailwind CSS
- Indicadores de progreso en checkout
- Notificaciones toast para feedback
- Modales para detalles de pedidos

### **Optimizaciones**
- Contextos para manejo eficiente de estado
- Componentes reutilizables
- Carga condicional de datos
- Agrupación de productos duplicados en carrito

## Instrucciones de Uso

### **Para Clientes**
1. **Configurar dirección**: Ve a tu perfil y asegúrate de tener una dirección registrada
2. **Realizar pedido**: Agrega productos al carrito y procede al checkout
3. **Ver pedidos**: Accede a `/mis-pedidos` para seguimiento

### **Para Administradores**
1. **Gestionar pedidos**: Accede a `/GestionPedidos` con cuenta de admin
2. **Calcular envío**: Usa el botón "Calcular Envío" en cada pedido para establecer el costo
3. **Contactar cliente**: Usa los enlaces directos para llamar o enviar WhatsApp
4. **Actualizar estados**: Cambia los estados de pedido y envío según el progreso

### **Flujo Recomendado**
1. Cliente crea pedido → Admin calcula envío → Admin contacta cliente con total final → Cliente confirma pago → Admin procesa y envía

El sistema está completamente integrado y funcional, con mejoras específicas para el manejo dinámico de costos de envío y uso de direcciones del perfil del usuario.