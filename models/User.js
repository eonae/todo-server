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
    unique: false
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

schema.methods.checkPassword = function(password, callback) {
  bCrypt.compare(password, this.password, (err, same) => {
    if (err) {
      throw err;
    } else {
      if (same) callback(true);
      else callback(false);
    }
  });
};

schema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  }
};

schema.statics.authenticate = function(credentials, callback) {

  const status = this.AUTH_RESULTS;

  this.findOne({ username: credentials.username }, (err, user) => {

    if (err) {
      console.log(err);
      callback(status.INTERNAL_ERROR);
    } else if (!user) {
      callback(status.INVALID_USERNAME);
    } else {
      user.checkPassword(credentials.password, match => {

        if (match) {
          callback(status.SUCCESS, user);
        } else {
          callback(status.INVALID_PASSWORD);
        }
      })
    }
  });
}; 

schema.statics.AUTH_RESULTS = {
  SUCCESS: 0,
  INVALID_USERNAME: 1,
  INVALID_PASSWORD: 2,
  USER_LOCKED: 3, // На будущее
  INTERNAL_ERROR: 4
};

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