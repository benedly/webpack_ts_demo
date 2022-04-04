const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.ts", "./src/assets/scss/style.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // webpack default main.js
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "3.6.4",
                    targets: {
                      chrome: "87",
                    },
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // bundle CSS
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // "style-loader",npm list]
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      // TypeScript 로더 설정
      {
        test: /\.tsx?$/i,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: "bundle.css" }),
    new HtmlWebpackPlugin()
  ],
  devtool: "source-map",
  mode: "development",
};
