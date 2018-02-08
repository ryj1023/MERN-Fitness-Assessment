// import webpack from 'webpack';

// const browserConfig = {
//   entry: "./client/app/index.js",
//   output: {
//     path: __dirname,
//     filename: "./public/bundle.js"
//   },
//   devtool: "cheap-module-source-map",
//   module: {
//     rules: [
//       {
//         test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//         loader: "file-loader",
//         options: {
//           name: "public/media/[name].[ext]",
//           publicPath: url => url.replace(/public/, "")
//         }
//       },
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: "css-loader",
//               options: { importLoaders: 1 }
//             },
//             {
//               loader: "postcss-loader",
//               options: { plugins: [autoprefixer()] }
//             }
//           ]
//         })
//       },
//       {
//         test: /js$/,
//         exclude: /(node_modules)/,
//         loader: "babel-loader",
//         query: { presets: ["react-app"] }
//       }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin({
//       filename: "public/css/[name].css"
//     })
//   ]
// };

// const serverConfig = {
//   entry: "./server/index.js",
//   target: "node",
//   output: {
//     path: __dirname,
//     filename: "server.js",
//     libraryTarget: "commonjs2"
//   },
//   devtool: "cheap-module-source-map",
//   module: {
//     rules: [
//       {
//         test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//         loader: "file-loader",
//         options: {
//           name: "public/media/[name].[ext]",
//           publicPath: url => url.replace(/public/, ""),
//           emit: false
//         }
//       },
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: "css-loader/locals"
//           }
//         ]
//       },
//       {
//         test: /js$/,
//         exclude: /(node_modules)/,
//         loader: "babel-loader",
//         query: { presets: ["react-app"] }
//       }
//     ]
//   }
// };
// // webpack will configure both browser and server configs
// module.exports = [browserConfig, serverConfig]

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev');
}
 // we need both client and server side configuration

