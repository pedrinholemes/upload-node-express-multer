const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database("./src/data/database.db")

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        size TEXT,
        key TEXT,
        url TEXT
      );
    `);
    console.log('Lido')
})

module.exports = db;