const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // devServer: {
  //   stats: {
  //     children: false,
  //     maxModules: 0,
  //   },
  //   port: 3001,
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'static' }
      ]
  })
  ],
};

// REF
// // Generated using webpack-cli https://github.com/webpack/webpack-cli
// var webpack = require('webpack');
// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const isProduction = process.env.NODE_ENV == "production";

// const stylesHandler = isProduction
//   ? MiniCssExtractPlugin.loader
//   : "style-loader";

// const config = {
//   entry: [
//     "webpack/hot/dev-server",
//     "webpack-hot-middleware/client",
//     "./src/index.js",
//   ],
//   output: {
//     filename: 'index.js',
//     path: path.resolve(__dirname, "dist"),
//     publicPath: '/dist'
//   },
//   devServer: {
//     open: true,
//     host: "localhost",
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       template: "index.html",
//     }),

//     // Add your plugins here
//     // Learn more about plugins from https://webpack.js.org/configuration/plugins/
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/i,
//         loader: "babel-loader",
//       },
//       {
//         test: /\.css$/i,
//         use: [stylesHandler, "css-loader"],
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [stylesHandler, "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
//         type: "asset",
//       },

//       // Add your rules for custom modules here
//       // Learn more about loaders from https://webpack.js.org/loaders/
//     ],
//   },
// };

// module.exports = () => {
//   if (isProduction) {
//     config.mode = "production";

//     config.plugins.push(new MiniCssExtractPlugin());
//   } else {
//     config.mode = "development";
//   }
//   return config;
// };
