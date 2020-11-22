const { CREATE_TABLES, CREATE_DB, SEED_DATA } = require('./db');

module.exports.migrate = function () {
  const db = CREATE_DB();
  CREATE_TABLES(db);
  SEED_DATA(db);
};
