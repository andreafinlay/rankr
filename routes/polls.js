"use strict";

const express = require('express');
const router  = express.Router();


// getPollById()




module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("poll")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:poll_id", (req, res) => {
       knex
      .select('poll.question_string','poll.id','option.option_name')
      .from("poll")
      .join('option', 'poll.id', 'option.poll_id')
      .where('poll.id', req.params.poll_id)
      .then((results) => {
        res.json(results)
    });

});

  return router;
}
