module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    mongodburl:
      "mongodb+srv://Daniel:KAjObl1b4UQPjjRC@cluster0.bz5mc.mongodb.net/KdShop?retryWrites=true&w=majority",
    JWT_SECRET: "The deepess secret any one has ever had",
    JWT_REFRESH_TOKEN_SECRET: "This is the refresh token secret",
    CLOUDINARY_NAME: "dkoatnxem",
    CLOUDINARY_API_KEY: "813679482114119",
    CLOUDINARY_API_SECRET: "mXKi3EF8C5TSKNebfmAhrYLHXfM",
  },
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
