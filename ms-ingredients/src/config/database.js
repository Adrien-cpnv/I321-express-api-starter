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

// Initialize ingredients table if not exists
const ingredientsTableSql = `
    CREATE TABLE IF NOT EXISTS ingredients (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
price REAL NOT NULL,
created_at TEXT DEFAULT (datetime('now')),
updated_at TEXT DEFAULT (datetime('now'))
        );
`;

const pizzaIngredientsTableSql = `
    CREATE TABLE IF NOT EXISTS pizza_ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pizza_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (pizza_id) REFERENCES pizzas (id) ON DELETE CASCADE,
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE,
        UNIQUE(pizza_id, ingredient_id)
    );
`;

db.serialize(() => {

    db.run(ingredientsTableSql, (err) => {
        if (err) {
            console.error('Failed to create ingredients table', err);
            process.exit(1);
        }
    });

    // Ajouter la création de la table pizza_ingredients
    db.run(pizzaIngredientsTableSql, (err) => {
        if (err) {
            console.error('Failed to create pizza_ingredients table', err);
            process.exit(1);
        }
    });
});

module.exports = db;