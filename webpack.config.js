const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "/src"),
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
    filename: "bundle.js",
  },
  module: {
    rules: [
      // 이미지 포멧: PNG, JP(E)G, GIF, SVG, WEBP
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        loader: "file-loader",
        options: {
          name: "assets/[contenthash].[ext]",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      // css & s[ac]ss & PostCSS
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          // bundle CSS File or Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // 컴파일 + 번들링 CSS 파일이 저장될 경로(output.path)와 이름 지정
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new HtmlWebpackPlugin({
      title: "Output Management",
      fileName: path.join(__dirname, "/dist"),
    }),
  ],
};
