

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let book = require('../models/surveys');

module.exports.displayBookList = (req, res, next) => {
  book.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Surveys',
        surveys: surveys,
        displayName: req.user ? req.user.displayName: ""
      });
    }
  });
};

module.exports.displayAddPage = (req, res, next) => {
  res.render("surveys/details.ejs", { title: "Add Survey", surveys:{},
  displayName: req.user ? req.user.displayName: "" });
};

module.exports.processAddPage = (req, res, next) => {
  let newbook = book({
    _id: req.body.id,
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    vote1: req.body.vote1,
    vote2: req.body.vote2,
    vote3: req.body.vote3,
    vote4: req.body.vote4
  });
  book.create(newbook,(err,book)=>{
    if(err){
      console.log(err)
      res.end(err)
    }
    else{
      res.redirect("/surveys")
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  book.findById(id, (err, bookToEdit) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit view
        res.render('surveys/details', {title: 'Edit Book', surveys: bookToEdit})
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedbook = book ({
    _id:id,
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    vote1: req.body.vote1,
    vote2: req.body.vote2,
    vote3: req.body.vote3,
    vote4: req.body.vote4
  })
  book.updateOne({_id:req.params.id},updatedbook,(err) =>{
    if(err){
      console.log(err)
      res.end(err)
    }
    else{
      res.redirect('/surveys')
    }
  })
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id

  book.remove({_id:id}, (err)=>{
    if(err){
      console.log(err)
      res.end(err)
    }
    else{
      res.redirect('/surveys')
    }
  })
};

module.exports.performCount = (req, res, next) => {
  let id = req.params.id;
  let vote = req.body.Communication;

  book.findById(id, (err, doc) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
      
      voteCount = doc[vote];
      updatedDoc = {};
      updatedDoc[vote] = voteCount + 1;

      book.updateOne({_id:doc._id},updatedDoc,(err) =>{
        if(err){
          console.log(err)
          res.end(err)
        }
        else{
          res.redirect('/surveys')
        }
      })

    }
  });
}