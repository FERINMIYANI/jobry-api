const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const recruiterSchema = new Schema({
  name: String,
  address: String,
  companyEmail: String,
  companyName: String,
  logo: String,
  password: {
    type: String,
    required: [true, 'Password Is Required']
  },
  specialism: String,
  phone: {
    type: Number,
    required: [true, 'Mobile numbert is compulsory to be entered'],
    unique: [true, 'The Same Mobile number already exists']
  },
  state: String,
  city: String,
  jobPosted: [{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }]
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
module.exports = Recruiter