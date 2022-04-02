const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js", // webpack default main.js
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'bundle.css' })
  ],
  module: {
    rules: [
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
        exclude: /node_modules/
      },
      // TypeScript 로더 설정
      {
        test: /\.tsx?$/i,
        use: ['ts-loader']
      }
    ],
  },
  mode: "production",
};
