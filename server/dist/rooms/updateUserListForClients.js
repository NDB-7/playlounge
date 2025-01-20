import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
import mapHasValue from "../utils/mapHasValue.js";
export default function updateUserListForClients(code) {
    const onlineUserList = [];
    const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(code);
    sessionToUsersMap.forEach(({ name }, sessionId) => {
        if (mapHasValue(activeSessionsMap, sessionId))
            onlineUserList.push(name);
    });
    io.to(code).emit("room:updateUserList", onlineUserList);
}
//# sourceMappingURL=updateUserListForClients.js.map