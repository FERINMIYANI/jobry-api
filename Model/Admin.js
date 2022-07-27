const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Email Address Is Required'],
    unique: [true, 'The Same Email Address Already Exists']
  },
  password: {
    type: String,
    required: [true, "Password Is Required"]
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin