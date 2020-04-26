module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/"
  // pwa: {
  //   name: "Score Pad",
  //   themeColor: "#4DBA87",
  //   msTileColor: "#000000",
  //   appleMobileWebAppCapable: "yes",
  //   appleMobileWebAppStatusBarStyle: "black",

  // configure the workbox plugin
  // workboxPluginMode: "InjectManifest",
  // workboxOptions: {
  // swSrc is required in InjectManifest mode.
  // swSrc: "dev/sw.js",
  // ...other Workbox options...
  // },
  // },
};
