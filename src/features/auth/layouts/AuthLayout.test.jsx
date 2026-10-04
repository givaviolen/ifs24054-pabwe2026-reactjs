import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../test-utils";
import AuthLayout from "./AuthLayout";
import { getAccessToken } from "../../../helpers/apiHelper";

vi.mock("../../../helpers/apiHelper", () => ({
  getAccessToken: vi.fn(),
}));

describe("AuthLayout", () => {
  it("renders layout when not logged in", () => {
    vi.mocked(getAccessToken).mockReturnValue(null);
    renderWithProviders(<AuthLayout />);
    expect(screen.getByText(/Platform pelaporan/i)).toBeInTheDocument();
  });

  it("redirects to home when logged in", () => {
    vi.mocked(getAccessToken).mockReturnValue("dummy-token");
    renderWithProviders(<AuthLayout />);
  });
});
