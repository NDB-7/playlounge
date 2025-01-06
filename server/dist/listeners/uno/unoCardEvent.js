import activeRoomsMap from "../../config/activeRoomsMap.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import finishGame from "../../game/finishGame.js";
import randomCard from "../../games/uno/utils/randomCard.js";
export default function unoCardEvent(socket) {
    socket.on("uno:placeCard", (session, card, newColor) => {
        if (session) {
            const code = session.room;
            const { game: { mode, state, gameData }, } = activeRoomsMap.get(code);
            if (state === "active" && mode === "UNO") {
                const { players } = gameData;
                let player;
                players.forEach(plr => {
                    if (plr.id === session.id)
                        player = plr;
                });
                if (player) {
                    const cardIndex = findPlayerCard(player, card);
                    if (players[gameData.turn] === player &&
                        cardIndex >= 0 &&
                        checkLegalMove(card, gameData.lastCard)) {
                        player.cards.splice(cardIndex, 1);
                        if (player.cards.length === 0) {
                            finishGame(code, player.name);
                        }
                        else {
                            if (card.color === "none") {
                                if (newColor && isColor(newColor))
                                    card.color = newColor;
                                else
                                    card.color = "red";
                            }
                            gameData.lastCard = card;
                            gameData.turn = findNextTurn(gameData, card);
                            if (card.face === "+2" || card.face === "+4") {
                                const victim = players[gameData.turn];
                                victim.cards.push(...Array.from({ length: card.face === "+2" ? 2 : 4 }, () => randomCard(true)));
                            }
                            syncClientState(code);
                        }
                    }
                }
            }
        }
    });
}
function findPlayerCard(player, card) {
    let cardIndex = -1;
    player.cards.forEach((currentCard, index) => {
        if (JSON.stringify(currentCard) === JSON.stringify(card)) {
            cardIndex = index;
        }
    });
    return cardIndex;
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