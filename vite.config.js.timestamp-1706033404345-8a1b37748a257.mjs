// vite.config.js
import { defineConfig } from "file:///C:/Users/salaz/Desktop/OptiCenter/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/salaz/Desktop/OptiCenter/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()]
  /*   server: {
      proxy: {
        '/api': 'http://localhost:5000', // Configura tu proxy si es necesario
      },
      middleware: createServer({
        // ... otras configuraciones
        server: {
          middlewareMode: true,
          // Configura una redirección 404 a tu página personalizada
          async render(ctx) {
            const { url } = ctx;
            if (!url.includes('.')) {
              // Redirige todas las rutas no coincidentes a la página de error 404
              ctx.url = '/404';
            }
          },
        },
      }),
    }, */
});
export {
  vite_config_default as default
};
