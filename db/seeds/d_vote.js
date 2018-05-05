
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vote').truncate()
    .then(function () {
      return Promise.all([
        knex('vote').insert({ voter_name:'Mike', option_id: 1, rank: 0 }),
        knex('vote').insert({ voter_name:'Mike', option_id: 2, rank: 1 }),

        knex('vote').insert({ voter_name:'Mike', option_id: 1, rank: 0 }),
        knex('vote').insert({ voter_name:'Mike', option_id: 2, rank: 1 }),

        knex('vote').insert({ voter_name:'Mike', option_id: 1, rank: 1 }),
        knex('vote').insert({ voter_name:'Mike', option_id: 2, rank: 0 }),

        knex('vote').insert({ voter_name:'Mike', option_id: 1, rank: 1 }),
        knex('vote').insert({ voter_name:'Mike', option_id: 2, rank: 0 }),

        knex('vote').insert({ voter_name:'Mike', option_id: 1, rank: 0 }),
        knex('vote').insert({ voter_name:'Mike', option_id: 2, rank: 1 })

      ]);
    });
};
