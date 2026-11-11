// Chargement des variables d'environnement depuis config/.env
require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour lire le JSON du corps des requêtes (req.body)
app.use(express.json());

// Connexion à MongoDB (local ou Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err.message));

// GET : retourner tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST : ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT : modifier un utilisateur par son id
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // renvoyer le document modifié
      runValidators: true, // appliquer les règles du schéma
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE : supprimer un utilisateur par son id
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.status(200).json({ message: 'Utilisateur supprimé', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
