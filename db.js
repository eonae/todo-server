const mongoose = require('mongoose');
const { mongoUri } = require('./config');

mongoose.connect(mongoUri, {
  useNewUrlParser: true
});

mongoose.connection.on('open', () => {
  console.log('Connected to database...');
});

module.exports = mongoose.connection;
