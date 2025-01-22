import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import { Card, Colors, UnoPlayer, WildCard } from "../../games/uno/types.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import finishGame from "../../game/finishGame.js";
import randomCard from "../../games/uno/utils/randomCard.js";
import checkLegalMove from "../../games/uno/utils/checkLegalMove.js";

export default function unoCardEvent(socket: Socket) {
  socket.on(
    "uno:placeCard",
    (session, card: Card | WildCard, newColor?: Colors) => {
      if (session) {
        const code: string = session.room;
        const room = activeRoomsMap.get(code);
        const {
          game: { mode, state, gameData },
        } = room;

        if (state === "active" && mode === "UNO") {
          const { players } = gameData;
          let player: UnoPlayer;

          players.forEach(plr => {
            if (plr.id === session.id) player = plr;
          });

          if (player) {
            const cardIndex = findPlayerCard(
              player,
              !newColor
                ? card
                : ({ face: card.face, color: "none" } as WildCard)
            );
            if (
              players[gameData.turn] === player &&
              cardIndex >= 0 &&
              checkLegalMove(card, gameData.lastCard)
            ) {
              player.cards.splice(cardIndex, 1);
              if (player.cards.length === 0) {
                finishGame(code, player.name);
              } else {
                if (card.color === "none") {
                  if (newColor && isColor(newColor)) card.color = newColor;
                  else card.color = "red";
                }
                gameData.lastCard = card;
                player.justDrewCard = false;
                findNextTurn(room, card);
                if (card.face === "+2" || card.face === "+4") {
                  const victim = players[gameData.turn];
                  victim.cards.push(
                    ...Array.from({ length: card.face === "+2" ? 2 : 4 }, () =>
                      randomCard(true)
                    )
                  );
                  findNextTurn(room, card);
                }
                syncClientState(code);
              }
            }
          }
        }
      }
    }
  );
}

function findPlayerCard(player: UnoPlayer, card: Card | WildCard) {
  let cardIndex = -1;
  player.cards.forEach((currentCard, index) => {
    if (currentCard.id === card.id) {
      cardIndex = index;
    }
  });
  if (cardIndex === -1) {
    // Accounts for wildcards and +4 cards
    player.cards.forEach((currentCard, index) => {
      if (currentCard.color === card.color && currentCard.face === card.face) {
        cardIndex = index;
      }
    });
  }
  return cardIndex;
}

function isColor(newColor: any): newColor is Colors {
  return ["red", "blue", "green", "yellow"].includes(newColor);
}
