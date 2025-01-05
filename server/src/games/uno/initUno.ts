import activeRoomsMap from "../../config/activeRoomsMap.js";
import { io } from "../../index.js";
import { UnoGameData } from "./types.js";
import randomCard from "./utils/randomCard.js";
import syncClientState from "./utils/syncClientState.js";

export default function initUno(code: string) {
  const { game, activeSessionsMap } = activeRoomsMap.get(code);
  const players = [];

  activeSessionsMap.forEach((name: string, id: string) => {
    const cards = [];
    cards.fill(randomCard(true), 0, 6);
    players.push({ name, id, cards });
  });

  const gameData: UnoGameData = {
    players,
    lastCard: randomCard(false),
    turn: 0,
  };

  game.gameData = gameData;

  syncClientState(code);
}
