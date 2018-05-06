"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const mailgun     = require('mailgun.js');
const sass        = require("node-sass-middleware");
const app         = express();
const mg          = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const pollRoutes = require("./routes/polls")

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
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

app.use("/api/polls", pollRoutes(knex));

//--------------------helper--------------
function zeroIndexBorda(votes){
  var options = {};
  var num_of_votes = votes.length;
  var results = {};
  votes.forEach(vote =>{
    options[vote.option_id] = 1;
  })
  var numOfQuestions = Object.keys(options).length;
  votes.forEach(vote => {
    results[vote.option_name] ?
    results[vote.option_name] += Math.abs(Number(numOfQuestions - vote.rank-1))/num_of_votes
    :results[vote.option_name] = Math.abs(Number(numOfQuestions - vote.rank-1))/num_of_votes
  });
  return Object.keys(results).reduce((prev, cur) => {
   prev[cur] = ((results[cur]))*100;
   return prev;
 }, {});
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


// Spiced up the post req on vote submission w some promise action
// and also it now sends an email when a user submits their vote
app.post('/polls/:poll_id',(req,res) => {

  const pollId = (req.params.poll_id);

  function votePromise() {
    return new Promise((resolve, reject) => {
    Object.keys(req.body.options).forEach( option => {
    knex('vote')
      .insert({voter_name: 'Michael', option_id: req.body.options[option].option, rank: req.body.options[option].index})
      .returning('id')
      .then(resolve())
      .catch(e => reject(e));
      });
    });
  }

  function findPollPromise(pollId) {
    return new Promise((resolve, reject) => {
      knex('poll').where({
        id: pollId
      }).select('question_string')
        .then(function(question_string) {
        const pollQuestion = question_string[0].question_string;
        mg.messages.create("sandbox37aca15d55444736955d58b502031cba.mailgun.org", {
          from: "Rankr <postmaster@sandbox37aca15d55444736955d58b502031cba.mailgun.org>",
          to: [/*"aden.collinge@gmail.com",*/ "andreaafinlay@gmail.com"],
          subject: "Rankr: Someone Has Voted In Your Poll!",
          html: `<HTML><head></head><body><div>Someone has voted
                      in your poll, ${pollQuestion}!</div>
                 <div>You can view your poll at: </div>
                 <div>Your secret key is: .</div>
                 <div>Enter your poll URL plus your secret key into the address bar
                 to view the current results of your poll: </div></body></HTML>`
        })
      })
    })
  }

votePromise()
  .then(() => {
    findPollPromise(pollId)
  })
  .catch(err => console.log(err));
});

app.post('/polls',(req,res) => {

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
        .catch(e => reject(e));
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
    return new Promise((resolve, reject) => {
      req.body.options.forEach((option, i) => {
        knex('option')
        .insert({option_name: option[0], poll_id: Number(poll_id[0]) }).catch(err => console.log(err))
        .then(resolve())
        .catch(e => reject(e));
      });
    })
  };

creatorPromise()
  .then((creator_id) => pollPromise(creator_id))
  .then((poll_id) => optionPromise(poll_id))
  .then( () => {
    let emailPollURL   = `http://localhost:8080/polls/${templateVars.poll_id}`
    let emailPollHTML  = emailPollURL.link(emailPollURL);
    let emailAdminURL  = `http://localhost:8080/polls/${templateVars.poll_id}/${templateVars.secretkey}`
    let emailAdminHTML = emailAdminURL.link(emailAdminURL);
    res.send(templateVars);
    mg.messages.create("sandbox37aca15d55444736955d58b502031cba.mailgun.org", {
      from: "Rankr <postmaster@sandbox37aca15d55444736955d58b502031cba.mailgun.org>",
      to: [/*"aden.collinge@gmail.com",*/ "andreaafinlay@gmail.com"],
      subject: "Rankr: Your New Poll!",
      html: `<HTML><head></head><body><div>Your poll, ${templateVars.question_string},
              has been successfully created!</div>
             <div>You can view your new poll at: ${emailPollHTML}</div>
             <div>Your secret key is: ${templateVars.secretkey}.</div>
             <div>Enter your poll URL plus your secret key into the address bar
             to view the results of your poll: ${emailAdminHTML}</div></body></HTML>`
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
  })
  .catch(e => {console.log(e)})
});

// Polls results, doesn't work
app.get("/polls/:poll_id/results", (req, res) => {

  console.log(req.params.poll_id);
  const templateVars = {};

  knex
   .select('vote.id','poll_id','vote.rank','vote.voter_name','option.option_name','vote.option_id')
   .from("poll")
   .join('option', 'poll.id', 'option.poll_id')
   .join('vote','vote.option_id','option.id')
   .where('poll.id', req.params.poll_id)
   .then((results) => {

    console.log(zeroIndexBorda(results))
    templateVars['results'] = zeroIndexBorda(results)
    res.render("admin", templateVars);
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
app.get("/polls/:poll_id/:secretkey", (req, res) => {
  res.render("admin");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
