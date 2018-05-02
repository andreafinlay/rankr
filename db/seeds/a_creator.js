exports.seed = function(knex, Promise) {
  return knex('creator').truncate()
    .then(function () {
      return Promise.all([
        knex('creator').insert({id: 1, email:'alice@gmail.com'}),
        knex('creator').insert({id: 2, email: 'Bob@gmail.com'}),
        knex('creator').insert({id:3, email: 'Charlie@gmail.com'}),
      ]);
    });
};

