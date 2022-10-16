import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Results from ".";

const testData = [
  {
    "title": "Arcuate Fractures",
    "description": "This region of arcuate or curved fractures is located north of Apollinaris Mons as seen by NASA 2001 Mars Odyssey spacecraft.",
    "nasaId": "PIA16593",
    "href": "http://images-assets.nasa.gov/image/PIA16593/PIA16593~orig.jpg"
  },
  {
    "title": "Daedalia Planum",
    "description": "Layer upon layer of volcanic flows make up Daedalia Planum as shown in this image from NASA 2001 Mars Odyssey spacecraft.",
    "nasaId": "PIA16597",
    "href": "http://images-assets.nasa.gov/image/PIA16597/PIA16597~orig.jpg"
  },
  {
    "title": "South Polar Surface",
    "description": "One type of surface seen on the south pole is this wiss-cheese terrain of circular depressions as seen in this image from NASA 2001 Mars Odyssey spacecraft.",
    "nasaId": "PIA16644",
    "href": "http://images-assets.nasa.gov/image/PIA16644/PIA16644~orig.jpg"
  },
  {
    "title": "Polar Layers",
    "description": "The south polar cap is comprised of many layers of ice, as seen in this image from NASA 2001 Mars Odyssey spacecraft.",
    "nasaId": "PIA16646",
    "href": "http://images-assets.nasa.gov/image/PIA16646/PIA16646~orig.jpg"
  },
  {
    "title": "Dunes",
    "description": "This image from NASA 2001 Mars Odyssey spacecraft shows sand dunes on the floor of an unnamed crater near Meridiani Planum.",
    "nasaId": "PIA16649",
    "href": "http://images-assets.nasa.gov/image/PIA16649/PIA16649~orig.jpg"
  }
]

describe("Results", () => {
  it("renders results when valid nasa data is returned", () => {
    render(<Results apiResultData={testData} contentLoading={false} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toEqual(5)
  })

  it("renders a loader without results when contentLoading is true", () => {
    render(<Results apiResultData={undefined} contentLoading />)
    const loaderCircles = screen.getByText('Loading')
    const links = screen.queryByRole('link')
    expect(loaderCircles).toBeInTheDocument();
    expect(links).toBeNull()
  })

  it("displays a 'no results' when apiResultData is undefined", () => {
    render(<Results apiResultData={undefined} contentLoading={false} />)
    const message = screen.getByText('Sorry, your search did not return any results')
    const links = screen.queryByRole('link')
    expect(message).toBeInTheDocument();
    expect(links).toBeNull()
  })

  it("displays a 'no results' when apiResultData is empty", () => {
    render(<Results apiResultData={[]} contentLoading={false} />)
    const message = screen.getByText('Sorry, your search did not return any results')
    const links = screen.queryByRole('link')
    expect(message).toBeInTheDocument();
    expect(links).toBeNull()
  })
})
