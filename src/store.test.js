import { describe, it, expect } from "vitest";
import { store } from "./store";

describe("Redux Store", () => {
  it("should configure the store properly", () => {
    expect(store).toBeDefined();
    const state = store.getState();
    expect(state).toBeTypeOf("object");
  });
});
