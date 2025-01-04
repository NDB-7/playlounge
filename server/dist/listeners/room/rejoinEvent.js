import activeRoomsMap from "../../config/activeRoomsMap.js";
import mapHasValue from "../../utils/mapHasValue.js";
import joinRoom from "../../rooms/joinRoom.js";
export default function rejoinEvent(socket) {
    socket.on("room:rejoin", (session, callback) => {
        const { room: code } = session;
        if (activeRoomsMap.has(code)) {
            const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(code);
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