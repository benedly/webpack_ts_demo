const path = require("path");
const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: { 
    biflow: "/src/biflow.ts",
  },
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // targets: "> 1%, not dead, ie 11",
                  // targets: {"chrome": "58", "ie": "11"},
                  useBuiltIns: "usage",
                  corejs: 3,
                  shippedProposals: true,
                  modules: false,
                },
              ],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      // css & s[ac]ss & PostCSS
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          // CSS File Extract or Creates `style` nodes from JS strings
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // 이미지 포멧: PNG, JP(E)G, GIF, SVG, WEBP
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        exclude: /node_modules/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 4kb
          },
        },
        generator: {
          filename: "images/[name][ext]?[hash]",
        },
      },
    ],
  },
  plugins: [
    // style file extract
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // 빌드 된 결과물 정리
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "dist index",
      fileName: path.join(__dirname, "/dist"),
    }),
  ],
};
