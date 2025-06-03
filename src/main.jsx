import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { solicitarPermiso } from '../src/utils/notificaciones.js';



window.addEventListener('offline', () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Estás en modo offline", {
          body: "Tu dispositivo ha perdido la conexión a Internet. Algunas funcionalidades pueden no estar disponibles.",
          icon: "https://res.cloudinary.com/dlrixqhln/image/upload/v1731409115/fgic5z13i3riwknm99hy.png", 
        });
      }
    });
  }
});

window.addEventListener('online', () => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Conexión restaurada", {
          body: "Tu dispositivo ha vuelto a conectarse a la red.",
          icon: "https://res.cloudinary.com/dlrixqhln/image/upload/v1731409115/obpx2ybekr7n3krztyky.png", 
        });
      }
    });
  }
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worken.js')
      .then((reg) => {
        console.log('Notification Service Worker registrado:', reg);
      })
      .catch((error) => {
        console.error('Error al registrar Notification Service Worker:', error);
      });
  });
}

solicitarPermiso();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
