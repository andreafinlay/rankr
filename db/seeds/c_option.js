
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('option').truncate()
    .then(function () {
      return Promise.all([
        knex('option').insert({id: 1, option_name:'wtih cheese', poll_id: 1}),
        knex('option').insert({id: 2, option_name:'wtihout cheese', poll_id: 1})
      ]);
    });
};
