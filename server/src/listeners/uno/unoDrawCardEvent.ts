import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import { UnoPlayer } from "../../games/uno/types.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import randomCard from "../../games/uno/utils/randomCard.js";
import checkLegalMove from "../../games/uno/utils/checkLegalMove.js";

export default function unoDrawCardEvent(socket: Socket) {
  socket.on("uno:drawCard", session => {
    if (session) {
      const code: string = session.room;
      const room = activeRoomsMap.get(code);
      const {
        activeSessionsMap,
        game: { mode, state, gameData },
      } = room;

      if (state === "active" && mode === "UNO") {
        let player: UnoPlayer;

        gameData.players.forEach(plr => {
          if (plr.id === session.id) player = plr;
        });

        if (player && gameData.players[gameData.turn] === player) {
          const card = randomCard(true);
          player.cards.push(card);
          if (!checkLegalMove(card, gameData.lastCard) || player.justDrewCard) {
            player.justDrewCard = false;
            findNextTurn(room);
          } else player.justDrewCard = true;
          syncClientState(code);
        }
      }
    }
  });
}
