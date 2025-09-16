// Routeur Express pour la gestion des ingrédients
// Chaque route correspond à une opération CRUD sur la ressource 'ingredient'.
const express = require('express');
const controller = require('./ingredientController');

const router = express.Router();

/**
 * Documentation Swagger (OpenAPI) pour chaque endpoint.
 * Permet de générer automatiquement une documentation interactive de l'API.
 */

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Gestion des ingrédients
 *
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *       required: [name]
 */

// Récupère la liste de tous les ingrédients
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   get:
 *     tags: [Ingredients]
 *     summary: get a single ingredient by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       200:
 *         description: Ingrédient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Non trouvé
 */
// Récupère un ingrédient par son identifiant
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     tags: [Ingredients]
 *     summary: create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Requête invalide
 */
// Crée un nouvel ingrédient
router.post('/', controller.create);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   put:
 *     tags: [Ingredients]
 *     summary: update an ingredient
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       200:
 *         description: Mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Non trouvé
 */
// Met à jour un ingrédient existant (partiellement)
router.patch('/:id', controller.update);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     tags: [Ingredients]
 *     summary: delete an ingredient
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: integer }
 *         required: true
 *     responses:
 *       204:
 *         description: Supprimé
 *       404:
 *         description: Non trouvé
 */
// Supprime un ingrédient par son identifiant
router.delete('/:id', controller.remove);

module.exports = router;

