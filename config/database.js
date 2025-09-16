// config/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbFile = process.env.DB_FILE || path.join(__dirname, '..', 'dev.sqlite');

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Could not connect to sqlite', err);
        process.exit(1);
    }
    console.log('Connected to sqlite database:', dbFile);
});

// Initialize pizzas table if not exists
const initSql = `
CREATE TABLE IF NOT EXISTS pizzas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  imageUrl TEXT,
  price REAL NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
`;

// Initialize ingredients table if not exists
const initIngredientsSql = `
CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
`;

// Ajout de la colonne price si elle n'existe pas déjà
const alterIngredientsSql = `
ALTER TABLE ingredients ADD COLUMN price REAL DEFAULT 1;
`;

db.serialize(() => {
    db.run(initSql, (err) => {
        if (err) {
            console.error('Failed to initialize database', err);
            process.exit(1);
        }
    });
    db.run(initIngredientsSql, (err) => {
        if (err) {
            console.error('Failed to initialize ingredients table', err);
            process.exit(1);
        }
        db.run(alterIngredientsSql, (err) => {
            // Ensuite, on vérifie si la table est vide
            db.get('SELECT COUNT(*) as count FROM ingredients', (err, row) => {
                if (err) return;
                if (row.count === 0) {
                    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    db.run(insertSql, (err) => {
                        if (err) {
                            console.error('Failed to insert default ingredients', err);
                        } else {
                            console.log('Default ingredients inserted');
                        }
                    });
                }
            });
        });
    });
});

module.exports = db;
