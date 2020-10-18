const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const minimization = {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    minimize: true,
  };

  return Object.assign(
    {
      splitChunks: {
        chunks: "all",
      },
    },
    isProd && minimization
  );
};

const devServer = () =>
  isProd
    ? undefined
    : {
        port: 8022,
        proxy: [
          {
            context: ["/api"],
            target: "http://localhost:5000",
          },
        ],
        historyApiFallback: true,
      };

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ];

  return isDev
    ? basePlugins
    : basePlugins.concat([new MiniCssExtractPlugin({ filename: "index.css" })]);
};

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          failOnError: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: ["awesome-typescript-loader"],
      },
      {
        test: /\.scss$/,
        loader: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                auto: /\.style\.\w+$/i,
                localIdentName: isDev ? "[name]__[local]" : "[hash:base64:5]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: isDev ? "source-map" : "",
  devServer: devServer(),
  optimization: optimization(),
  plugins: plugins(),
};
