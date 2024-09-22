const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router');

app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Utilisation des routes définies dans router.js
app.use('/api', router);

// Démarrage du serveur sur le port défini
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
