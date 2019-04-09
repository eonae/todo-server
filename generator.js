const mongoose = require('mongoose');
const { mongoUri } = require('./config');
const User = require('./models/User');
const Task = require('./models/Task');


mongoose.connect(mongoUri);

mongoose.connection.on('open', () => {
  console.log('connection open');

  mongoose.connection.db
  .dropDatabase()
  .then(() => {
    return User.create([
      {
        username: 'eonae',
        email: 'eonae.white@gmail.com',
        password: 'farcajst'
      },
      {
        username: 'tionil',
        email: 'tionil@gmail.com',
        password: 'ujpGhGZ6'
      }
    ])
  })
  .then(users => {
    return Task.create([
      {
        userId: users[0]._id,
        text: 'Learn meaning of "this" in JavaScript',
        isCompleted: true
      },
      {
        userId: users[0]._id,
        text: 'Build api on node.js using express framework',
        notes: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dicta optio deserunt error sint est, vitae quasi vero mollitia, dolore ipsa doloremque quia quos ut, repellendus voluptates repellat consectetur distinctio.'
      },
      {
        userId: users[0]._id,
        text: 'Send something as a homework for JS intermediate course',
        isCompleted: false,
        notes: 'some notes'
      },
      {
        userId: users[1]._id, 
        text: 'Do something else',
        isCompleted: true,
        notes: ''
      },
      {
        userId: users[1]._id,
        text: 'Do something else',
        isCompleted: false
      },
      {
        userId: users[1]._id,
        text: 'Do something else'
      },
      {
        userId: users[0]._id,
        text: 'Send something as a homework for JS intermediate course',
        notes: 'some notes'
      },
      {
        userId: users[1]._id, 
        text: 'Do something else',
        isCompleted: true,
        isStarred: true
      },
      {
        userId: users[1]._id,
        text: 'Do something else',
      },
      {
        userId: users[1]._id,
        text: 'Do something else'
      }
    ])
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => {
    // console.log(err);
    mongoose.connection.close();
  });
});