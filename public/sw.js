if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => a(e, n),
      f = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(c.map((e) => f[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(["./workbox-b07c07c3"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/Items in card.svg.2021_08_19_06_52_42.0.svg",
          revision: "566a4442bd890ddf5d3bbbcb209c7113",
        },
        {
          url: "/_next/static/YO4ecjOyp98H8Ha7DXpWf/_buildManifest.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/YO4ecjOyp98H8Ha7DXpWf/_ssgManifest.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/framework-895f067827ebe11ffe45.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/main-97ba7d2ee0eed8215a9d.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/_app-0b0db951eb2da84cfe50.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/account-f508b23400e9748d0f5d.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/cart-a233936aea7829349602.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/contact-e4435958f6e26d836731.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/feedback-006b9465a5e5419d691c.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/find-f36121d58edcd7f4ca6b.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/index-2147270c0bbd5211369c.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/product/%5BproductId%5D-ba89809e47f7caaae211.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/pages/upload-eef4b2411f9fbd2b9212.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/chunks/webpack-fb76148cfcfb42ca18eb.js",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/3b756a6724a1f5cf4441.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/485ae52feb7dfc2a17a7.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/6a475922823d578238e9.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/be95b923986ef70d75fd.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/cce636e412a0d4dc5393.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/cd47af34930b7ffcae07.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/d90e18ccc125cd8cbd7f.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        {
          url: "/_next/static/css/e283fd0e545d497b4096.css",
          revision: "YO4ecjOyp98H8Ha7DXpWf",
        },
        { url: "/bagIcon.svg", revision: "5d34e9b295592a7204e5a1d4eba39e6b" },
        { url: "/drawing.svg", revision: "d41d8cd98f00b204e9800998ecf8427e" },
        { url: "/favicon.ico", revision: "c30c7d42707a47a3f4591831641e50dc" },
        {
          url: "/icon-192x192.png",
          revision: "42ceaec34ef5b4a23527e8915d1788f6",
        },
        {
          url: "/icon-256x256.png",
          revision: "69051085ffff5d6dd8c6ea1ca60f45ba",
        },
        {
          url: "/icon-384x384.png",
          revision: "4f243b9ae9ba990bbeb6b65b968645ae",
        },
        {
          url: "/icon-512x512.png",
          revision: "d8fe53e797d07c13b6015a9273ba091e",
        },
        { url: "/icon.png", revision: "51d8f94bfd9f1abcd8663ef467015c65" },
        {
          url: "/images/1633549443880.jfif",
          revision: "1bd0019588212c390cf27673f0207320",
        },
        {
          url: "/images/account.jpg",
          revision: "d72a122fe58ed185399902913ae76fb3",
        },
        {
          url: "/images/image1.jpg",
          revision: "7444ed99d7d34c5bb83512be3bcf587c",
        },
        {
          url: "/images/image2.jpg",
          revision: "876b2a2c5f80fd1c3b541b95962b04e0",
        },
        {
          url: "/images/image3.jpg",
          revision: "3b7cb56f42fba62c36900125784a0ed7",
        },
        {
          url: "/images/image4.jpg",
          revision: "46a9ff152ee2180327a8d6fd55063bad",
        },
        {
          url: "/images/image5.jpg",
          revision: "7be7c78759dd0a24d3c6b4122d1c0d62",
        },
        {
          url: "/images/image6.jpg",
          revision: "d72a0b89654eb5503e4ed68c25ba8825",
        },
        { url: "/manifest.json", revision: "fe81a849f49567ad4ae4ec082c02e887" },
        {
          url: "/svg/BrandLogo.svg",
          revision: "4a8f8864149ca928dd214f10c9f00ab8",
        },
        {
          url: "/svg/Facebook.svg",
          revision: "38d058fe413225ce5f6fd89017c0a189",
        },
        {
          url: "/svg/account.png",
          revision: "db63565b27b049274af654de0394e1ab",
        },
        {
          url: "/svg/bagIcon.svg",
          revision: "2d5caa2c2d4f426bc355a88da5909f19",
        },
        { url: "/svg/dolar.svg", revision: "6eae11fb886dc6d87d059ad30123bd22" },
        {
          url: "/svg/edit_pencil.svg",
          revision: "3f30e5023698d6f89d71ada4926dbee2",
        },
        {
          url: "/svg/filter.svg",
          revision: "c6377c461fd96404cf3d4a48331ee529",
        },
        {
          url: "/svg/filter.svg.2021_08_21_23_53_53.0.svg",
          revision: "9dad584d4fc393d4fc99637b53913685",
        },
        {
          url: "/svg/google_icon.svg",
          revision: "648fa9faea73bcefeebcdd3c28c94c38",
        },
        { url: "/svg/grid.svg", revision: "f449d59b810d570a895c89e50ad9ea4a" },
        {
          url: "/svg/grid.svg.2021_08_21_23_33_50.0.svg",
          revision: "01786f113f448488531a96a8778fbd7b",
        },
        { url: "/svg/icon.svg", revision: "4a8f8864149ca928dd214f10c9f00ab8" },
        { url: "/svg/info.svg", revision: "03f494a5cb1d8be676e117b1e31b4651" },
        {
          url: "/svg/search.svg",
          revision: "201c8adfd312c5e83e9802b591b6f372",
        },
        {
          url: "/svg/setting.svg",
          revision: "f40a3ee308f72f1d306eb661579c2448",
        },
        {
          url: "/svg/square.svg",
          revision: "3db39f0065e52fa9cf13ff8c04cb0f82",
        },
        { url: "/svg/trash.svg", revision: "0d10f8f10c38b84eada450482ad46fb4" },
        { url: "/vercel.svg", revision: "446dc54eb16847dcdbf01ef086fb67cc" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-media-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
