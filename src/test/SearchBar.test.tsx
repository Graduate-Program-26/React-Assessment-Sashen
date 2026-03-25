import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "@/components/SearchBar";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SearchBar", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the input and search button", () => {
    render(<MemoryRouter><SearchBar /></MemoryRouter>);
    expect(screen.getByPlaceholderText("Enter a GitHub username...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("navigates to /user/:username on valid input", async () => {
    render(<MemoryRouter><SearchBar /></MemoryRouter>);
    await userEvent.type(screen.getByPlaceholderText("Enter a GitHub username..."), "sashen");
    await userEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/user/sashen");
  });

  it("does not navigate when input is empty", async () => {
    render(<MemoryRouter><SearchBar /></MemoryRouter>);
    await userEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("navigates on Enter key press", async () => {
    render(<MemoryRouter><SearchBar /></MemoryRouter>);
    await userEvent.type(screen.getByPlaceholderText("Enter a GitHub username..."), "sashen{Enter}");
    expect(mockNavigate).toHaveBeenCalledWith("/user/sashen");
  });
});
