
export const solicitarPermiso = async () => {
  try {
    const permiso = await Notification.requestPermission();
    if (permiso === "granted") {
      console.log("Permiso para notificaciones concedido.");
      await suscribirseANotificaciones();
    } else {
      console.log("Permiso para notificaciones denegado.");
    }
  } catch (error) {
    console.error("Error al solicitar permiso para notificaciones:", error);
  }
};

export const suscribirseANotificaciones = async () => {
  try {
    console.log("Esperando a que el Service Worker esté listo...");
    const registration = await navigator.serviceWorker.ready;
    console.log("Service Worker listo:", registration);

    console.log("Intentando suscribirse al push manager...");
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BPHOXfset_t5aRNQy7WAhteVfdNhvahptMcNQh2i5WpQ-bsziDYAOEalOZLMfBqV5URaAxbl2GcxjbfApjJ2oMI')
    });

    console.log("Suscripción exitosa:", subscription);

    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
        auth: arrayBufferToBase64(subscription.getKey('auth'))
      }
    };

    console.log("Datos de la suscripción:", subscriptionData);

    if (!subscriptionData.endpoint || !subscriptionData.keys.p256dh || !subscriptionData.keys.auth) {
      console.error("Error: Datos de suscripción incompletos.");
      return;
    }

    console.log("Enviando la suscripción al backend...");
    const response = await fetch('https://backopt-production.up.railway.app/suscripcion/suscribirse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    if (response.ok) {
      console.log("Usuario suscrito exitosamente a notificaciones push.");
    } else {
      console.error("Error al suscribirse:", await response.text());
    }
  } catch (error) {
    console.error("Error al suscribirse a notificaciones push:", error);
  }
};

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
