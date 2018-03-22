// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  // db: 'mongodb://heroku_mrtn77bc:5d12vccr3nmqm36qavj33109lm@ds229918.mlab.com:29918/heroku_mrtn77',
  db: process.env.MONGOLAB_URI,
  db_dev: 'mongodb://localhost/users',
};