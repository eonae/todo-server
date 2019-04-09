const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

router.get('/tasks', (req, res) => {
  debugger;
  if (req.session.user) {
    Task.find({ userId: req.session.user._id })
        .then(tasks => {
          res.send(tasks);
        });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;