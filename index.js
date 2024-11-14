const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router');
const corsOptions = {
    origin: 'http://localhost:4321', // Assurez-vous que c'est le bon port où le front-end tourne
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Les méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // Les headers autorisés
    credentials: true // Si tu envoies des cookies avec la requête
};
app.use(cors(corsOptions));

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes définies dans router.js
app.use(router);

// Démarrage du serveur sur le port défini
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
