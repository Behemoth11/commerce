const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.VERCEL_ENV === "development",
  },
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
});
