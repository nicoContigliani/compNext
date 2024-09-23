// const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database('goodmorning.db', (err: any) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database');
//     }
// });



// module.exports = db;

import sqlite3 from 'sqlite3';

export const getDBConnection = (): sqlite3.Database => {
  const db = new sqlite3.Database('goodmorning.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to SQLite database.');
    }
  });
  return db;
};