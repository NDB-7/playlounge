import activeRoomsMap from "../../config/activeRoomsMap.js";
import { rateLimitMap } from "../../middleware/rateLimit.js";
import updateUserListForClients from "../../rooms/updateUserListForClients.js";
import { io } from "../../index.js";
import sendServerNotification from "../../rooms/sendServerNotification.js";
export default function disconnectEvent(socket) {
    const id = socket.id;
    socket.on("disconnect", () => {
        let code;
        activeRoomsMap.forEach((room, roomCode) => {
            if (room.activeSessionsMap.has(id)) {
                code = roomCode;
            }
        });
        rateLimitMap.delete(id);
        if (code) {
            const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(code);
            const sessionId = activeSessionsMap.get(id);
            const { name, role } = sessionToUsersMap.get(sessionId);
            console.log(`User ${id} (${name}) disconnected.`);
            activeSessionsMap.delete(id);
            // Promote first user in the room when the owner leaves
            if (role === "owner" && activeSessionsMap.size > 0) {
                const firstUserSessionId = activeSessionsMap.values().next().value;
                const newOwnerName = sessionToUsersMap.get(firstUserSessionId).name;
                sessionToUsersMap.set(firstUserSessionId, {
                    name: newOwnerName,
                    role: "owner",
                });
                console.log(`${newOwnerName} is now owner in room ${code}`);
                io.to(code).emit("room:ownerChange", newOwnerName);
                sendServerNotification(code, `${newOwnerName} was promoted to owner.`);
            }
            updateUserListForClients(code);
            sendServerNotification(code, `${name} left the game.`);
        }
        else
            console.log(`User ${id} disconnected.`);
    });
}
//# sourceMappingURL=disconnectEvent.js.map