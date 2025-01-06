import activeRoomsMap from "../../../config/activeRoomsMap.js";
import { io } from "../../../index.js";
export default function syncClientState(code) {
    const { game: { gameData }, activeSessionsMap, } = activeRoomsMap.get(code);
    const { players, lastCard, turn } = gameData;
    const whoseTurn = players[turn].name;
    players.forEach(player => {
        let socket;
        activeSessionsMap.forEach((sessionId, socketId) => {
            if (sessionId === player.id)
                socket = io.sockets.sockets.get(socketId);
        });
        if (socket) {
            const otherPlayers = players.map(otherPlayer => {
                if (otherPlayer.id !== player.id)
                    return {
                        name: otherPlayer.name,
                        cardCount: otherPlayer.cards.length,
                    };
            });
            const clientState = {
                otherPlayers,
                lastCard,
                cards: player.cards,
                whoseTurn,
            };
            socket.emit("uno:updateState", clientState);
        }
    });
}
//# sourceMappingURL=syncClientState.js.map