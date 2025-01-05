import rejoinEvent from "./listeners/room/rejoinEvent.js";
import disconnectEvent from "./listeners/connections/disconnectEvent.js";
import nameEvent from "./listeners/room/nameEvent.js";
import messageEvent from "./listeners/chat/messageEvent.js";
import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import router from "./routes/router.js";
import startGameEvent from "./listeners/game/startGameEvent.js";
import unoCardEvent from "./listeners/uno/unoCardEvent.js";
import unoDrawCardEvent from "./listeners/uno/unoDrawCardEvent.js";
const PORT = process.env.PORT || 4444;
export const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
    },
    connectionStateRecovery: {},
});
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", router);
io.on("connection", socket => {
    const id = socket.id;
    console.log(`User ${id} connected`);
    rejoinEvent(socket);
    disconnectEvent(socket);
    nameEvent(socket);
    messageEvent(socket);
    startGameEvent(socket);
    // -- Games -- \\
    // UNO
    unoCardEvent(socket);
    unoDrawCardEvent(socket);
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map