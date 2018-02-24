const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });

  // console.log('__dirname', __dirname)
  // path.join(__dirname + '/../')

 // other routes
//  fs.readdirSync(__dirname + '/subroutes/').forEach((file) => {
//   require(`./subroutes/${file.substr(0, file.indexOf('.'))}`)(app);
// });

};
