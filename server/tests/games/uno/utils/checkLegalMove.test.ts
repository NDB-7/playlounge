import { describe, expect, it } from "vitest";
import checklegalMove from "../../../../src/games/uno/utils/checkLegalMove";

describe("Testing legal move checking", () => {
  it("Should return true if the card is the same color", () => {
    expect(
      checklegalMove(
        { id: "", color: "red", face: 5 },
        { id: "", color: "red", face: 3 }
      )
    ).toBe(true);
  });
  it("Should return true if the card is the same face", () => {
    expect(
      checklegalMove(
        { id: "", color: "red", face: 5 },
        { id: "", color: "blue", face: 5 }
      )
    ).toBe(true);
  });
  it("Should return true if the card is a wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "none", face: "none" },
        { id: "", color: "blue", face: 5 }
      )
    ).toBe(true);
  });
  it("Should return true if the card is a wildcard and the previous card is a wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "none", face: "none" },
        { id: "", color: "none", face: "+4" }
      )
    ).toBe(true);
  });
  it("Should return true if the card is a wildcard and the previous card is a wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "none", face: "none" },
        { id: "", color: "none", face: "+4" }
      )
    ).toBe(true);
  });
  it("Should return true if the card is a wildcard and the previous card is a wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "none", face: "none" },
        { id: "", color: "none", face: "+4" }
      )
    ).toBe(true);
  });
  it("Should return false if the card is not the same color, face, or wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "red", face: 5 },
        { id: "", color: "blue", face: 3 }
      )
    ).toBe(false);
  });
  it("Should return false if the card is not the same color, face, or wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "red", face: 5 },
        { id: "", color: "blue", face: 3 }
      )
    ).toBe(false);
  });
  it("Should return false if the card is not the same color, face, or wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "red", face: 5 },
        { id: "", color: "blue", face: 3 }
      )
    ).toBe(false);
  });
  it("Should return false if the card is not the same color, face, or wildcard", () => {
    expect(
      checklegalMove(
        { id: "", color: "red", face: 5 },
        { id: "", color: "blue", face: 3 }
      )
    ).toBe(false);
  });
});
