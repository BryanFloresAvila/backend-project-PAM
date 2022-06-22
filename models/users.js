const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    rol: {
      type: String,
      default: 'user',
    },
  },
  {
    versionKey: false,
  }
);

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
