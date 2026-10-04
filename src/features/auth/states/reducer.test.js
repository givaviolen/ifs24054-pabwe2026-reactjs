import { describe, it, expect } from "vitest";
import authReducer, { logout } from "./reducer";
import { asyncLoginUser, asyncRegisterUser } from "./action";

describe("authReducer", () => {
  const initialState = { isAuthLogin: false, isAuthRegister: false };

  it("should return initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle logout", () => {
    const state = authReducer({ isAuthLogin: true, isAuthRegister: false }, logout());
    expect(state.isAuthLogin).toBe(false);
  });

  it("should handle asyncLoginUser.pending", () => {
    const state = authReducer(initialState, asyncLoginUser.pending());
    expect(state.isAuthLogin).toBe(true);
  });
  it("should handle asyncLoginUser.fulfilled", () => {
    const state = authReducer({ isAuthLogin: true }, asyncLoginUser.fulfilled());
    expect(state.isAuthLogin).toBe(false);
  });
  it("should handle asyncLoginUser.rejected", () => {
    const state = authReducer({ isAuthLogin: true }, asyncLoginUser.rejected());
    expect(state.isAuthLogin).toBe(false);
  });

  it("should handle asyncRegisterUser.pending", () => {
    const state = authReducer(initialState, asyncRegisterUser.pending());
    expect(state.isAuthRegister).toBe(true);
  });
  it("should handle asyncRegisterUser.fulfilled", () => {
    const state = authReducer({ isAuthRegister: true }, asyncRegisterUser.fulfilled());
    expect(state.isAuthRegister).toBe(false);
  });
  it("should handle asyncRegisterUser.rejected", () => {
    const state = authReducer({ isAuthRegister: true }, asyncRegisterUser.rejected());
    expect(state.isAuthRegister).toBe(false);
  });
});
