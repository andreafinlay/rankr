
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('poll').truncate()
    .then(function () {
      return Promise.all([
        knex('poll').insert({id:1,creator_id: 1, admin_url: 'www.example.com', poll_url: 'www.example.com', open: true, question_string: "what on food??"}),
      ]);
    });
};
