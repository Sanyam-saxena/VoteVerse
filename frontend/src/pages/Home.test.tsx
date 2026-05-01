import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/VoteVerse/i)).toBeInTheDocument();
  });

  it("has a call to action button", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const button = screen.getByRole("link", { name: /Start simulator/i });
    expect(button).toBeInTheDocument();
  });
});

