# Interview Scheduler

<img src ="public_png_gif\int-sched-1.gif" alt="Interview Scheduler screenshot gif">

## Project Summary

<b>Interview Scheduler</b> is a single-page application (SPA) that allows users to book interviews between students and interviewers, built in [React](https://reactjs.org/) as part of the [Lighthouse Labs Web Development Flex Program](https://www.lighthouselabs.ca/en/web-development-flex-program).

The App allows users to add, edit and delete appointments in real time, manipulating state using built-in (and custom) hooks, and reading and updating the database on the API server via [Axios](https://axios-http.com/docs/intro) calls. While building the App, with a goal of learning the frameworks and best practices of test-driven development, a plethora of tests were written utilizing [Jest](https://jestjs.io/), [Storybook](https://storybook.js.org/) and [Cypress](https://docs.cypress.io/guides/overview/why-cypress). 

## Setup
Assuming you have [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [git](https://git-scm.com/) installed on your computer, you can proceed by:

Clone the repository and enter its directory on your local machine.
```
git clone git@github.com:tronross/scheduler.git scheduler
cd scheduler
```
Install the dependencies
```
npm install
```
The dependencies for the project are 
```
axios: ^0.20.0,
    classnames: ^2.2.6,
    normalize.css: ^8.0.1,
    react: ^16.9.0,
    react-dom: ^16.9.0,
    react-scripts: 3.4.4
```
and the dev-dependencies are
```
@babel/core: ^7.4.3,
    @storybook/addon-actions: ^5.0.10,
    @storybook/addon-backgrounds: ^5.0.10,
    @storybook/addon-links: ^5.0.10,
    @storybook/addons: ^5.0.10,
    @storybook/react: ^5.0.10,
    @testing-library/jest-dom: ^4.0.0,
    @testing-library/react: ^8.0.7,
    @testing-library/react-hooks: ^8.0.1,
    babel-loader: 8.1.0,
    prop-types: ^15.8.1,
    react-test-renderer: ^16.9.0,
    sass: ^1.53.0
```

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) (provided by [Lighthouse Labs](https://www.lighthouselabs.ca/)) into a new directory, and follow the [`README.md`](https://github.com/lighthouse-labs/scheduler-api#readme) instructions as provided in `scheduler-api` to set it up.

<img src ="public_png_gif\int-sched-2.gif" alt="Interview Scheduler empty appointment gif">

## Running the Interview Scheduler
Both servers must run concurrently.

### Running the API Server
Enter the `scheduler-api` directory and launch the server
```
cd scheduler-api
npm start
```

### Running the Webpack Development Server
Enter the `scheduler` directory and launch the server
```
cd scheduler
npm start
```
Visit http://localhost:8000 in the browser
### Running Jest Test Framework

```
cd scheduler
npm test
```

### Running Storybook Visual Testbed

```
cd scheduler
npm run storybook
```
<img src ="public_png_gif\int-sched-3.png" alt="Interview Scheduler empty appointment form screenshot">

## Exploring the App
<b>Interview Scheduler</b> is intended to demonstrate a modern, intuitive web application that harnesses the elegance, speed and interactivity of the SPA as showcased by [React](https://reactjs.org/).

The user can view appointment availability by day at a glance by reviewing the column at the left of the screen, and select the day of their choice by clicking on it. This displays the appointment slots for the day, available and booked, and the user can create a new appointment by clicking on the plus/add button which displays a form where the user can enter their name and select an interviewer from avatars arrayed as round buttons.

Hovering over a booked appointment reveals edit and delete icons which provide their relevant functionality.

<img src ="public_png_gif\int-sched-4.png" alt="Interview Scheduler empty appointment screenshot">


## Stack
The front-end was built with [React](https://reactjs.org/), [JSX](https://reactjs.org/docs/introducing-jsx.html), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), and [SASS](https://sass-lang.com/documentation/syntax).

The back-end was built with [Express](https://expressjs.com/), [Node.js](https://nodejs.org/en/), and [Axios](https://axios-http.com/docs/intro).
