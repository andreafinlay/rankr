
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


 // knex('poll').insert({id:1,creator_id: 1, admin_url: 'www.example.com', poll_url: 'www.example.com', open: true, question_string: "what on food??"}),
        // knex('option').insert({id: 1, option_name:'wtih cheese', poll_id: 1}),
        // knex('option').insert({id: 2, option_name:'wtihout cheese', poll_id: 1}),

        // knex('vote').insert({id: 1, voter_name:'Mike', option_id: 1, rank: 0 }),
        // knex('vote').insert({id: 2, voter_name:'Mike', option_id: 2, rank: 1 })
