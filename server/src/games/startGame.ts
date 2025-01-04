import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";

export default function startGame(code: string, gamemode: string) {
  const { game } = activeRoomsMap.get(code);

  if (game.state !== "waiting") return;

  game.mode = gamemode;
  game.state = "active";

  io.to(code).emit("game:gameStateChanged", {
    state: "active",
    mode: gamemode,
  });
  io.to(code).emit("chat:receiveMessage", {
    content: `A game of ${gamemode} has begun!`,
    serverNotification: true,
  });
}
