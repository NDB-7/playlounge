import activeRoomsMap from "../../config/activeRoomsMap.js";
import resetGame from "../../game/resetGame.js";
export default function resetGameEvent(socket) {
    socket.on("game:reset", session => {
        if (session) {
            const code = session.room;
            const { sessionToUsersMap } = activeRoomsMap.get(code);
            const user = sessionToUsersMap.get(session.id);
            if (user?.role === "owner") {
                resetGame(code);
            }
        }
    });
}
//# sourceMappingURL=resetGameEvent.js.map