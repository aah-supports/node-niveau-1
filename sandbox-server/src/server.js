// point d'entrée de l'application 

import express from "express";
import { createPlayerController, playersController } from "./controllers/playerController.js";
import { answerEnigmeController, enigmesController } from "./controllers/enigmeController.js";

const app = express();

app.use(express.json());

// endpoint connecter à son controleur
app.get("/players", playersController);

// POST /players
app.post("/players", createPlayerController);
app.get("/enigmes", enigmesController);
app.post("/enigmes/:id/answer", answerEnigmeController);
app.post("/enigmes/:id/answers", answerEnigmeController);

app.listen(3000, () => {
  console.log(`Server listening on 3000`);
});
