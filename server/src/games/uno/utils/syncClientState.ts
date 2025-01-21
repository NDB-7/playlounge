import { Socket } from "socket.io";
import activeRoomsMap from "../../../config/activeRoomsMap.js";
import { io } from "../../../index.js";
import { UnoClientState, UnoSpectatorState } from "../types.js";

export default function syncClientState(code: string) {
  const {
    game: { gameData },
    activeSessionsMap,
  } = activeRoomsMap.get(code);
  if (gameData) {
    const { players, spectators, lastCard, turn } = gameData;

    const whoseTurn = players[turn].name;

    players.forEach(player => {
      let socket: Socket;

      activeSessionsMap.forEach((sessionId, socketId) => {
        if (spectators.includes(socketId))
          spectators.splice(spectators.indexOf(socketId), 1);
        if (sessionId === player.id) socket = io.sockets.sockets.get(socketId);
      });

      if (socket) {
        const otherPlayers = players.map(otherPlayer => {
          if (otherPlayer.id !== player.id)
            return {
              name: otherPlayer.name,
              cardCount: otherPlayer.cards.length,
            };
        });

        const clientState: UnoClientState = {
          otherPlayers,
          lastCard,
          cards: player.cards,
          whoseTurn,
        };

        socket.emit("uno:updateState", clientState);
      }
    });

    spectators.forEach(spectatorId => {
      let socket = io.sockets.sockets.get(spectatorId);

      if (socket) {
        const otherPlayers = players.map(otherPlayer => ({
          name: otherPlayer.name,
          cardCount: otherPlayer.cards.length,
        }));

        const clientState: UnoSpectatorState = {
          players: otherPlayers,
          lastCard,
          whoseTurn,
        };

        console.log(clientState);
        socket.emit("uno:updateState", clientState);
      }
    });
  }
}
