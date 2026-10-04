import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import LoginPage from "./LoginPage";
import * as authApi from "../api/authApi";
import { putAccessToken } from "../../../helpers/apiHelper";

vi.mock("../api/authApi", () => ({
  loginUser: vi.fn(),
}));
vi.mock("../../../helpers/apiHelper", () => ({
  putAccessToken: vi.fn(),
  getAccessToken: vi.fn(),
}));
vi.mock("../../../helpers/toolsHelper", () => ({
  showSuccessDialog: vi.fn(),
  showErrorDialog: vi.fn(),
}));

describe("LoginPage", () => {
  it("renders form and handles submit success", async () => {
    vi.mocked(authApi.loginUser).mockResolvedValue({ data: { token: "abc" } });
    renderWithProviders(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/admin@delcom/i), { target: { value: "t@t.com" } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    
    await waitFor(() => {
      expect(authApi.loginUser).toHaveBeenCalled();
    });
  });

  it("renders form and handles submit reject", async () => {
    vi.mocked(authApi.loginUser).mockRejectedValue(new Error("fail"));
    renderWithProviders(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/admin@delcom/i), { target: { value: "t@t.com" } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));
    
    await waitFor(() => {
      expect(authApi.loginUser).toHaveBeenCalled();
    });
  });

  it("renders processing state when isAuthLogin is true", () => {
    renderWithProviders(<LoginPage />, {
      preloadedState: { auth: { isAuthLogin: true } }
    });
    expect(screen.getByRole("button", { name: /Memproses/i })).toBeDisabled();
  });
});
