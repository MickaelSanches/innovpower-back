const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');

// Route pour l'enregistrement
router.post('/register', authController.register);

// Route pour la connexion
router.post('/login', authController.login);

// Route pour obtenir les informations de l'utilisateur connecté
router.get('/me', verifyToken, authController.getMe);

// Routes pour les projets
router.post('/projects', verifyToken, projectController.createProject); // Ajouter un projet
router.get('/projects', verifyToken, projectController.getProjects); // Voir les projets
router.put('/projects/:id', verifyToken, projectController.updateProject); // Modifier un projet
router.delete('/projects/:id', verifyToken, projectController.deleteProject); // Supprimer un projet

// Route pour mettre à jour l'email
router.put('/update-email', verifyToken, userController.updateEmail);

// Route pour changer le mot de passe
router.put('/change-password', verifyToken, userController.changePassword);

module.exports = router;
