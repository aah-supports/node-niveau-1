import express from "express";
// import fs from "node:fs/promises";
// const { readFile, writeFile } = fs ;
import { readFile, writeFile } from "node:fs/promises";

const app = express();
const port = process.env.PORT || 3000;
const playersPath = new URL("../data/players.json", import.meta.url);

// middleware 
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ hello: "WORLD" });
});

app.get("/players", async (_req, res) => {

  const players = await readFile(playersPath, "utf-8");
  const playersJson = JSON.parse(players);

  // "" 0 false null undefined considérer comme faux dans un test JS 
  // ici on teste si c'est un array et pas vide 
  if (!Array.isArray(playersJson) || playersJson.length === 0) {
    return res.status(404).json({ response: "Aucun joueur trouvé" });
  }

  return res.status(200).json(playersJson);
});

app.post("/players", async (req, res) => {

})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
