# Checkpoint REST API — GOMYCODE

API REST avec **Express** et **Mongoose** (code commenté).

```
config/.env        (variables d'environnement, non versionné — voir config/.env.example)
models/User.js     (schéma et modèle Mongoose)
server.js          (serveur Express + routes)
```

## Routes

| Méthode | Route | Action |
|---------|-------|--------|
| GET | `/users` | Retourne tous les utilisateurs |
| POST | `/users` | Ajoute un utilisateur (corps JSON) |
| PUT | `/users/:id` | Modifie un utilisateur par son id |
| DELETE | `/users/:id` | Supprime un utilisateur par son id |

Exemple de corps pour POST / PUT :

```json
{ "name": "Said", "email": "said@example.com", "age": 28 }
```

## Lancer

```bash
npm install
cp config/.env.example config/.env   # puis renseigner MONGO_URI
npm run dev
```

Tester chaque route avec **Postman** sur `http://localhost:5000/users`.
