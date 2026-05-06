import { readFile, writeFile } from "node:fs/promises";

import { playersPath, enigmesPath, attemptsPath } from "../config/app.js";

export const readPlayers = async (encode = "utf-8") => {
    const data = await readFile(playersPath, encode);
    return JSON.parse(data);
};

// single responsability 
export const writePlayers = async (players, encode = "utf-8") => {
    await writeFile(playersPath, JSON.stringify(players, null, 2), encode);
};

export const readEnigmes = async (encode = "utf-8") => {
    const data = await readFile(enigmesPath, encode);
    return JSON.parse(data);
};

export const readAttempts = async (encode = "utf-8") => {
    try {
        const data = await readFile(attemptsPath, encode);
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
};

export const writeAttempts = async (attempts, encode = "utf-8") => {
    await writeFile(attemptsPath, JSON.stringify(attempts, null, 2), encode);
};
