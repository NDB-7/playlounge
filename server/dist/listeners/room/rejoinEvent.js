import activeRoomsMap from "../../config/activeRoomsMap.js";
import updateUserListForClients from "../../rooms/updateUserListForClients.js";
import { io } from "../../index.js";
import mapHasValue from "../../utils/mapHasValue.js";
export default function rejoinEvent(socket) {
    const id = socket.id;
    socket.on("room:rejoin", (session, callback) => {
        const { room } = session;
        if (activeRoomsMap.has(room)) {
            const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(room);
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
                    activeSessionsMap.set(id, session.id);
                    socket.join(room);
                    if (activeSessionsMap.size === 1) {
                        sessionToUsersMap.set(session.id, { name, role: "owner" });
                        io.to(room).emit("room:ownerChange", name);
                        console.log(`${name} rejoined and is owner in room ${room}`);
                    }
                    updateUserListForClients(room);
                    callback({
                        success: true,
                        name,
                    });
                    const message = {
                        content: `${sessionToUsersMap.get(session.id).name} rejoined the game.`,
                        serverNotification: true,
                    };
                    io.to(room).emit("chat:receiveMessage", message);
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