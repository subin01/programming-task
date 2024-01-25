This Project is initialize with a Vite template, which takes care of Typescript to JS compilation, asset loading, Dev server etc.
Task related files are under `/src/`

`main.ts` handles loading the Log, running transform functions, and displaying the Report.

`utils.ts` handles all the extracting/formatting/sorting logic

`utils.test.ts` handles testing

## Note

Criteria for **"Most active"** in the Task: _"The top 3 most active IP addresses"_ -- is assumed to be the IP that made requests spanning the longest period of time in between.

# Instructions

## Prerequisite

Node.js (developed in v20.10.0)

## Setup Project

`npm i`

## Run Development server

`npm run dev`

Open `http://localhost:5174/` with a browser, and the report should be on the screen.
Same report and some additional info available on Browser console.

## Run Tests

`npm run test`
