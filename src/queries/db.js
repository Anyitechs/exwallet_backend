import sqlite from 'sqlite3';

const sqlite3 = sqlite.verbose();

export const initializeDatabase = () => {
  const db = new sqlite3.Database('./db/exwallet.db', (err) => {
    if (err) {
      console.error(err.message);
    }

    new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS user_dids (
          userId TEXT PRIMARY KEY,
          did TEXT,
          vc TEXT
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          reject(err);
        } else {
          console.log('Database initialized successfully.');
          resolve(db);
        }
      });
    });
  });

  return db;

}
