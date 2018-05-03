"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:poll_id", (req, res) => {
    knex
      .select("*")
      .from("poll")
      .where(poll.id = req.params.poll_id)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
