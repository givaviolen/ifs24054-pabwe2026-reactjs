import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import App from "./App";

describe("App", () => {
  it("menampilkan teks Lost & Founds", () => {
    renderWithProviders(<App />);

    expect(screen.getByText(/Lost & Founds/i)).toBeInTheDocument();
  });
});