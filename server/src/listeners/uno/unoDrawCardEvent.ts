import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import { UnoPlayer } from "../../games/uno/types.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import randomCard from "../../games/uno/utils/randomCard.js";

export default function unoDrawCardEvent(socket: Socket) {
  socket.on("uno:drawCard", session => {
    if (session) {
      const code: string = session.room;
      const {
        game: { mode, state, gameData },
      } = activeRoomsMap.get(code);

      if (state === "active" && mode === "UNO") {
        let player: UnoPlayer;

        gameData.players.forEach(plr => {
          if (plr.id === session.id) player = plr;
        });

        if (player && gameData.players[gameData.turn] === player) {
          player.cards.push(randomCard(true));
          gameData.turn = findNextTurn(gameData);
          syncClientState(code);
        }
      }
    }
  });
}
