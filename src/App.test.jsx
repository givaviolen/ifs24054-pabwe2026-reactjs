import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("menampilkan teks Lost & Founds", () => {
    render(<App />);

    expect(screen.getByText(/Lost & Founds/i)).toBeInTheDocument();
  });
});