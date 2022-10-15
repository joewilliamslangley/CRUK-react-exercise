import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HomePage from ".";

describe("Home", () => {
  it("renders a heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("React Exercise");
  });

  it("renders a form", () => {
    render(<HomePage />);
    const keywords = screen.getByLabelText("Keywords (required)")
    const mediaType = screen.getByLabelText("Media Type (required)")
    const minYear = screen.getByLabelText("Minimum Year")
    const submit = screen.getByText("Submit")
    expect(keywords).toBeInTheDocument()
    expect(mediaType).toBeInTheDocument()
    expect(minYear).toBeInTheDocument()
    expect(submit).toBeInTheDocument()
  })

  // it("returns results with three search parameters", () => {})

  // it("returns results when no minimum year is included", () => {})

  // it("doesn't return results when invalid parameters are given", () => {})
});
