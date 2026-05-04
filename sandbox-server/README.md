# Sandbox Docker - Node.js

## Lancement

```bash
docker compose up -d --build
```

## Vérification

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/version
```

## Arrêt

```bash
docker compose down
```

## Logs

```bash
docker compose logs -f
```


## Commandes 

```bash
docker compose down        # stoppe et supprime les conteneurs existants
docker compose build --no-cache  # rebuild l’image en prenant en compte tes modifs
docker compose up -d      # relance les conteneurs en arrière-plan
```