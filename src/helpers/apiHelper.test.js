import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getAccessToken,
  putAccessToken,
  fetchWithToken,
} from "./apiHelper";

const mockResponse = (body, ok = true) => ({
  ok,
  json: () => Promise.resolve(body),
});

describe("apiHelper", () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("token storage", () => {
    it("menyimpan dan mengambil token dari localStorage", () => {
      putAccessToken("abc123");
      expect(getAccessToken()).toBe("abc123");
    });

    it("mengembalikan null jika token belum ada", () => {
      expect(getAccessToken()).toBeNull();
    });
  });

  describe("fetchWithToken", () => {
    it("memanggil URL dasar + endpoint tanpa Authorization jika tidak ada token", async () => {
      fetch.mockResolvedValue(mockResponse({ status: "success" }));

      const result = await fetchWithToken("/lost-founds");

      expect(result).toEqual({ status: "success" });
      const [url, init] = fetch.mock.calls[0];
      expect(url).toBe(`${DELCOM_BASEURL}/lost-founds`);
      expect(init.headers["Content-Type"]).toBe("application/json");
      expect(init.headers.Authorization).toBeUndefined();
    });

    it("menambahkan header Authorization Bearer jika token tersedia", async () => {
      putAccessToken("token-xyz");
      fetch.mockResolvedValue(mockResponse({ status: "success" }));

      await fetchWithToken("/users/me");

      expect(fetch.mock.calls[0][1].headers.Authorization).toBe(
        "Bearer token-xyz"
      );
    });

    it("menyusun query params dan mengabaikan nilai kosong", async () => {
      fetch.mockResolvedValue(mockResponse({ status: "success" }));

      await fetchWithToken("/lost-founds", {
        params: {
          status: "lost",
          is_completed: 0,
          is_me: "",
          keyword: undefined,
          other: null,
        },
      });

      expect(fetch.mock.calls[0][0]).toBe(
        `${DELCOM_BASEURL}/lost-founds?status=lost&is_completed=0`
      );
    });

    it("tidak menambahkan tanda tanya jika semua params kosong", async () => {
      fetch.mockResolvedValue(mockResponse({ status: "success" }));

      await fetchWithToken("/lost-founds", { params: { is_me: "" } });

      expect(fetch.mock.calls[0][0]).toBe(`${DELCOM_BASEURL}/lost-founds`);
    });

    it("mengirim method dan body JSON serta menggabungkan header kustom", async () => {
      fetch.mockResolvedValue(mockResponse({ status: "success" }));

      await fetchWithToken("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: "a@b.c" }),
        headers: { "X-Custom": "1" },
      });

      const init = fetch.mock.calls[0][1];
      expect(init.method).toBe("POST");
      expect(init.body).toBe(JSON.stringify({ email: "a@b.c" }));
      expect(init.headers["X-Custom"]).toBe("1");
      expect(init.headers["Content-Type"]).toBe("application/json");
    });

    it("tidak memaksa Content-Type saat body adalah FormData", async () => {
      fetch.mockResolvedValue(mockResponse({ status: "success" }));
      const formData = new FormData();
      formData.append("cover", new Blob(["x"]), "cover.png");

      await fetchWithToken("/lost-founds/1/cover", {
        method: "POST",
        body: formData,
      });

      const init = fetch.mock.calls[0][1];
      expect(init.body).toBe(formData);
      expect(init.headers["Content-Type"]).toBeUndefined();
    });

    it("melempar Error dengan pesan dari server saat respons gagal", async () => {
      fetch.mockResolvedValue(
        mockResponse({ status: "fail", message: "Data tidak valid" }, false)
      );

      await expect(fetchWithToken("/auth/login")).rejects.toThrow(
        "Data tidak valid"
      );
    });

    it("melempar Error pesan bawaan jika server tidak mengirim message", async () => {
      fetch.mockResolvedValue(mockResponse({}, false));

      await expect(fetchWithToken("/auth/login")).rejects.toThrow(
        "Something went wrong"
      );
    });
  });
});
