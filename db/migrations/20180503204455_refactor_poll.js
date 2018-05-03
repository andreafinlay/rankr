
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('poll', function (table) {
      table.dropColumn('poll_url');
      table.dropColumn('admin_url');
      table.string('key');
    })
  ])
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('poll', function (table) {
      table.string('admin_url');
      table.string('poll_url');
      table.dropColumn('key')
    })
      ])
};
