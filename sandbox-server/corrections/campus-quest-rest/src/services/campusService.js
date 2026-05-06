import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const playersPath = new URL("../../data/players.json", import.meta.url);
const enigmesPath = new URL("../../data/enigmes.json", import.meta.url);
const attemptsPath = new URL("../../data/attempts.json", import.meta.url);

const readJson = async (pathUrl) => {
  const raw = await readFile(pathUrl, "utf-8");
  return JSON.parse(raw);
};

const writeJson = async (pathUrl, data) => {
  await writeFile(pathUrl, JSON.stringify(data, null, 2), "utf-8");
};

const normalize = (value) => String(value ?? "").trim().toLowerCase();

export const createPlayer = async ({ name }) => {
  const cleanName = String(name ?? "").trim();

  if (!cleanName) {
    return { status: 400, body: { error: "name is required" } };
  }

  const players = await readJson(playersPath);

  if (!Array.isArray(players)) {
    return { status: 500, body: { error: "players.json format is invalid" } };
  }

  const player = {
    id: randomUUID(),
    name: cleanName,
    xp: 0,
    solvedEnigmes: []
  };

  players.push(player);
  await writeJson(playersPath, players);

  return { status: 201, body: player };
};

export const getPublicEnigmes = async () => {
  const enigmes = await readJson(enigmesPath);

  if (!Array.isArray(enigmes)) {
    return { status: 500, body: { error: "enigmes.json format is invalid" } };
  }

  const publicEnigmes = enigmes.map(({ answer, ...rest }) => rest);
  return { status: 200, body: publicEnigmes };
};

export const answerEnigme = async (enigmeId, { playerId, answer }) => {
  const cleanPlayerId = String(playerId ?? "").trim();
  const cleanAnswer = String(answer ?? "").trim();

  if (!cleanPlayerId || !cleanAnswer) {
    return { status: 400, body: { error: "playerId and answer are required" } };
  }

  const [players, enigmes, attempts] = await Promise.all([
    readJson(playersPath),
    readJson(enigmesPath),
    readJson(attemptsPath)
  ]);

  const player = players.find((item) => item.id === cleanPlayerId);
  if (!player) {
    return { status: 404, body: { error: "player not found" } };
  }

  const enigme = enigmes.find((item) => item.id === enigmeId);
  if (!enigme) {
    return { status: 404, body: { error: "enigme not found" } };
  }

  const isCorrect = normalize(cleanAnswer) === normalize(enigme.answer);
  const solvedEnigmes = Array.isArray(player.solvedEnigmes) ? player.solvedEnigmes : [];
  const alreadySolved = solvedEnigmes.includes(enigme.id);

  let gainedXp = 0;
  if (isCorrect && !alreadySolved) {
    gainedXp = Number(enigme.xp) || 0;
    player.xp = Number(player.xp || 0) + gainedXp;
    solvedEnigmes.push(enigme.id);
    player.solvedEnigmes = solvedEnigmes;
    await writeJson(playersPath, players);
  }

  attempts.push({
    id: randomUUID(),
    playerId: cleanPlayerId,
    enigmeId: enigme.id,
    answer: cleanAnswer,
    correct: isCorrect,
    createdAt: new Date().toISOString()
  });
  await writeJson(attemptsPath, attempts);

  return {
    status: 200,
    body: {
      correct: isCorrect,
      alreadySolved,
      gainedXp,
      totalXp: Number(player.xp || 0)
    }
  };
};

export const getLeaderboard = async () => {
  const players = await readJson(playersPath);

  if (!Array.isArray(players)) {
    return { status: 500, body: { error: "players.json format is invalid" } };
  }

  const leaderboard = [...players]
    .sort((a, b) => Number(b.xp || 0) - Number(a.xp || 0))
    .map((player, index) => ({
      rank: index + 1,
      id: player.id,
      name: player.name,
      xp: Number(player.xp || 0)
    }));

  return { status: 200, body: leaderboard };
};
