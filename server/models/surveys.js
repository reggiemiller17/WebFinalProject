let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    vote1: Number,
    vote2: Number,
    vote3: Number,
    vote4: Number
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Book', Book);
