const Database = require('better-sqlite3');

const create_db = () => {
  return new Database('db/snippster.db', { verbose: console.log });
};

const CREATE_TABLES = () => {
  const db = create_db();
  const sql = `
    CREATE TABLE IF NOT EXISTS languages (
        id INTEGER PRIMARY KEY,
        long CHAR(50) NOT NULL, 
        short CHAR(10) NOT NULL, 
        path CHAR(100) 
        );`;
  try {
    db.exec(sql);
  } catch (error) {
    console.log(error);
  }
};

module.exports.CREATE_TABLES = CREATE_TABLES;
