self.addEventListener('install', (event) => {
  // Forzar que el nuevo service worker se active inmediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(
    // Tomar control de las pestañas abiertas para que el nuevo SW las maneje
    clients.claim()
  );
});

self.addEventListener('push', function(event) {
  let data = {};

  try {
    // Intentar parsear el payload como JSON
    data = event.data ? event.data.json() : {};
  } catch (error) {
    console.error("Error al parsear el payload de la notificación:", error);
  }

  // Configurar opciones de la notificación usando los campos del payload
  const options = {
    body: data.body || 'Tienes una nueva notificación',
    icon: data.icon || '/icon.png',  // Usa el ícono del payload o uno por defecto
    badge: data.badge || '/badge.png',  // Usa el badge del payload o uno por defecto
    image: data.image,  // Opcionalmente incluye una imagen si está en el payload
    vibrate: data.vibrate || [100, 50, 100],  // Usa el patrón de vibración o uno por defecto
    actions: data.actions || [],  // Acciones opcionales
    data: data  // Guardamos los datos completos de la notificación
  };

  // Mostrar la notificación con el título y opciones desde el payload
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notificación', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  const data = event.notification.data || {};  // Asegúrate de que los datos estén definidos
  event.notification.close();

  // Verifica si la URL existe en los datos
  if (data.actions && data.actions[0] && data.actions[0].url) {
    event.waitUntil(
      clients.openWindow(data.actions[0].url) // Abre la URL indicada en las acciones
    );
  } else {
    event.waitUntil(
      clients.openWindow('/') // Abre la página principal si no hay URL en los datos
    );
  }
});
