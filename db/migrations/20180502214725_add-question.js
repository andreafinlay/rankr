exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('poll', function(table){
      table.string('question_string')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('poll', function(table){
      table.dropColumn('question_string');
    })
  ])
};
