import activeRoomsMap from "../../config/activeRoomsMap.js";
import { io } from "../../index.js";
import gameOptions from "../../config/gameOptions.js";
export default function startGame(socket) {
    const id = socket.id;
    socket.on("game:startGame", (session, gamemode) => {
        if (session) {
            const room = activeRoomsMap.get(session.room);
            const user = room.sessionToUsersMap.get(session.id);
            if (user?.role === "owner" &&
                gameOptions.some(item => item.name === gamemode)) {
                console.log(`User ${id} (${user.name}) started game ${gamemode}`);
                io.to(session.room).emit("game:gameStarted");
            }
        }
    });
}
//# sourceMappingURL=startGame.js.map