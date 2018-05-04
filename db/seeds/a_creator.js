exports.seed = function(knex, Promise) {
  return knex('creator').truncate()
    .then(function () {
      return Promise.all([
        knex('creator').insert({ email:'alice@gmail.com'}),
        knex('creator').insert({ email: 'Bob@gmail.com'}),
        knex('creator').insert({ email: 'Charlie@gmail.com'}),
      ]);
    });
};

