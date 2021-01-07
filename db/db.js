const Database = require('better-sqlite3');
const { languages, frameworks, snippets, projects } = require('./db_seeder');
const path = require('path');
const {app} = require('electron');


const CREATE_DB = () => {
  console.log(app.getPath('userData'));
  return new Database(path.join(app.getPath('userData'), 'snippster.db'));
  // return new Database('db/snippster.db');
};

// Language
// Longname - shortname - path to icon

// Framework
// Fullname - shortname - path to icon - fk to language

// snippets
// Title - desription - language - framework - path to file - fk langaugae - fk framework - fk-project

// projects
// title - root path - path to icon

const CREATE_TABLES = (db) => {
  const sql = `
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS languages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        long CHAR(50) UNIQUE NOT NULL, 
        short CHAR(10) NOT NULL, 
        icon CHAR(100) 
        );

    CREATE TABLE IF NOT EXISTS frameworks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      long CHAR(50) UNIQUE NOT NULL NOT NULL, 
      short CHAR(10) NOT NULL, 
      icon CHAR(100),
      language_id INTEGER,
      FOREIGN KEY(language_id) REFERENCES languages(id) ON DELETE CASCADE 
      );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title CHAR(50) NOT NULL UNIQUE,
      root CHAR(100) NOT NULL UNIQUE,
      icon CHAR(100)
      );

    CREATE TABLE IF NOT EXISTS snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title CHAR(50), 
      description TEXT, 
      code TEXT, 
      project_id INTEGER NOT NULL,
      language_id INTEGER,
      framework_id INTEGER,
      FOREIGN KEY(language_id) REFERENCES languages(id) ON DELETE SET NULL,
      FOREIGN KEY(framework_id) REFERENCES frameworks(id) ON DELETE SET NULL,
      FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE 
      );
        `;
  try {
    db.exec(sql);
  } catch (error) {
    // console.log(error);
  }
  return db;
};

const seed_languages = (db) => {
  const stmt = db.prepare(`INSERT INTO languages (
    long,
    short,
    icon
    ) VALUES (@long, @short, @icon);`);

  languages.forEach((language) => {
    try {
      stmt.run(language);
    } catch (error) {
      // console.log(error);
    }
  });
};
const seed_frameworks = (db) => {
  const stmt = db.prepare(`INSERT INTO frameworks (
    long,
    short,
    icon,
    language_id
    ) VALUES (@long, @short, @icon, @language_id);`);
  frameworks.forEach((framework) => {
    try {
      stmt.run(framework);
    } catch (error) {
      // console.log(error);
    }
  });
};
const seed_projects = (db) => {
  const stmt = db.prepare(`INSERT INTO projects (
    title,
    root,
    icon
    ) VALUES (@title, @root, @icon);`);
  projects.forEach((project) => {
    try {
      stmt.run(project);
    } catch (error) {
      // console.log(error);
    }
  });
};
const seed_snippets = (db) => {
  const stmt = db.prepare(`INSERT INTO snippets (
    title,
    description,
    code,
    project_id,
    language_id,
    framework_id
    ) VALUES (@title, @description, @code, @project_id, @language_id, @framework_id);`);
  snippets.forEach((snippet) => {
    try {
      stmt.run(snippet);
    } catch (error) {
      console.log(error);
    }
  });
};

const SEED_DATA = (db) => {
  seed_languages(db);
  seed_frameworks(db);
  seed_projects(db);
  seed_snippets(db);
};

module.exports.CREATE_TABLES = CREATE_TABLES;
module.exports.CREATE_DB = CREATE_DB;
module.exports.SEED_DATA = SEED_DATA;
