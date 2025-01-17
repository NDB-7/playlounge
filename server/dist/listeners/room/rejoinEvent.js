import activeRoomsMap from "../../config/activeRoomsMap.js";
import mapHasValue from "../../utils/mapHasValue.js";
import joinRoom from "../../rooms/joinRoom.js";
import rejoinGame from "../../game/rejoinGame.js";
export default function rejoinEvent(socket) {
    socket.on("room:rejoin", (session, callback) => {
        const { room: code } = session;
        if (activeRoomsMap.has(code)) {
            const { sessionToUsersMap, activeSessionsMap, game } = activeRoomsMap.get(code);
            if (activeSessionsMap.size >= 4) {
                callback({
                    success: false,
                    inactive: false,
                    message: "This game is full.",
                });
                sessionToUsersMap.delete(session.id);
            }
            else if (sessionToUsersMap.has(session.id)) {
                if (mapHasValue(activeSessionsMap, session.id))
                    callback({
                        success: false,
                        inactive: false,
                        message: "You already have an active session in this browser, please close it before attempting to open the game again.",
                    });
                else {
                    const { name } = sessionToUsersMap.get(session.id);
                    callback({
                        success: true,
                        name,
                    });
                    joinRoom(name, code, socket, session.id);
                    if (game.state === "active")
                        setTimeout(() => rejoinGame(code, game.mode), 1000);
                }
            }
            else {
                callback({ success: false });
            }
        }
        else {
            callback({
                success: false,
                inactive: true,
                message: "This game is no longer active.",
            });
        }
    });
}
//# sourceMappingURL=rejoinEvent.js.map