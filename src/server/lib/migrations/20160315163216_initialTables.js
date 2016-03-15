
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.string('userName');
      table.string('email');
      table.string('photo');
      table.boolean('isAdmin');
    }),
    knex.schema.createTableIfNotExists('entries', (table) => {
      table.increments('id').primary();
      table.string('thumbnailURL');
      table.string('title');
      table.string('embedID');
      table.string('description');
      table.json('statistics');
      table.integer('sortMetric');
      table.integer('userID').references('id').inTable('users');
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('entries'),
    knex.schema.dropTable('users'),
  ]);
};
