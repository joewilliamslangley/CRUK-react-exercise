import { waitFor, render, screen } from "@testing-library/react";
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
  })

  it("returns results when no minimum year is included", async () => {
    const {keywords, mediaType, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'mars')
    await userEvent.selectOptions(mediaType, 'audio')
    await userEvent.click(submit)

    const results = await screen.findByText("Results");
    expect(results).toBeInTheDocument();
  })

  it("doesn't return results when keyword is too short", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'a')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1950')
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("doesn't return results when keyword is too long", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1950')
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("doesn't return results when no media type is selected", async () => {
    const {keywords, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.type(minYear, '1950')
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("doesn't return results when minimum year is below 1900", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1899')
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("doesn't return results when minimum year is above current year", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, `${new Date().getFullYear() + 1}`)
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("doesn't return results when minimum year has decimal place", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1950.1')
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("doesn't return results when minimum year has text", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1950a')
    await userEvent.click(submit)

    await waitFor(() => {
      const results =  screen.queryByText("Results");
      expect(results).toBeNull()
    })
  })

  it("disables submit button and changes text to 'submitting' on successful submission", async () => {
    const {keywords, mediaType, minYear, submit} = renderPageAndGetForm()
    await userEvent.type(keywords, 'space')
    await userEvent.selectOptions(mediaType, 'image')
    await userEvent.type(minYear, '1950')
    await userEvent.click(submit)

    const button = await screen.findByRole("button", {name: /Submitting.../i});
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  })
});
