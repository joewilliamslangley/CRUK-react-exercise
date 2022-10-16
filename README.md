# CRUK React Technical Exercise Solution 

## Description

This repository contains my solution to the CRUK React Technical Exercise (the original repository can be found here: https://github.com/CRUKorg/react-exercise). 

The project consists of a form that allows the user to fetch assets from the NASA Images and Video Library API. The form and results are made out of components from the CRUK React Component Library Package (https://www.npmjs.com/package/@cruk/cruk-react-components). It includes validation for the form using Yup, and test coverage across the components using Jest and React Test Library.

## Installation

After cloning this repository run the following commands:

```bash
npm install
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

## Further changes

These are some of the features to be added and changes to be made in the future:

- Pagination that allows the user to see more than 10 results.
- Collapsible cards in the results that allow the user to expand and hide descriptions that are particularly long.
- Cards that display the media on the page without the user having to click on the link.
- Refactoring code within the test files to improve clarity/efficiency.
- Fix warning message that appears in console when user enters a minimum year ("Warning: A component is changing an uncontrolled input to be controlled.").
- Fix console error that occurs when testing ("ReferenceError: fetch is not defined")
