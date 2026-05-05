# sandbox-dev

Sandbox complète avec **Node (Express) + Postgres + React** pour dev et prod.

## Structure

- `backend/` : API Node/Express
- `frontend/` : app React (Vite)
- `docker-compose.dev.yml` : stack développement
- `docker-compose.prod.yml` : stack production locale

## Démarrage DEV

```bash
cd sandbox-dev
docker compose -f docker-compose.dev.yml up -d --build
```

Accès:
- Frontend: `http://localhost:5174`
- Backend: `http://localhost:3000`
- Health: `http://localhost:3000/health`

## Démarrage PROD

```bash
cd sandbox-dev
docker compose -f docker-compose.prod.yml up -d --build
```

Accès:
- Frontend (Nginx): `http://localhost:8081`
- API via proxy: `http://localhost:8081/api/message`

## Arrêt

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.prod.yml down
```
