import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
import updateUserListForClients from "./updateUserListForClients.js";
export default function joinRoom(name, code, socket, sessionId) {
    const { id } = socket;
    const room = activeRoomsMap.get(code);
    const { sessionToUsersMap, activeSessionsMap } = room;
    const role = activeSessionsMap.size === 0 ? "owner" : "player";
    sessionToUsersMap.set(sessionId, { name, role });
    activeSessionsMap.set(id, sessionId);
    socket.join(code);
    if (role === "owner")
        io.to(code).emit("room:ownerChange", name);
    else {
        // Tells the user who the owner is, if they aren't the owner themself
        let owner = "";
        sessionToUsersMap.forEach(user => {
            if (user.role === "owner")
                owner = user.name;
        });
        socket.emit("room:ownerChange", owner);
    }
    console.log(`${name} joined as ${role} in room ${code}`);
    updateUserListForClients(code);
    const message = {
        content: `${name} joined the game.`,
        serverNotification: true,
    };
    io.to(code).emit("chat:receiveMessage", message);
    const { state, mode } = room.game;
    socket.emit("game:gameStateChanged", { state, mode });
}
//# sourceMappingURL=joinRoom.js.map