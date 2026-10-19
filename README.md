# 💄 Beverly Gadgets

Boutique de gadgets d'espionnes inspirés de *Totally Spies* — projet ECE.

**React (client/) ──▶ API Express (server/) ──▶ Supabase**

Le front n'appelle jamais Supabase directement : la clé secrète reste dans `server/.env`.

## Lancer en local

```bash
# Terminal 1 : l'API
cd server
npm install
# copier .env.example en .env et remplir les clés Supabase
npm run dev

# Terminal 2 : le front
cd client
npm install
# copier .env.example en .env
npm run dev
```

## Routes

| Route | Rôle | Codes |
|---|---|---|
| `GET /gadgets` | lister | 200 |
| `POST /gadgets` | ajouter | 201, 400 si nom vide / prix négatif |
| `PUT /gadgets/:id` | modifier | 200, 400, 404 |
| `DELETE /gadgets/:id` | supprimer | 204 |
