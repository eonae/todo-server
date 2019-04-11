const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

// Получаение списка записей.
// В будущем добавим пагинацию

router.use((req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(403);
  } else {
    next();
  }
});

router.get('/', (req, res) => {

  Task
    .find({ userId: req.session.user._id })
    .then(tasks => {
      res.send(tasks.map(task => task.serialize()));
    })
    .catch(err => {
      debugger;
      throw err;
    });
});

// Добавление или перезапись
router.post('/', (req, res) => {

    // Добавить валидацию
  delete req.body.id;
  req.body.userId = req.session.user._id;

  new Task(req.body)
    .save()
    .then(task => {
      res.send(task.serialize());
    })
    .catch(err => {
      debugger;
      throw err;
    });
});

router.put('/:id', (req, res) => {

  debugger;

  // Добавить валидацию

  Task
    .findByIdAndUpdate(req.params.id, req.body)
    .then(task => {
      if (task) {
        res.send(task.serialize());
      } else {
        res.sendStatus(400);
      }
    })
    .catch(err => {
      debugger;
      throw err;
    });

});

// Удаление записи
router.delete('/:id', (req, res) => {

  Task
    .findByIdAndDelete(req.params.id)
    .then(task => {
      if (task) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400); // Неверный запрос. Не знаю, может быть не стоит.
      }
    })
    .catch(err => {
      debugger;
      throw err;
    })
});

module.exports = router;