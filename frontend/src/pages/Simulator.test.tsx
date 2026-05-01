import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Simulator from "../pages/Simulator";

// Mock the API service
vi.mock("../services/api", () => ({
  fetchElectionData: vi.fn().mockResolvedValue({
    steps: [
      {
        id: "step-1",
        title: "Mock Step 1",
        description: "Description 1",
        points: ["Point A", "Point B"]
      }
    ]
  }),
  trackEvent: vi.fn()
}));

describe("Simulator Component", () => {
  it("renders the first step after loading", async () => {
    render(<Simulator />);
    
    // Wait for the data to load and render
    await waitFor(() => {
      expect(screen.getByText(/Mock Step 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Point A/i)).toBeInTheDocument();
  });

  it("shows progress indicator", async () => {
    render(<Simulator />);
    
    await waitFor(() => {
      const progress = screen.getByRole("progressbar");
      expect(progress).toBeInTheDocument();
    });
  });
});
