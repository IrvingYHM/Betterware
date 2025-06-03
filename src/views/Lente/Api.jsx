import { openDB } from 'idb';

async function getDB() {
  return openDB('productos-db', 1, {
    upgrade(db) {
      db.createObjectStore('productos');
    },
  });
}

// Función para cachear los datos obtenidos de la API en IndexedDB
async function cacheProductos(data) {
  const db = await getDB();
  await db.put('productos', data, 'lista');
}

// Función para obtener los datos cacheados de IndexedDB
async function getCachedProductos() {
  const db = await getDB();
  return await db.get('productos', 'lista');
}

// Función principal para obtener productos, usando cache si no hay conexión
export async function obtenerProductos() {
  try {
    const response = await fetch("https://backopt-production.up.railway.app/productos/Productos", {
      headers: {
        'ngrok-skip-browser-warning': 'true',  // Ignora advertencias de navegador de ngrok
        'Content-Type': 'application/json',    // Tipo de contenido
      }
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }

    // Procesa la respuesta a JSON y cachea los datos
    const data = await response.json();
    await cacheProductos(data);  // Cachea los datos cuando hay conexión
    return data;
  } catch (error) {
    console.log("Fallo en la red, cargando desde la caché:", error);

    // Si falla, intenta cargar desde la caché de IndexedDB
    const cachedData = await getCachedProductos();
    return cachedData || [];  // Devuelve la caché o un array vacío si no hay nada cacheado
  }
}
