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
  },
  created: {
    type: Date,
    default: Date.now()
  },
  edited: {
    type: Date,
    default: Date.now()
  }
});

schema.methods.serialize = function () {
  return {
    id: this._id,
    text: this.text,
    notes: this.notes,
    isCompleted: this.isCompleted,
    isStarred: this.isStarred,
    created: this.created,
    edited: this.edited
  }
}

module.exports = mongoose.model('Task', schema);