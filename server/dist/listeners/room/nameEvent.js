import { z } from "zod";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import updateUserListForClients from "../../rooms/updateUserListForClients.js";
import { io } from "../../index.js";
import mapHasValue from "../../utils/mapHasValue.js";
const nameSchema = z.string().min(1).max(20);
export default function nameEvent(socket) {
    const id = socket.id;
    socket.on("room:setName", (name, room, callback) => {
        const { success, data } = nameSchema.safeParse(name.trim());
        const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(room);
        if (success) {
            if (activeSessionsMap.size >= 4) {
                console.log(`User ${id} attempted to join full room ${room}`);
                callback({
                    success: false,
                    message: "This game is full.",
                });
            }
            else if (mapHasValue(sessionToUsersMap, { name: data, role: "owner" }) ||
                mapHasValue(sessionToUsersMap, { name: data, role: "player" }) ||
                data === "You") {
                console.log(`User ${id} attempted to set their name to ${data} in room ${room}`);
                callback({
                    success: false,
                    message: "This name has already been used, try another one.",
                });
            }
            else {
                console.log(`User ${id} set their name to ${data} in room ${room}`);
                const sessionId = crypto.randomUUID();
                callback({ success: true, session: { room, id: sessionId } });
                const role = activeSessionsMap.size === 0 ? "owner" : "player";
                console.log(`${data} is ${role} in room ${room}`);
                sessionToUsersMap.set(sessionId, { name: data, role });
                activeSessionsMap.set(id, sessionId);
                socket.join(room);
                if (role === "owner")
                    io.to(room).emit("room:ownerChange", data);
                updateUserListForClients(room);
                const message = {
                    content: `${data} joined the game.`,
                    serverNotification: true,
                };
                io.to(room).emit("chat:receiveMessage", message);
            }
        }
    });
}
//# sourceMappingURL=nameEvent.js.map