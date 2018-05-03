"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (poll_id) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("poll")
      .where(poll.id = poll_id)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
