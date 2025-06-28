const { merge } = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"), // Use 'static' instead of 'contentBase'
    },
    compress: true,
    port: 9000,
    open: true, // Automatically open the browser
    historyApiFallback: true, // Handle client-side routing
  },
});
