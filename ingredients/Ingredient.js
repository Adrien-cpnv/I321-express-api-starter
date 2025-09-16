// Modèle Ingredient : gère l'accès à la base de données pour la ressource 'ingredients'.
const db = require('../config/database');

class Ingredient {
    /**
     * Récupère tous les ingrédients de la base, triés par nom.
     * @returns {Promise<Array>} Liste des ingrédients
     */
    static findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM ingredients ORDER BY name ASC', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    /**
     * Récupère un ingrédient par son identifiant.
     * @param {number} id - Identifiant de l'ingrédient
     * @returns {Promise<Object|null>} L'ingrédient ou null s'il n'existe pas
     */
    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM ingredients WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    /**
     * Crée un nouvel ingrédient dans la base.
     * @param {Object} param0 - Données de l'ingrédient
     * @param {string} param0.name - Nom de l'ingrédient
     * @param {string} [param0.description] - Description (optionnelle)
     * @returns {Promise<Object>} L'ingrédient créé
     */
    static create({ name, description }) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO ingredients (name, description) VALUES (?, ?)';
            db.run(sql, [name, description || null], function (err) {
                if (err) return reject(err);
                // On récupère l'ingrédient nouvellement créé pour le retourner
                Ingredient.findById(this.lastID).then(resolve).catch(reject);
            });
        });
    }

    /**
     * Met à jour un ingrédient existant (partiellement).
     * @param {number} id - Identifiant de l'ingrédient
     * @param {Object} param1 - Données à mettre à jour
     * @param {string} [param1.name] - Nouveau nom (optionnel)
     * @param {string} [param1.description] - Nouvelle description (optionnelle)
     * @returns {Promise<Object|null>} L'ingrédient mis à jour ou null si non trouvé
     */
    static update(id, { name, description }) {
        const sql = `
            UPDATE ingredients
            SET
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                updated_at = datetime('now')
            WHERE id = ?
        `;
        return new Promise((resolve, reject) => {
            db.run(sql, [name ?? null, description ?? null, id], function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                Ingredient.findById(id).then(resolve).catch(reject);
            });
        });
    }

    /**
     * Supprime un ingrédient par son identifiant.
     * @param {number} id - Identifiant de l'ingrédient
     * @returns {Promise<number>} Nombre de lignes supprimées (0 si non trouvé)
     */
    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM ingredients WHERE id = ?', [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes); // nombre de lignes supprimées
            });
        });
    }
}

module.exports = Ingredient;
