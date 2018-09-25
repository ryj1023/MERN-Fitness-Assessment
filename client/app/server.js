const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('../configuration/config');
// const webpackConfig = require('../webpack.config');
const session = require('cookie-session')
const expressValidator = require('express-validator');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

// Configuration
// ================================================================================================
require('dotenv').config();
// Set up Mongoose
mongoose.connect(process.env.MONGOLAB_URI, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.once('open', function() {
  console.log('mongo connected');                      
});

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/') {
      app.render(req, res, '/', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: true,
// }));
// app.use(passport.initialize());
// app.use(expressValidator());
// app.use(passport.session({
//   secret: 'secret', saveUninitialized: false, resave: false,
// }));
// app.use(flash());
// // API routes
// require('./routes')(app);

// // if (isDev) {
// //   const compiler = webpack(webpackConfig);
// //   app.use(historyApiFallback({
// //     verbose: false
// //   }));

// //   app.use(webpackDevMiddleware(compiler, {
// //     publicPath: webpackConfig.output.publicPath,
// //     contentBase: path.resolve(__dirname, '../client/public'),
// //     stats: {
// //       colors: true,
// //       hash: false,
// //       timings: true,
// //       chunks: false,
// //       chunkModules: false,
// //       modules: false
// //     }
// //   }));

// //   app.use(webpackHotMiddleware(compiler));
// //   app.use(express.static(path.resolve(__dirname, '../dist')));
// // } else {
// //   app.use(express.static(path.resolve(__dirname, '../dist')));
// //   app.get('*', function (req, res) {
// //     res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// //     res.end();
// //   });
// // }

// // app.listen(port, '0.0.0.0', (err) => {
// //   if (err) {
// //     console.log(err);
// //   }
// //   console.info('>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
// // });

//module.exports = app;
