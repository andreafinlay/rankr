
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vote').truncate()
    .then(function () {
      return Promise.all([
        knex('vote').insert({id: 1, voter_name:'Mike', option_id: 1, rank: 0 }),
        knex('vote').insert({id: 2, voter_name:'Mike', option_id: 2, rank: 1 })

      ]);
    });
};
