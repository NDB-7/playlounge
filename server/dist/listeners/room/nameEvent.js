import { z } from "zod";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import mapHasValue from "../../utils/mapHasValue.js";
import joinRoom from "../../rooms/joinRoom.js";
const nameSchema = z.string().min(1).max(20);
export default function nameEvent(socket) {
    const id = socket.id;
    socket.on("room:setName", (baseName, room, callback) => {
        const { success, data: name } = nameSchema.safeParse(baseName.trim());
        const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(room);
        if (success) {
            if (activeSessionsMap.size >= 4) {
                console.log(`User ${id} attempted to join full room ${room}`);
                callback({
                    success: false,
                    message: "This game is full.",
                });
            }
            else if (mapHasValue(sessionToUsersMap, { name, role: "owner" }) ||
                mapHasValue(sessionToUsersMap, { name, role: "player" }) ||
                name === "You") {
                console.log(`User ${id} attempted to set their name to ${name} in room ${room}`);
                callback({
                    success: false,
                    message: "This name has already been used, try another one.",
                });
            }
            else {
                const sessionId = crypto.randomUUID();
                callback({ success: true, session: { room, id: sessionId } });
                joinRoom(name, room, socket, sessionId);
            }
        }
    });
}
//# sourceMappingURL=nameEvent.js.map