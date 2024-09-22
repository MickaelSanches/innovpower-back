const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const pool = new Pool({
    user: 'mickaelsanchesloureiro',
    host: 'localhost',
    database: 'InnovPower',
    port: 5432,
});

// Test de connexion pour vérifier que tout fonctionne
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données', err);
    } else {
        console.log('Connexion à la base de données réussie', res.rows[0]);
    }
});

// Exportation du pool pour pouvoir l'utiliser dans d'autres fichiers
module.exports = pool;
