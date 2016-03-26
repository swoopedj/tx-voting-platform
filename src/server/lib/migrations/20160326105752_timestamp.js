
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('entries', (table) => {
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('entries', (table) => {
      table.dropColumn('created_at');
    }),
  ]);
};
