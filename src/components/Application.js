import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors.js";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const bookInterview = (id, interview) => {
    console.log('id = ', id, 'interview = ', interview);
    debugger
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      debugger 
      setState({...state, appointments});
      
    })


  };

  const setDay = (day) => setState({ ...state, day});
  useEffect(() => {
    Promise.all([axios("/api/days"), axios("/api/appointments"), axios("/api/interviewers")])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
   
    })
  }, []);
  const dailyAppointments = getAppointmentsForDay(state, state.day);


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
      />)})}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
