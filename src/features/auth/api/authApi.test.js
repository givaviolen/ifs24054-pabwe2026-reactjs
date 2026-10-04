import { describe, it, expect, vi } from "vitest";
import { loginUser, registerUser } from "./authApi";
import { fetchWithToken } from "../../../helpers/apiHelper";

vi.mock("../../../helpers/apiHelper", () => ({
  fetchWithToken: vi.fn(),
}));

describe("authApi", () => {
  it("should login user", async () => {
    vi.mocked(fetchWithToken).mockResolvedValue({ token: "abc" });
    const res = await loginUser({ email: "a@b.com", password: "123" });
    expect(fetchWithToken).toHaveBeenCalledWith("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "a@b.com", password: "123" }),
    });
    expect(res).toEqual({ token: "abc" });
  });

  it("should register user", async () => {
    vi.mocked(fetchWithToken).mockResolvedValue({ message: "ok" });
    const res = await registerUser({ name: "A", email: "a@b.com", password: "123" });
    expect(fetchWithToken).toHaveBeenCalledWith("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name: "A", email: "a@b.com", password: "123" }),
    });
    expect(res).toEqual({ message: "ok" });
  });
});
