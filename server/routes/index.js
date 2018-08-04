const fs = require('fs');
const path = require('path');
// require('../../node_modules/bootstrap/dist/css/bootstrap.min.css');

module.exports = (app) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });

};
