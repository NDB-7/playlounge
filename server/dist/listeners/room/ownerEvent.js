import activeRoomsMap from "../../config/activeRoomsMap.js";
import { io } from "../../index.js";
import sendServerNotification from "../../rooms/sendServerNotification.js";
export default function ownerEvent(socket) {
    socket.on("room:ownerTransfer", (session, name) => {
        const { room: code } = session;
        if (activeRoomsMap.has(code)) {
            const { sessionToUsersMap } = activeRoomsMap.get(code);
            const oldOwner = sessionToUsersMap.get(session.id);
            if (oldOwner?.role === "owner") {
                sessionToUsersMap.forEach(newOwner => {
                    if (newOwner.name === name) {
                        oldOwner.role = "player";
                        newOwner.role = "owner";
                        io.to(code).emit("room:ownerChange", name);
                        sendServerNotification(code, `${name} was promoted to owner.`);
                    }
                });
            }
        }
    });
}
//# sourceMappingURL=ownerEvent.js.map