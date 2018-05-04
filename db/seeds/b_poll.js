
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('poll').truncate()
    .then(function () {
      return Promise.all([
        knex('poll').insert({creator_id: 1, key: 'secretkey1234', open: true, question_string: 'what on food??'}),
      ]);
    });
};
