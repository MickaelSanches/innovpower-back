const pool = require('../db');

// Ajouter un projet
exports.createProject = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    try {
        const newProject = await pool.query(
            "INSERT INTO projects (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
            [userId, title, description]
        );
        res.status(201).json(newProject.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du projet' });
    }
};

// Voir les projets de l'utilisateur connecté
exports.getProjects = async (req, res) => {
    const userId = req.userId;

    try {
        const projects = await pool.query("SELECT * FROM projects WHERE user_id = $1", [userId]);
        res.status(200).json(projects.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des projets' });
    }
};

// Modifier un projet
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.userId;

    try {
        const updatedProject = await pool.query(
            "UPDATE projects SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [title, description, status, id, userId]
        );

        if (updatedProject.rows.length === 0) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }

        res.status(200).json(updatedProject.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du projet' });
    }
};

// Supprimer un projet
exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const deletedProject = await pool.query(
            "DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, userId]
        );

        if (deletedProject.rows.length === 0) {
            return res.status(404).json({ error: 'Projet non trouvé' });
        }

        res.status(200).json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du projet' });
    }
};
