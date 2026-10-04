import { describe, it, expect, vi, beforeEach } from "vitest";
import { asyncLoginUser, asyncRegisterUser } from "./action";
import { loginUser, registerUser } from "../api/authApi";
import { putAccessToken } from "../../../helpers/apiHelper";
import { showSuccessDialog, showErrorDialog } from "../../../helpers/toolsHelper";

vi.mock("../api/authApi", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));
vi.mock("../../../helpers/apiHelper", () => ({
  putAccessToken: vi.fn(),
}));
vi.mock("../../../helpers/toolsHelper", () => ({
  showSuccessDialog: vi.fn(),
  showErrorDialog: vi.fn(),
}));

describe("auth actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should dispatch login success", async () => {
    vi.mocked(loginUser).mockResolvedValue({ data: { token: "abc" } });
    const dispatch = vi.fn();
    const result = await asyncLoginUser({ email: "a", password: "b" })(dispatch, () => {}, {});
    expect(putAccessToken).toHaveBeenCalledWith("abc");
    expect(showSuccessDialog).toHaveBeenCalled();
    expect(result.payload).toEqual({ token: "abc" });
  });

  it("should dispatch login error", async () => {
    vi.mocked(loginUser).mockRejectedValue(new Error("err"));
    const dispatch = vi.fn();
    const result = await asyncLoginUser({ email: "a", password: "b" })(dispatch, () => {}, {});
    expect(showErrorDialog).toHaveBeenCalledWith("Gagal", "err");
    expect(result.payload).toBe("err");
  });

  it("should dispatch register success", async () => {
    vi.mocked(registerUser).mockResolvedValue({ data: { msg: "ok" } });
    const dispatch = vi.fn();
    const result = await asyncRegisterUser({ name: "a", email: "b", password: "c" })(dispatch, () => {}, {});
    expect(showSuccessDialog).toHaveBeenCalled();
    expect(result.payload).toEqual({ msg: "ok" });
  });

  it("should dispatch register error", async () => {
    vi.mocked(registerUser).mockRejectedValue(new Error("err"));
    const dispatch = vi.fn();
    const result = await asyncRegisterUser({ name: "a", email: "b", password: "c" })(dispatch, () => {}, {});
    expect(showErrorDialog).toHaveBeenCalledWith("Gagal", "err");
    expect(result.payload).toBe("err");
  });
});
