import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", 
      manifest: {
        name: "OptiCenter Huejutla",
        short_name: "Opticenter",
        description: "Aplicación web progresiva para OptiCenter Huejutla",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "https://res.cloudinary.com/dlrixqhln/image/upload/v1730020907/jb2g4qjct7darl5gbk9q.jpg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://res.cloudinary.com/dlrixqhln/image/upload/v1730020914/nz3yhrnx3kufxres1yda.jpg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "https://res.cloudinary.com/dlrixqhln/image/upload/v1731362330/ntyec6gl3wzo3m56oxdf.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "https://res.cloudinary.com/dlrixqhln/image/upload/v1731362301/hyy6uopwdlaggzenzumj.png",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}", "offline.html"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern:
              /https:\/\/backopt-production.up.railway.app\/productos\/productos/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "productos-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "app-shell-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
        offlineGoogleAnalytics: true,
        navigateFallback: "/index.html", 
      },
      devOptions: {
        enabled: false, 
      },
      injectRegister: {
        sw: '/service-worken.js', 
      },
    }),
  ],
});
