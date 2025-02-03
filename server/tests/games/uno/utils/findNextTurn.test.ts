import { describe, expect, it } from "vitest";
import findNextTurn from "../../../../src/games/uno/utils/findNextTurn";
import mockRoom from "../../../mock-room";

describe("Testing finding the next turn", () => {
  const players = [
    { id: "1", name: "Player 1", cards: [], justDrewCard: false },
    { id: "2", name: "Player 2", cards: [], justDrewCard: false },
    { id: "3", name: "Player 3", cards: [], justDrewCard: false },
  ];
  mockRoom.activeSessionsMap.clear();
  players.forEach(player => {
    mockRoom.activeSessionsMap.set(player.id, player.id);
  });
  const game = mockRoom.game;
  game.mode = "UNO";
  game.state = "active";
  game.gameData = {
    players,
    spectators: [],
    lastCard: { color: "blue", face: 0, id: "" },
    turn: 0,
    reversed: false,
  };

  it("Should go to next turn under normal conditions", () => {
    findNextTurn(mockRoom, { color: "blue", face: 0, id: "" });
    expect(game.gameData!.turn).toBe(1);
  });
  it("Should return to first player after last player", () => {
    game.gameData!.turn = 2;
    findNextTurn(mockRoom, { color: "blue", face: 0, id: "" });
    expect(game.gameData!.turn).toBe(0);
  });
  it("Should skip a player if a skip card is played", () => {
    game.gameData!.turn = 0;
    findNextTurn(mockRoom, { color: "blue", face: "skip", id: "" });
    expect(game.gameData!.turn).toBe(2);
  });
  it("Should reverse the order of play if a reverse card is played", () => {
    game.gameData!.turn = 0;
    findNextTurn(mockRoom, { color: "blue", face: "reverse", id: "" });
    expect(game.gameData!.turn).toBe(2);
    findNextTurn(mockRoom, { color: "blue", face: "reverse", id: "" });
    expect(game.gameData!.turn).toBe(0);
  });
  it("Should skip a player if a skip card is played and the order is reversed", () => {
    game.gameData!.turn = 2;
    game.gameData!.reversed = true;
    findNextTurn(mockRoom, { color: "blue", face: "skip", id: "" });
    expect(game.gameData!.turn).toBe(0);
  });
  it("Should skip a disconnected player", () => {
    game.gameData!.turn = 0;
    game.gameData!.reversed = false;
    mockRoom.activeSessionsMap.delete("2");
    findNextTurn(mockRoom, { color: "blue", face: 0, id: "" });
    expect(game.gameData!.turn).toBe(2);
    findNextTurn(mockRoom, { color: "blue", face: 0, id: "" });
    expect(game.gameData!.turn).toBe(0);
  });
  it("Should skip all disconnected players", () => {
    mockRoom.activeSessionsMap.delete("3");
    findNextTurn(mockRoom, { color: "blue", face: 0, id: "" });
    expect(game.gameData!.turn).toBe(0);
    findNextTurn(mockRoom, { color: "blue", face: "skip", id: "" });
    expect(game.gameData!.turn).toBe(0);
  });
});
