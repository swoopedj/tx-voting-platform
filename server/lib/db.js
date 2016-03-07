// Requires knexfile
const config = require('../../knexfile');

// Sets environment to either NODE_ENV or development
const env = process.env.NODE_ENV || 'development';

// Sets up postgres with knex and the environment
const pg = require('knex')(config[env]);

module.exports = pg;
