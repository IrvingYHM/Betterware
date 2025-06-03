self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
  event.waitUntil(clients.claim());
});

if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, r) => {
    const l =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[l]) return;
    let a = {};
    const t = (e) => n(e, l),
      o = { module: { uri: l }, exports: a, require: t };
    s[l] = Promise.all(i.map((e) => o[e] || t(e))).then((e) => (r(...e), a));
  };
}
define(["./workbox-b5a9f10e"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: "assets/an-d9f4fed4.png", revision: null },
        { url: "assets/burgerMenu-ca7dbd1a.png", revision: null },
        { url: "assets/caihqr-dc5dfed6.png", revision: null },
        { url: "assets/error500-6a184308.png", revision: null },
        { url: "assets/index-5836310a.js", revision: null },
        { url: "assets/index-5890d0e9.css", revision: null },
        { url: "assets/index-73fd693a.css", revision: null },
        { url: "assets/index-e6ecefd1.js", revision: null },
        { url: "assets/lentes2-3a223d85.png", revision: null },
        { url: "assets/logo-88ed144e.png", revision: null },
        { url: "assets/noEncontrados-fe1d0a6e.png", revision: null },
        { url: "assets/politica-1bb7d266.png", revision: null },
        { url: "assets/user-01-b007ff3f.png", revision: null },
        { url: "assets/Venta-70cfc5cd.png", revision: null },
        { url: "final.css", revision: "816e0e28b1dacea163efb94ce11dd779" },
        { url: "index.html", revision: "11f6180b1f5c9db6dbd1b6ce39cbe02d" },
        {
          url: "service-worken.js",
          revision: "a8ff4bc6d5ddbcafdc5c73b5031d6939",
        },
        { url: "vite.svg", revision: "8e3a10e157f75ada21ab742c022d5430" },
        {
          url: "manifest.webmanifest",
          revision: "207ce2156a38ffa0202f06963f4aa37b",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))
    ),
    e.registerRoute(
      /https:\/\/backopt-production.up.railway.app\/productos\/productos/,
      new e.StaleWhileRevalidate({
        cacheName: "productos-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e }) =>
        "document" === e.destination ||
        "script" === e.destination ||
        "style" === e.destination,
      new e.CacheFirst({
        cacheName: "app-shell-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e }) => "image" === e.destination,
      new e.CacheFirst({
        cacheName: "images-cache",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.initialize({});
});

self.addEventListener("push", function (event) {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    console.error("Error al parsear el payload de la notificación:", error);
  }

  const options = {
    body: data.body || "Tienes una nueva notificación",
    icon: data.icon || "/src/img/notificacion.jpg",
    badge: data.badge || "/badge.png",
    image: data.image,
    vibrate: data.vibrate || [100, 50, 100],
    actions: data.actions || [],
    data: data,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Notificación", options)
  );
});

self.addEventListener("notificationclick", function (event) {
  const data = event.notification.data || {};
  event.notification.close();

  // Verifica si la URL existe en los datos
  if (data.actions && data.actions[0] && data.actions[0].url) {
    event.waitUntil(clients.openWindow(data.actions[0].url));
  } else {
    event.waitUntil(clients.openWindow("/"));
  }
});
