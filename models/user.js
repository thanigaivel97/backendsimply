const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('userdetails', userschema);