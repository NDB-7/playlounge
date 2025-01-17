import mapHasValue from "../../../utils/mapHasValue.js";
import { Card, UnoGameData, WildCard } from "../types.js";

export default function findNextTurn(
  gameData: UnoGameData,
  activeSessionsMap: Map<string, string>,
  card?: Card | WildCard,
  turn?: number
) {
  const playerCount = gameData.players.length;
  const oldTurn = turn || gameData.turn;
  let newTurn: number;

  switch (card?.face) {
    case "reverse":
      if (playerCount === 2) {
        newTurn = oldTurn;
      } else {
        gameData.reversed = !gameData.reversed;
        newTurn = gameData.reversed ? oldTurn - 1 : oldTurn + 1;
      }
      break;
    case "skip":
      newTurn = gameData.reversed ? oldTurn - 2 : oldTurn + 2;
      break;
    default:
      newTurn = gameData.reversed ? oldTurn - 1 : oldTurn + 1;
  }

  if (newTurn >= playerCount) {
    newTurn -= playerCount;
  } else if (newTurn < 0) {
    newTurn += playerCount;
  }

  if (
    activeSessionsMap.size > 0 &&
    !mapHasValue(activeSessionsMap, gameData.players[newTurn].id)
  )
    return findNextTurn(gameData, activeSessionsMap, undefined, newTurn);

  return newTurn;
}
