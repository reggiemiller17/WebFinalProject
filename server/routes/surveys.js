// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/surveys');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'surveys',
        surveys: surveys
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

   
  res.render("surveys/details.ejs", {title:"Add Survey",surveys:{}})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let newbook = book({
    "question": req.body.question,
    "option1": req.body.option1,  
    "option2": req.body.option2,
    "option3": req.body.option3,
    "option4": req.body.option4
  });
  book.create(newbook,(err,book)=>{
    if(err){
      console.log(err)
      res.end(err)
    }
    else{
      res.redirect("/surveys")
    }
  })
    
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
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
});
// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedbook = book ({
    "_id":id,
    "question": req.body.question,
    "option1": req.body.option1,
    "option2": req.body.option2,
    "option3": req.body.option3,
    "option4": req.body.option4
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
    
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
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
  
});


module.exports = router;
