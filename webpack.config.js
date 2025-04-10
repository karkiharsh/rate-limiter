const path = require("path");

module.exports = {
  entry: "./src/test-api/api.ts",
  target: "node", // Important for Node.js apps
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true, // Enable auto-rebuild
};
