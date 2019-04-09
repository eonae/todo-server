const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save', function(next) {
  const user = this;
  
  if (!user.isModified('password')) return next();

  bCrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
    return next();
  });
});

schema.methods.checkPassword = (password, callback) => {
    bCrypt.compare(password, passwordHash, (err, same) => {
      if (err) throw err
      else {
        if (same) callback(true);
        else callback(false);
      }
    });
}

module.exports = mongoose.model('User', schema);




// Логика следующая:
/* В случае логина проверяем isLocked
если нет и заход успешный -  this.resetFails();
При неудаче this.registerFail()

resetFails() {
  this.fails = [];
}

registerFail() {
  Берём все фейлы за последние M секунд, добавляем текущий и присваиваем
  this.fails
}

isLocked() {
  const length = this.fails.length;
  if (this.fails.length === N && timeFromLast < D)
    return true;
  return false;
}

Задача: при N неудачных попыток в течение M секунд блокируем
возможность логина на D секунд.

*/