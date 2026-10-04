import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import RegisterPage from "./RegisterPage";
import * as authApi from "../api/authApi";

vi.mock("../api/authApi", () => ({
  registerUser: vi.fn(),
}));
vi.mock("../../../helpers/toolsHelper", () => ({
  showSuccessDialog: vi.fn(),
  showErrorDialog: vi.fn(),
}));

describe("RegisterPage", () => {
  it("renders form and handles submit success", async () => {
    vi.mocked(authApi.registerUser).mockResolvedValue({ data: { message: "ok" } });
    renderWithProviders(<RegisterPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText(/john@example/i), { target: { value: "t@t.com" } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Daftar/i }));
    
    await waitFor(() => {
      expect(authApi.registerUser).toHaveBeenCalled();
    });
  });

  it("renders form and handles submit reject", async () => {
    vi.mocked(authApi.registerUser).mockRejectedValue(new Error("fail"));
    renderWithProviders(<RegisterPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText(/john@example/i), { target: { value: "t@t.com" } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Daftar/i }));
    
    await waitFor(() => {
      expect(authApi.registerUser).toHaveBeenCalled();
    });
  });

  it("renders processing state when isAuthRegister is true", () => {
    renderWithProviders(<RegisterPage />, {
      preloadedState: { auth: { isAuthRegister: true } }
    });
    expect(screen.getByRole("button", { name: /Memproses/i })).toBeDisabled();
  });
});
