
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require('passport');

let bookController = require('../controllers/survey');

// helper function for guard purposes 
function requireAuth(req, res, next)
{
    // check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ Operation */
router.get("/", bookController.displayBookList);

/* GET Route for displaying Add page - CREATE Operation */
router.get("/add", requireAuth, bookController.displayAddPage);

/* POST Route for processing Add page - CREATE Operation */
router.post("/add", requireAuth, bookController.processAddPage);

/* GET Route for displaying EDIT page - UPDATE Operation */
router.get("/:id", requireAuth, bookController.displayEditPage);

/* POST Route for processing EDIT page - UPDATE Operation */
router.post("/:id", requireAuth, bookController.processEditPage);

/* GET Route to perform Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, bookController.performDelete);

/* GET Route to perform Counting - COUNTING Operation */
router.post("/submit/:id", requireAuth, bookController.performCount);

module.exports = router;
