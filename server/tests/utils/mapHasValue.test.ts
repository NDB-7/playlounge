import mapHasValue from "../../src/utils/mapHasValue";
import { describe, it, expect } from "vitest";

describe("Testing mapHasValue function", () => {
  it("Should return true if the map has the value", () => {
    const map = new Map<string, string>();
    map.set("key", "value");
    expect(mapHasValue(map, "value")).toBe(true);
  });
  it("Should return false if the map does not have the value", () => {
    const map = new Map<string, string>();
    map.set("key", "value");
    expect(mapHasValue(map, "not value")).toBe(false);
  });
  it("Should return true if the map has an object value", () => {
    const map = new Map<string, object>();
    map.set("key", { key: "value" });
    expect(mapHasValue(map, { key: "value" })).toBe(true);
  });
  it("Should return false if the map does not have an object value", () => {
    const map = new Map<string, object>();
    map.set("key", { key: "value" });
    expect(mapHasValue(map, { key: "not value" })).toBe(false);
  });
});
