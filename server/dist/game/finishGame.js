import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
export default function finishGame(code, winner) {
    const { game } = activeRoomsMap.get(code);
    if (game.state !== "active")
        return;
    game.state = "finished";
    game.gameData = null;
    const { mode } = game;
    io.to(code).emit("game:gameStateChanged", { state: "finished", mode });
    // Emit game rankings later!
    io.to(code).emit("chat:receiveMessage", {
        content: winner
            ? `${winner} won the ${mode} game!`
            : `A game of ${mode} has ended!`,
        serverNotification: true,
    });
}
//# sourceMappingURL=finishGame.js.map