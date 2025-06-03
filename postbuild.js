import fs from 'fs';
import path from 'path';

// Ruta del archivo generado automáticamente
const generatedFilePath = path.resolve('dist', 'sw.js'); // Ruta al archivo generado por Vite

// Ruta de tu archivo personalizado de service-worker
const customServiceWorkerPath = path.resolve('src', 'service-worker.js'); // Ajusta esto a la ruta correcta de tu archivo personalizado

// Elimina el archivo generado si existe
if (fs.existsSync(generatedFilePath)) {
  fs.unlinkSync(generatedFilePath);
  console.log('Archivo sw.js eliminado');
}

// Copia el archivo service-worker.js personalizado al directorio de salida
const destinationPath = path.resolve('dist', 'sw.js'); // Ruta donde quieres poner el archivo final
fs.copyFileSync(customServiceWorkerPath, destinationPath);

console.log('Archivo service-worker.js personalizado copiado a dist/');
