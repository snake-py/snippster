const Database = require('better-sqlite3');

const test = () => {
    const db = new Database('db/snipster.db', { verbose: console.log });
    const stmt = `
    CREATE TABLE IF NOT EXISTS languages(
        id INTEGER PRIMARY KEY,
        long CHAR(50) NOT NULL, 
        short CHAR(10) NOT NULL, 
        path CHAR(100), 
        )`
        
    }

module.exports.test = test;
