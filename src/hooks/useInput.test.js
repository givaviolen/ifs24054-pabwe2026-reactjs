import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useInput from "./useInput";

describe("useInput hook", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useInput("initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should handle value change", () => {
    const { result } = renderHook(() => useInput(""));
    act(() => {
      result.current[1]({ target: { value: "new value" } });
    });
    expect(result.current[0]).toBe("new value");
  });

  it("should manually set value", () => {
    const { result } = renderHook(() => useInput(""));
    act(() => {
      result.current[2]("manual value");
    });
    expect(result.current[0]).toBe("manual value");
  });
});
