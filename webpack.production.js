const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    filename: "bundle.[contenthash].js",
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "styles.[contenthash].css" })],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
