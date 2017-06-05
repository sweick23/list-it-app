const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;



const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {type: String, required: true},
  lastname: {type: String, required: true}
});

UserSchema.methods.apiRepr = function() {
  return {
    username: this.username || '',
    firstname: this.firstname || '',
    lastname: this.lastname || ''
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('users', UserSchema);

module.exports = {User};
