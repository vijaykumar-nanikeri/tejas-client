const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      root: __dirname,
      // Platform-level paths
      icons: path.resolve(__dirname, "src/assets/icons"),
      images: path.resolve(__dirname, "src/assets/images"),
      styles: path.resolve(__dirname, "src/styles"),
      constants: path.resolve(__dirname, "src/utils/constants"),
      utils: path.resolve(__dirname, "src/utils"),
      services: path.resolve(__dirname, "src/services"),
      stores: path.resolve(__dirname, "src/stores"),
      hooks: path.resolve(__dirname, "src/hooks"),
      layout: path.resolve(__dirname, "src/layout"),
      routing: path.resolve(__dirname, "src/routing"),
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      src: path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
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
};
