// var webpack = require("webpack");
// var webpackDevMiddleware = require("webpack-dev-middleware");
// var webpackHotMiddleware = require("webpack-hot-middleware");
// var browserSync = require("browser-sync").create();
// var webpackConfig = require("./webpack.config");
// var bundler = webpack(webpackConfig);

// function defaultTask(cb) {
//   cb();
// }

// gulp.task("browser", () => {
//   var bundle = webpack(webpackConfig.Config, (err) => {
//     err ? console.log(err) : null;
//   });
//   browserSync.init({
//     server: {
//       baseDir: "./build",
//       index: "index.html",
//     },
//     middleware: [
//       webpackDevMidlleware(bundle, {
//         publicPath: webpackConfig.Config.output.publicPath,
//         stats: { color: true },
//       }),
//       webpackHotMiddleware(bundle),
//     ],
//     files: ["./src/**/*.js"],
//   });
// });

// exports.default = defaultTask;
