import { createPlayer, getPlayers } from "../services/playerService.js";

// son role c'est etre un chef d'orchreste == un role unique 
export const playersController = async (_req, res) => {
  try {
    
    const result =  await getPlayers() // lever une exception 
    return res.status(result.status).json({result : result.body}); 
  } catch (_error) {
    // erreur de type serveur qui peut être levée par la lecture du fichier (persistance )
    return res.status(500).json({ response: "Erreur serveur" });
  }
};

export const createPlayerController = async (req, res) => {
  try {
    const result = await createPlayer(req.body ?? {});
    return res.status(result.status).json(result.body);
  } catch (_error) {
    return res.status(500).json({ response: "Erreur serveur" });
  }
};