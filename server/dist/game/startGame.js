import activeRoomsMap from "../config/activeRoomsMap.js";
import initUno from "../games/uno/initUno.js";
import { io } from "../index.js";
export default function startGame(code, gamemode) {
    const room = activeRoomsMap.get(code);
    const game = room.game;
    if (game.state !== "waiting")
        return;
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
    if (game.mode === "UNO")
        initUno(code);
}
//# sourceMappingURL=startGame.js.map