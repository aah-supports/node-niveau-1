import express from "express";
import {
  answerEnigmeController,
  createPlayerController,
  getEnigmesController,
  getLeaderboardController
} from "./controllers/campusController.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post("/players", createPlayerController);
app.get("/enigmes", getEnigmesController);
app.post("/enigmes/:id/answer", answerEnigmeController);
app.get("/leaderboard", getLeaderboardController);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "route not found" });
});

app.listen(port, () => {
  console.log(`Campus Quest REST API listening on ${port}`);
});
