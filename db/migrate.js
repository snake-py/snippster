const { CREATE_TABLES, CREATE_DB, SEED_DATA } = require('./db');
const db = CREATE_DB();

module.exports.migrate = function () {
  CREATE_TABLES(db);
  SEED_DATA(db);
  return(db)
};


module.exports.db = db 