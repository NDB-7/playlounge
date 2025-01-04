import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
export default function finishGame(code) {
    const { game } = activeRoomsMap.get(code);
    if (game.state !== "active")
        return;
    game.state = "finished";
    const { mode, gameData } = game;
    // Check game data for player scores later!
    io.to(code).emit("game:gameStateChanged", { state: "finished", mode });
    // Emit game rankings later!
    io.to(code).emit("chat:receiveMessage", {
        content: `A game of ${mode} has ended!`, // Maybe replace with "{user} won the {mode} game!"
        serverNotification: true,
    });
}
//# sourceMappingURL=finishGame.js.map