import activeRoomsMap from "../../config/activeRoomsMap.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import randomCard from "../../games/uno/utils/randomCard.js";
import checkLegalMove from "../../games/uno/utils/checkLegalMove.js";
export default function unoDrawCardEvent(socket) {
    socket.on("uno:drawCard", session => {
        if (session) {
            const code = session.room;
            const { game: { mode, state, gameData }, } = activeRoomsMap.get(code);
            if (state === "active" && mode === "UNO") {
                let player;
                gameData.players.forEach(plr => {
                    if (plr.id === session.id)
                        player = plr;
                });
                if (player && gameData.players[gameData.turn] === player) {
                    const card = randomCard(true);
                    player.cards.push(card);
                    if (!checkLegalMove(card, gameData.lastCard) || player.justDrewCard) {
                        player.justDrewCard = false;
                        gameData.turn = findNextTurn(gameData);
                    }
                    else
                        player.justDrewCard = true;
                    syncClientState(code);
                }
            }
        }
    });
}
//# sourceMappingURL=unoDrawCardEvent.js.map