
const express = require('express');
const router = express.Router();
const bCrypt = require('bcrypt');

const User = require('../models/User');

// Переписать на промисах.

router.post('/register', (req, res) => {

  bCrypt.hash(req.body.password, 10, (err, hash) => {

    if (err) {
      res.send('bCrypt hash function error\n' + err.message);
    } else {
      req.body.password = hash;
    
      const user = new User(req.body);
      user.save(err => {
        if (err)
          res.send('Save error\n' + err.message);
        else {
          debugger;
          res.send('User saved successfully');
        }
      });
    }
  });
});

router.post('/login', (req, res) => {

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      debugger;
      res.sendStatus(500);
    }

    else if (!user) {

      res.sendStatus(401);
    }
      
    else {
      bCrypt.compare(req.body.password, user.password, (err, same) => {

        if (err)
          res.send('bCrypt error!\n' + err.message);
        else {
          if (!same) {
            res.sendStatus(401);
          }
          else {
            req.session.user = user;
            req.session.authorized = true;
            debugger;
            res.send(req.session.user); // Пока так.
          }
        }
      });
    }
  });
});

router.get('/logout', (req, res) => {
  if (req.session.user) {
    delete req.session.user;
    delete req.session.authorized;
    res.send('logged out!');
  } else {
    res.send('Your were not logged in!');
  }
});

module.exports = router;