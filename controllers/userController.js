const pool = require('../db');
const bcrypt = require('bcryptjs');

// Mettre à jour l'email de l'utilisateur
exports.updateEmail = async (req, res) => {
    const { email } = req.body;
    const userId = req.userId;

    try {
        await pool.query(
            "UPDATE users SET email = $1 WHERE id = $2",
            [email, userId]
        );
        res.status(200).json({ message: "Email mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'email" });
    }
};

// Changer le mot de passe de l'utilisateur
exports.changePassword = async (req, res) => {
    const { password } = req.body;
    const userId = req.userId;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        await pool.query(
            "UPDATE users SET password = $1 WHERE id = $2",
            [hashedPassword, userId]
        );
        res.status(200).json({ message: "Mot de passe changé avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors du changement de mot de passe" });
    }
};
