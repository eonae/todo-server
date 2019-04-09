const mongoose = require('mongoose');

const schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: ''
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Task', schema);