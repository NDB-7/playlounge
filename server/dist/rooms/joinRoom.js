import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
import updateUserListForClients from "./updateUserListForClients.js";
export default function joinRoom(name, room, socket, sessionId) {
    const { id } = socket;
    const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(room);
    const role = activeSessionsMap.size === 0 ? "owner" : "player";
    sessionToUsersMap.set(sessionId, { name, role });
    activeSessionsMap.set(id, sessionId);
    socket.join(room);
    if (role === "owner")
        io.to(room).emit("room:ownerChange", name);
    console.log(`${name} joined as ${role} in room ${room}`);
    updateUserListForClients(room);
    const message = {
        content: `${name} joined the game.`,
        serverNotification: true,
    };
    io.to(room).emit("chat:receiveMessage", message);
}
//# sourceMappingURL=joinRoom.js.map