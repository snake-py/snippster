const sqlite3 = require('sqlite3').verbose();
// const db = create_db();
const create_db = () => {
  return new sqlite3.Database('snippsterdb.db');
};

// Language
// Longname - shortname - path to icon

// Framework
// Fullname - shortname - path to icon - fk to language

// snippets
// Title - desription - language - framework path to file - fk langaugae - fk framework

// projects
// title - root path - path to icon

const CREATE_TABLES = () => {
  const db = create_db();
  db.serialize(CREATE_LANGUAGE_TABLE());
};

const CREATE_LANGUAGE_TABLE = () => {
  const stmt = `
  CREATE TABLE IF NOT EXISTS languages(
            id INTEGER PRIMARY KEY,
            long CHAR(50) NOT NULL, 
            short CHAR(10) NOT NULL, 
            path CHAR(100), 
        )`;
  db.run(stmt);
};

const CREATE_SNIPPET_TABLE = () => {
  console.log(db);
  db.serialize(function () {
    db.run(`CREATE TABLE IF NOT EXISTS t(x INTEGER PRIMARY KEY ASC, y, z)`);
  });
};

module.exports.CREATE_TABLES = CREATE_TABLES;
