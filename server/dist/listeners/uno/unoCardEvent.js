import activeRoomsMap from "../../config/activeRoomsMap.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import finishGame from "../../game/finishGame.js";
export default function unoCardEvent(socket) {
    const id = socket.id;
    socket.on("uno:placeCard", (session, card, newColor) => {
        if (session) {
            const code = session.room;
            const { game: { mode, state, gameData }, } = activeRoomsMap.get(code);
            if (state === "active" && mode === "UNO") {
                let player;
                gameData.players.forEach(plr => {
                    if (plr.id === session.id)
                        player = plr;
                });
                if (player) {
                    const cardIndex = findPlayerCard(player, card);
                    if (gameData.players[gameData.turn] === player &&
                        cardIndex >= 0 &&
                        checkLegalMove(card, gameData.lastCard)) {
                        player.cards.splice(cardIndex, 1);
                        if (player.cards.length === 0) {
                            finishGame(code, player.name);
                        }
                        else {
                            if (card.color === "none" && newColor && isColor(newColor))
                                card.color = newColor;
                            gameData.lastCard = card;
                            gameData.turn = findNextTurn(gameData, card);
                            syncClientState(code);
                        }
                    }
                }
            }
        }
    });
}
function findPlayerCard(player, card) {
    player.cards.forEach((currentCard, index) => {
        if (currentCard.color === card.color && currentCard.face === card.face)
            return index;
    });
    return -1;
}
function checkLegalMove(card, lastCard) {
    if (card.color === "none" ||
        card.color === lastCard.color ||
        card.face === lastCard.face)
        return true;
    return false;
}
function isColor(newColor) {
    return ["red", "blue", "green"].includes(newColor);
}
//# sourceMappingURL=unoCardEvent.js.map