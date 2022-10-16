import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HomePage from ".";

const queryClient = new QueryClient();


describe("Home", () => {
  const renderPageAndGetForm = () => {
    render(
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
    );
    return {
      keywords: screen.getByLabelText("Keywords (required)"),
      mediaType: screen.getByLabelText("Media Type (required)"),
      minYear: screen.getByLabelText("Minimum Year"),
      submit: screen.getByText("Submit")
    }
  }

  it("renders a form", () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    expect(keywords).toBeInTheDocument()
    expect(mediaType).toBeInTheDocument()
    expect(minYear).toBeInTheDocument()
    expect(submit).toBeInTheDocument()
  })

  it("returns results with three search parameters", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1950')
    await userEvent.click(submit)

    const results = await screen.findByText("Results");
    expect(results).toBeInTheDocument();
    expect(results).toHaveTextContent("Results");
  })

  // it("returns results when no minimum year is included", () => {})

  // it("doesn't return results when invalid parameters are given", () => {})
});
