const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const seekerSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: [true, 'Email Address Is Required'],
        unique: [true, 'Same Email Already Exists']
    },
    password: {
        type: String,
        required: [true, 'Passwored Is Required']
    },
    mobile: {
        type: Number,
        required: [true, 'mobile no is required']
    },
    specialism: String,
    state: String,
    city: String,
    experience: [String],
    Degree: String,
    School: String,
    College: String,
    photo: String,
    website: String,
    age: Number
});


const Seeker = mongoose.model('Seeker', seekerSchema);
module.exports = Seeker