import {
  answerEnigme,
  createPlayer,
  getLeaderboard,
  getPublicEnigmes
} from "../services/campusService.js";

export const createPlayerController = async (req, res) => {
  try {
    const result = await createPlayer(req.body ?? {});
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getEnigmesController = async (_req, res) => {
  try {
    const result = await getPublicEnigmes();
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const answerEnigmeController = async (req, res) => {
  try {
    const result = await answerEnigme(req.params.id, req.body ?? {});
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getLeaderboardController = async (_req, res) => {
  try {
    const result = await getLeaderboard();
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
