import activeRoomsMap from "../../config/activeRoomsMap.js";
import updateUserListForClients from "../../rooms/updateUserListForClients.js";
import { io } from "../../index.js";
import mapHasValue from "../../utils/mapHasValue.js";
export default function rejoinEvent(socket) {
    const id = socket.id;
    socket.on("room:rejoin", (session, callback) => {
        if (activeRoomsMap.has(session.room)) {
            const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(session.room);
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
                    activeSessionsMap.set(id, session.id);
                    socket.join(session.room);
                    updateUserListForClients(session.room);
                    callback({
                        success: true,
                        name: sessionToUsersMap.get(session.id).name,
                    });
                    const message = {
                        content: `${sessionToUsersMap.get(session.id).name} rejoined the game.`,
                        serverNotification: true,
                    };
                    io.to(session.room).emit("chat:receiveMessage", message);
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