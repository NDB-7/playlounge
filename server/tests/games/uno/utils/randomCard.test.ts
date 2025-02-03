import { describe, it, expect } from "vitest";
import randomCard from "../../../../src/games/uno/utils/randomCard";

describe("Testing random card generation", () => {
  it("Should NEVER return a wildcard if specified not to", () => {
    for (let i = 0; i < 100; i++) {
      const card = randomCard(false);
      expect(card.color).toBeDefined();
      expect(card.face).toBeDefined();
      expect(card.id).toBeDefined();
      expect(card.color).not.toBe("none");
      expect(card.face).not.toBe("none");
    }
  });
  it("Should return a wildcard eventually if specified to", () => {
    let found = false;
    for (let i = 0; i < 100; i++) {
      const card = randomCard(true);
      if (card.color === "none") {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });
  it("Should be able to return all faces", () => {
    const faces = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "skip", "reverse", "+2"];
    for (let i = 0; i < 200; i++) {
      const card = randomCard(false);
      const index = faces.indexOf(card.face);
      if (index !== -1) faces.splice(index, 1);
    }
    expect(faces.length).toBe(0);
    const wildFaces = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "skip",
      "reverse",
      "+2",
      "none",
    ];
    for (let i = 0; i < 200; i++) {
      const card = randomCard(true);
      const index = wildFaces.indexOf(card.face);
      if (index !== -1) wildFaces.splice(index, 1);
    }
    expect(wildFaces.length).toBe(0);
  });
});
