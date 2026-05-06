# Correction Campus Quest REST API

Structure:

```
corrections/campus-quest-rest/
  src/
    server.js
    controllers/campusController.js
    services/campusService.js
  data/
    players.json
    enigmes.json
    attempts.json
```

## Lancer

Depuis la racine `sandbox-server`:

```bash
node corrections/campus-quest-rest/src/server.js
```

Serveur sur `http://localhost:3001`.

## Routes

1. `POST /players`
2. `GET /enigmes` (sans `answer`)
3. `POST /enigmes/:id/answer`
4. `GET /leaderboard`

## Quick test

```bash
curl -X POST http://localhost:3001/players \
  -H "content-type: application/json" \
  -d '{"name":"Alice"}'

curl http://localhost:3001/enigmes

curl -X POST http://localhost:3001/enigmes/e1/answer \
  -H "content-type: application/json" \
  -d '{"playerId":"<ID_PLAYER>","answer":"echo"}'

curl http://localhost:3001/leaderboard
```
