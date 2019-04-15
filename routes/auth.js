
const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/require', (req, res) => {
  if (req.session.user) {
    User
      .findOne({ _id: req.session.user._id })
      .then(user => {
        res.send(user.serialize());
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});

router.post('/register', (req, res) => {
  // Добавить валидацию данных (в частности имени пользователя)
    new User(req.body)
      .save()
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(err.code == 11000 ? 403 : 500);
        
      });

  // new User(req.body)
  // .save()
  // .then(user => {
  //   console.log(`User ${user.username} is successfully registeted`);
  // // Добавить уведомление по имейлу и активацию аккаунта (верификацию имейла)
  // })
  // .catch(err => {
  //   console.log(err);
  // });
});

router.post('/login', (req, res) => {

  User.authenticate(req.body, (authResult, user) => {

    const status = User.AUTH_RESULTS;

    switch (authResult) {

      case status.SUCCESS:
        req.session.user = user;
        res.send(user.serialize());
        break;

      case status.INVALID_USERNAME:
        res.sendStatus(403);
        break;

      case status.INVALID_PASSWORD:
        res.sendStatus(403);
        break;

      default:
        res.sendStatus(500);
        break;
    }
  });
});

router.get('/logout', (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    res.send('logged out!');
  } else {
    res.send('Your were not logged in!');
  }
});

module.exports = router;