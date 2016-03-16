
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.string('userName').notNullable();
      table.string('email').notNullable();
      table.string('photo')
      table.boolean('isAdmin').notNullable();
    }),
    knex.schema.createTableIfNotExists('entries', (table) => {
      table.increments('id').primary();
      table.string('thumbnailURL').notNullable();
      table.string('title').notNullable();
      table.string('embedID').notNullable();
      table.string('description', 5000).notNullable();
      table.json('statistics').notNullable();
      table.integer('sortMetric').notNullable();
      table.integer('userID').references('id').inTable('users').notNullable();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('entries'),
    knex.schema.dropTable('users'),
  ]);
};
