# API Pizzas & Ingrédients — Starter Express

## Présentation
Ce projet propose une API RESTful pour gérer des pizzas et leurs ingrédients, réalisée avec Node.js, Express et SQLite. Il est conçu pour être pédagogique et facilement compréhensible par des étudiants.

## Structure du projet

- `app.js` / `server.js` : point d’entrée de l’application
- `ingredients/` : gestion des ingrédients (contrôleur, routes)
- `pizzas/` : gestion des pizzas (contrôleur, routes, modèle)
- `config/` : configuration de la base de données et Swagger
- `routes/` : routeur principal (agrège les sous-routeurs)

## Lancement du projet

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer le serveur :
   ```bash
   npm start
   ```
3. L’API sera accessible sur `http://localhost:3000` (ou le port défini dans `server.js`).

## Documentation interactive

Une documentation Swagger est disponible (voir config/swagger.js) pour tester l’API et comprendre chaque endpoint.

## Exemples d’utilisation

### Récupérer tous les ingrédients
```bash
curl http://localhost:3000/api/ingredients
```

### Créer une pizza
```bash
curl -X POST http://localhost:3000/api/pizzas -H "Content-Type: application/json" -d '{"name":"Reine","price":12.5}'
```

## Bonnes pratiques pédagogiques
- Chaque fichier de contrôleur et de route est abondamment commenté pour expliquer le rôle de chaque fonction.
- La documentation Swagger permet de visualiser et tester l’API facilement.
- Les conventions de nommage sont respectées et les erreurs sont gérées proprement.

## Pour aller plus loin
- Ajouter des tests automatisés
- Sécuriser l’API (authentification, validation avancée)
- Déployer sur un service cloud

---
Projet prêt à l’emploi pour l’apprentissage d’Express et des API REST !

