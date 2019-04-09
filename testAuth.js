const mongoose = require('mongoose');
const { mongoUri } = require('./config');
const User = require('./models/User');
const Task = require('./models/Task');


const username = process.argv[2];
const password = process.argv[3];

mongoose.connect(mongoUri, {
  useNewUrlParser: true
})

mongoose.connection.on('open', () => {
  console.log('connection open');



  
});
