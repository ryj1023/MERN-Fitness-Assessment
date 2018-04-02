// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  // db: 'mongodb://ryanj:Focus0816@ds221609.mlab.com:21609/fa_user_data',
  //  db_dev: 'mongodb://localhost/users',
  db: process.env.MONGOLAB_URI,
  db_dev: process.env.MONGOLAB_URI,
};
