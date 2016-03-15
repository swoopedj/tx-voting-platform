const db = require('../lib/db');
const Entry = module.exports;

Entry.create = function create(entry) {
  return db('entries').insert([
    entry.thumbnailURL,
    entry.title,
    entry.embedID,
    entry.description,
    entry.statistics,
  ], entry);
};

Entry.read = function read() {
  return db.select('*').from('entries');
};

Entry.update = function update(id, fields) {
  return db('entries').update(id, fields);
};

Entry.remove = function remove(id) {
  return db('entries').delete(id);
};

