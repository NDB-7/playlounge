import activeRoomsMap from "../config/activeRoomsMap.js";
import { UnoPlayer } from "../games/uno/types.js";
import { io } from "../index.js";

export default function finishGame(code: string, winner: string | null) {
  const { game } = activeRoomsMap.get(code);

  if (game.state !== "active") return;

  game.state = "finished";

  const { mode, gameData } = game;

  // Check game data for player scores later!

  io.to(code).emit("game:gameStateChanged", { state: "finished", mode });
  // Emit game rankings later!
  io.to(code).emit("chat:receiveMessage", {
    content: winner
      ? `${winner} won the ${mode} game!`
      : `A game of ${mode} has ended!`,
    serverNotification: true,
  });
}
