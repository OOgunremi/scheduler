# Interview Scheduler

Interview Scheduler is a single page application (SPA) called Interview Scheduler, built using React. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Best practices such as Test Driven Development and End-to-End testing procedures were used all through the development of this App.

## Project Features

- Students can book interviews between Monday and Friday.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The number of spots available is updated when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.

## Project Stack Used

- Front-End: React, Axios, JSX, HTML, SASS, JavaScript
- Back-End: Express, Node.js, PostgreSQL
- Testing: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Product Snapshots

!["Screenshot of Booked Interviews"](https://github.com/OOgunremi/scheduler/blob/master/docs/Booked%20Interviews%20Snapshot.png)

### Screenshot of Booked Interviews

!["Screenshot of Booking Interview Page"](https://github.com/OOgunremi/scheduler/blob/master/docs/Booking%20Interview%20Snapshot.png)

### Screenshot of Booking Interview Page

!["Screenshot of Confirmation Page"](https://github.com/OOgunremi/scheduler/blob/master/docs/Confirmation%20Messages%20Snapshot.png)

### Screenshot of Confirmation Page

!["Screenshot of Error Message"](https://github.com/OOgunremi/scheduler/blob/master/docs/Error%20Message%20Snapshot%20Interviewer.png)

### Screenshot of Error Message
