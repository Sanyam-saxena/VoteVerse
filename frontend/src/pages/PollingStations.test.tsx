import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PollingStations from "../pages/PollingStations";

describe("PollingStations Page", () => {
  it("renders the Google Maps integration header", () => {
    render(<PollingStations />);
    expect(screen.getByText(/Google Maps Integration/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Your Polling Station/i)).toBeInTheDocument();
  });

  it("contains search functionality", () => {
    render(<PollingStations />);
    expect(screen.getByPlaceholderText(/Enter your area or pincode/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });
});
