
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./configuration/webpack.prod');
    break;

  case 'dev':
  case 'development':
  default:
    module.exports = require('./configuration/webpack.dev');
}
 // we need both client and server side configuration

