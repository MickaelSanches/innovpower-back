const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Fonction pour enregistrer un utilisateur
exports.register = async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l’enregistrement' });
    }
};

// Fonction pour authentifier un utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        const validPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};
