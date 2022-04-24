import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors.js";

export default function Application(props) {
  const [dailyAppointments, setDailyAppointments] = useState([])
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = (day) => setState({ ...state, day});
  useEffect(() => {
    Promise.all([axios("/api/days"), axios("/api/appointments"), axios("/api/interviewers")])
    .then((all) => {
      console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
      //dailyAppointments = getAppointmentsForDay(state, state.day)
    })
  }, []);

  useEffect(() => {
    setDailyAppointments(getAppointmentsForDay(state, state.day));
  }, [state])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"/>
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu"><DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
        /></nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
      {dailyAppointments.map((appointment) => {  return (
      <Appointment
        key={appointment.id}
        {...appointment} 
      />)})}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
