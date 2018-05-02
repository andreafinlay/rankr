exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('creator', function(table){
      table.increments('id');
      table.string('email');
    }),
    knex.schema.createTable('poll', function(table){
      table.increments('id');
      table.integer('creator_id').references('creator');
      table.string('admin_url');
      table.string('poll_url');
      table.boolean('open');
    }),
    knex.schema.createTable('option', function(table){
      table.increments('id');
      table.string('option_name');
      table.integer('poll_id').references('poll');
    }),
    knex.schema.createTable('vote', function(table){
      table.increments('id');
      table.string('voter_name');
      table.string('rank');
      table.integer('option_id').references('option');
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('creator'),
    knex.schema.dropTable('poll'),
    knex.schema.dropTable('option'),
    knex.schema.dropTable('vote')
  ])
};
