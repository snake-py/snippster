const Database = require('better-sqlite3');
const { languages, frameworks } = require('./db_seeder');

const create_db = () => {
  return new Database('db/snippster.db', { verbose: console.log });
};

// Language
// Longname - shortname - path to icon

// Framework
// Fullname - shortname - path to icon - fk to language

// snippets
// Title - desription - language - framework - path to file - fk langaugae - fk framework - fk-project

// projects
// title - root path - path to icon

const CREATE_TABLES = () => {
  const db = create_db();
  const sql = `
    CREATE TABLE IF NOT EXISTS languages (
        id INTEGER AUTO INCREMENT,
        long CHAR(50) PRIMARY KEY NOT NULL, 
        short CHAR(10) NOT NULL, 
        path CHAR(100) 
        );

    CREATE TABLE IF NOT EXISTS frameworks (
      id INTEGER AUTO INCREMENT,
      long CHAR(50) NOT NULL PRIMARY KEY NOT NULL, 
      short CHAR(10) NOT NULL, 
      path CHAR(100),
      language CHAR(50),
      FOREIGN KEY(language) REFERENCES languages(long)
      );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title CHAR(50) NOT NULL,
      root CHAR(100) NOT NULL,
      icon CHAR(100)
      );

    CREATE TABLE IF NOT EXISTS snippets (
      id INTEGER PRIMARY KEY,
      title CHAR(50) NOT NULL, 
      description TEXT, 
      path CHAR(100),
      project_id INTEGER NOT NULL,
      language_id INTEGER NOT NULL,
      framework_id INTEGER,
      FOREIGN KEY(language_id) REFERENCES languages(id),
      FOREIGN KEY(framework_id) REFERENCES frameworks(id),
      FOREIGN KEY(project_id) REFERENCES projects(id)
      );
        `;
  try {
    db.exec(sql);
  } catch (error) {
    console.log(error);
  }
  return db;
};

const SEED_DATA = (db) => {
  const languageStmt = db.prepare(`INSERT INTO languages (
    long,
    short,
    path
    ) VALUES (@long, @short, @path);`);

  languages.forEach((language) => {
    try {
      languageStmt.run(language);
    } catch (error) {
      console.log(error);
    }
  });
  const frameworkStmt = db.prepare(`INSERT INTO frameworks (
    long,
    short,
    path,
    language
    ) VALUES (@long, @short, @path, @language);`);
  frameworks.forEach((framework) => {
    try {
      frameworkStmt.run(framework);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports.CREATE_TABLES = CREATE_TABLES;
module.exports.SEED_DATA = SEED_DATA;
