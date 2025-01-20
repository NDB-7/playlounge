import { io } from "../index.js";
export default function sendServerNotification(code, content) {
    const message = {
        content,
        serverNotification: true,
    };
    io.to(code).emit("chat:receiveMessage", message);
}
//# sourceMappingURL=sendServerNotification.js.map