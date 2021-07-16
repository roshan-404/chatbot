const mongoose = require('mongoose');

const Schema =  mongoose.Schema({
    text: String
});


const User = mongoose.model('User', Schema);

module.exports = { User }
