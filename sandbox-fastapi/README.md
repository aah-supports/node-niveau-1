# sandbox-fastapi

Sandbox complète avec **FastAPI + Postgres + React** pour dev et prod.

## Structure

- `backend/` : API FastAPI
- `frontend/` : app React (Vite)
- `docker-compose.dev.yml` : stack de développement
- `docker-compose.prod.yml` : stack de production locale

## Démarrage DEV

```bash
cd sandbox-fastapi
docker compose -f docker-compose.dev.yml up -d --build
```

Accès:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Health: `http://localhost:8000/health`

## Démarrage PROD

```bash
cd sandbox-fastapi
docker compose -f docker-compose.prod.yml up -d --build
```

Accès:
- Frontend (Nginx): `http://localhost:8080`
- API via proxy: `http://localhost:8080/api/message`

## Arrêt

```bash
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.prod.yml down
```
