// Contrôleur pour la gestion des pizzas
// Chaque fonction correspond à une opération CRUD sur la table 'pizzas'.
const { validationResult } = require('express-validator');
const Pizza = require('./Pizza');

/**
 * Crée une nouvelle pizza.
 * POST /api/pizzas
 * Les champs 'name' et 'price' sont obligatoires.
 */
exports.create = async (req, res, next) => {
    try {
        // Vérifie les erreurs de validation envoyées par express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400 Bad Request pour les problèmes de validation
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, imageUrl, price } = req.body;
        // Création de la pizza en base de données
        const created = await Pizza.create({ name, description, imageUrl, price });
        // 201 Created : retourne la pizza créée
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère la liste de toutes les pizzas.
 * GET /api/pizzas
 */
exports.findAll = async (req, res, next) => {
    try {
        const pizzas = await Pizza.findAll();
        // 200 OK : retourne la liste des pizzas
        return res.status(200).json(pizzas);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupère une pizza par son identifiant.
 * GET /api/pizzas/:id
 */
exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid pizza id' });

        const pizza = await Pizza.findById(id);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' }); // 404 Not Found

        return res.status(200).json(pizza);
    } catch (err) {
        next(err);
    }
};

/**
 * Met à jour une pizza existante.
 * PUT /api/pizzas/:id
 * Les champs 'name' et 'price' sont obligatoires.
 */
exports.update = async (req, res, next) => {
    try {
        // Vérifie les erreurs de validation envoyées par express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid pizza id' });

        const { name, description, imageUrl, price } = req.body;
        // Met à jour la pizza en base de données
        const updated = await Pizza.update(id, { name, description, imageUrl, price });
        if (!updated) return res.status(404).json({ error: 'Pizza not found' }); // 404 Not Found

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

/**
 * Supprime une pizza par son identifiant.
 * DELETE /api/pizzas/:id
 */
exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid pizza id' });

        const deleted = await Pizza.delete(id);
        if (deleted === 0) return res.status(404).json({ error: 'Pizza not found' });

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
