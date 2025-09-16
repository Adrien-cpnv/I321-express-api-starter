// Contrôleur pour la gestion des ingrédients
// Utilise le modèle Ingredient pour accéder à la base de données
const Ingredient = require('./Ingredient');

/**
 * Récupère la liste de tous les ingrédients.
 * GET /api/ingredients
 */
exports.getAll = async (req, res, next) => {
  try {
    const rows = await Ingredient.findAll();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * Récupère un ingrédient par son identifiant.
 * GET /api/ingredients/:id
 */
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const row = await Ingredient.findById(id);
    if (!row) return res.status(404).json({ error: 'Ingredient not found' });
    res.json(row);
  } catch (err) {
    next(err);
  }
};

/**
 * Crée un nouvel ingrédient.
 * POST /api/ingredients
 * Le champ 'name' est obligatoire.
 */
exports.create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const created = await Ingredient.create({ name, description });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/**
 * Met à jour un ingrédient (partiellement).
 * PATCH /api/ingredients/:id
 * Seuls les champs fournis sont modifiés.
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updated = await Ingredient.update(id, { name, description });
    if (!updated) return res.status(404).json({ error: 'Ingredient not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Supprime un ingrédient par son identifiant.
 * DELETE /api/ingredients/:id
 */
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Ingredient.delete(id);
    if (deleted === 0) return res.status(404).json({ error: 'Ingredient not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
