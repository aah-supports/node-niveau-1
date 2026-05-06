import crypto from "node:crypto";
import { readPlayers, writePlayers } from "./fileService.js";

// single responsability 
export const getPlayers = async () => {
  const players = await readPlayers();

  if (!Array.isArray(players) || players.length === 0) {
    return { status: 404, body: { error: "player not found" } };
  }

  return { status: 200, body: players };
};

export const createPlayer = async ({ name, level }) => {
  const players = await readPlayers(); // un service peut utiliser un autre service 

  // error first 
  if (!Array.isArray(players)) {
    return { status: 500, body: { response: "Format de données invalide" } };
  }

  // error first 
  if (!name) {
    return { status: 400, body: { response: "Le champ name est requis" } };
  }

  const newPlayer = {
    id: crypto.randomUUID(),
    name,
    level,
    createdAt: new Date().toISOString()
  };

  players.push(newPlayer);
  await writePlayers(players); // on utilise un autre service 

  return { status: 201, body: newPlayer };
};