import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
export default function updateUserListForClients(room) {
    const onlineUserList = [];
    const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(room);
    sessionToUsersMap.forEach((name, sessionId) => {
        if (new Set(activeSessionsMap.values()).has(sessionId))
            onlineUserList.push(name);
    });
    io.to(room).emit("room:updateUserList", onlineUserList);
}
//# sourceMappingURL=updateUserListForClients.js.map