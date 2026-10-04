import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getAccessToken, putAccessToken, fetchWithToken } from "./apiHelper";

describe("apiHelper", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get access token from localStorage", () => {
    vi.mocked(localStorage.getItem).mockReturnValue("fake-token");
    const token = getAccessToken();
    expect(localStorage.getItem).toHaveBeenCalledWith("accessToken");
    expect(token).toBe("fake-token");
  });

  it("should put access token to localStorage", () => {
    putAccessToken("new-token");
    expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", "new-token");
  });

  describe("fetchWithToken", () => {
    it("should include Authorization header if token exists", async () => {
      vi.mocked(localStorage.getItem).mockReturnValue("fake-token");
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      await fetchWithToken("/test-endpoint");

      expect(fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/test-endpoint",
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          },
        })
      );
    });

    it("should omit Content-Type if body is FormData", async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      const formData = new FormData();
      formData.append("file", "test");

      await fetchWithToken("/upload", { body: formData });

      expect(fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/upload",
        expect.objectContaining({
          headers: {},
        })
      );
    });

    it("should handle query params correctly", async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      await fetchWithToken("/data", { params: { status: "lost", is_me: 1 } });

      expect(fetch).toHaveBeenCalledWith(
        "https://open-api.delcom.org/api/v1/data?status=lost&is_me=1",
        expect.objectContaining({
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    it("should throw error if response is not ok", async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Not Found" }),
      });

      await expect(fetchWithToken("/error")).rejects.toThrow("Not Found");
    });
    
    it("should throw default error if message is not provided", async () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({}),
      });

      await expect(fetchWithToken("/error")).rejects.toThrow("Something went wrong");
    });
  });
});
