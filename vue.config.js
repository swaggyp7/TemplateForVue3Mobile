const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      fallback: {
        path: require.resolve("path-browserify"),
        querystring: require.resolve("querystring-es3"),
      },
    },
  },
});
