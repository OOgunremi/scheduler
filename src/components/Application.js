import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";

// Renders the main App
const Application = (props) => {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Loops through appointments to return each */}
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersForDay(state, state.day);

          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          );
        })}

        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
export default Application;
