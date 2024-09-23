const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token de l'en-tête Authorization
    if (!token) return res.status(401).json({ error: 'Accès refusé. Pas de token fourni.' });

    try {
        const decoded = jwt.verify(token, 'secretkey'); // Vérification du token
        req.userId = decoded.userId; // Stocker l'ID utilisateur dans la requête
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalide.' });
    }
};

module.exports = verifyToken;
