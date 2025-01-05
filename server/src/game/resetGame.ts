import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";

export default function resetGame(code: string) {
  const { game } = activeRoomsMap.get(code);

  if (game.state !== "finished") return;

  game.state = "waiting";
  game.mode = null;

  io.to(code).emit("game:gameStateChanged", { state: "waiting", mode: null });
}
