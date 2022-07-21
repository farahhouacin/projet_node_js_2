const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pseudo: {
    type: String,
    required: true
  },
  dateNaissance: {
    type: String,
    required: true
  },
  presentation: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  pays: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);