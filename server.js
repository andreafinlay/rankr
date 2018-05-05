"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
// const usersRoutes = require("./routes/users");

const pollRoutes = require("./routes/polls")

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes

// app.use("/api/users", usersRoutes(knex));

app.use("/api/polls", pollRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


app.get("/poll-created", (req, res) => {
  res.render("poll-created");
});


app.post('/polls',(req,res) =>{
  const templateVars = {};
    function generateSecretKey() {
  return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
  };

  let secretKey = generateSecretKey();

  function creatorPromise() {
    return new Promise((resolve,reject) => {
        knex('creator')
        .insert({email:'alice@gmail.com'})
        .returning('id')
        .then((creator_id) => resolve(creator_id))
        .catch(err=>reject(err));
      });
  };

  function pollPromise (creator_id){
    return new Promise((resolve, reject) => {
      let question = req.body.question_string;
      templateVars.question_string = question
      knex('poll')
           .insert({ creator_id: Number(creator_id[0]), question_string: question, open:true, key: secretKey})
           .returning('id')
           .then((poll_id) => {
            templateVars.poll_id = poll_id;
            templateVars.secretkey = secretKey;
            resolve(poll_id)
          })
           .catch(e => reject(e));
    });
  };

  function optionPromise (poll_id){
    return new Promise((resolve, reject) =>{
      req.body.options.forEach((option, i) => {
        knex('option')
        .insert({option_name: option[0], poll_id: Number(poll_id[0]) }).catch(err=>console.log(err))
        .then(resolve())
        .catch(e => reject(e));
    });
  })
  };


creatorPromise()
  .then((creator_id) => pollPromise(creator_id))
  .then((poll_id) => optionPromise(poll_id))
  .then( () => {
    console.log(templateVars)
    res.send(templateVars)
  })
  .catch(e => {console.log(e)})

});

//*********__________-------------------polls results doesnt wokr
app.get("/polls/results/:poll_id", (req, res) => {

  console.log(req.params.poll_id)
  knex
   .select('vote.id',)
   .from("poll")
   .join('option', 'poll.id', 'option.poll_id')
   .join('vote','vote.option_id','option.id')
  // .where('poll.id', req.params.poll_id)
   .then((results) => {
   // .select('poll.question_string','poll.id as poll_id','option.option_name','option.id as option_id','vote.rank')
   // .from("poll")
   // .join('option', 'poll.id', 'option.poll_id')
   // .join('vote', 'vote.option_id', 'option.id')
   // .where('poll.id', req.params.poll_id)
   // .then((results) => {
   console.log(results)
   //  res.render("poll", {results: results})
  });
});

// Poll page
app.get("/polls/:poll_id/", (req, res) => {
  knex
   .select('poll.question_string','poll.id as poll_id','option.option_name','option.id as option_id')
   .from("poll")
   .join('option', 'poll.id', 'option.poll_id')
   .where('poll.id', req.params.poll_id)
   .then((results) => {
    //ok but what? why does this work, why cant we do this with @?
     res.render("poll", {results: results})
  });
});
//Poll admin
app.get("/admin/:poll_id", (req, res) => {
  res.render("admin");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
