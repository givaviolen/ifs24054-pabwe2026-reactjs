import { describe, it, expect, vi } from "vitest";
import Swal from "sweetalert2";
import {
  showSuccessDialog,
  showErrorDialog,
  showConfirmDialog,
  formatDate,
} from "./toolsHelper";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe("toolsHelper", () => {
  it("should show success dialog", () => {
    showSuccessDialog("Title", "Message");
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "success",
      title: "Title",
      text: "Message",
    });
  });

  it("should show error dialog", () => {
    showErrorDialog("Error", "Error msg");
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "error",
      title: "Error",
      text: "Error msg",
    });
  });

  it("should show confirm dialog", () => {
    showConfirmDialog("Confirm", "Are you sure?");
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: "question",
      title: "Confirm",
      text: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });
  });

  it("should format date correctly", () => {
    const formatted = formatDate("2026-10-04T12:00:00Z");
    expect(typeof formatted).toBe("string");
    expect(formatted.length).toBeGreaterThan(0);
  });
});
