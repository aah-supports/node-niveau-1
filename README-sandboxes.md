# Sandboxes Docker: FastAPI et Node

Ce dépôt contient deux sandboxes prêtes pour le **dev** et la **prod locale**.

## 1) `sandbox-fastapi`

Stack: **FastAPI + Postgres + React**

- DEV: `docker compose -f sandbox-fastapi/docker-compose.dev.yml up -d --build`
- PROD: `docker compose -f sandbox-fastapi/docker-compose.prod.yml up -d --build`

Ports:
- DEV: frontend `5173`, backend `8000`, postgres `5432`
- PROD: frontend `8080`

## 2) `sandbox-dev`

Stack: **Node/Express + Postgres + React**

- DEV: `docker compose -f sandbox-dev/docker-compose.dev.yml up -d --build`
- PROD: `docker compose -f sandbox-dev/docker-compose.prod.yml up -d --build`

Ports:
- DEV: frontend `5174`, backend `3000`, postgres `5433`
- PROD: frontend `8081`

## Arrêter / nettoyer

```bash
docker compose -f sandbox-fastapi/docker-compose.dev.yml down
docker compose -f sandbox-fastapi/docker-compose.prod.yml down
docker compose -f sandbox-dev/docker-compose.dev.yml down
docker compose -f sandbox-dev/docker-compose.prod.yml down
```

## Notes

- Les services prod exposent uniquement le frontend; l'API est proxifiée via Nginx.
- Les bases Postgres utilisent des volumes nommés distincts pour dev/prod.
