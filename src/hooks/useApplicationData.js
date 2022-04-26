import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const updateSpots = (state, appointments) => {
    //find the day
    const dayObj = state.days.find(obj => obj.name === state.day);
    let spots = 0;
    //loop through the appointment id array of the day
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if(!appointment.interview) {
        spots++;
      }
    }
    const day = {...dayObj, spots};
    const days = state.days.map(obj => obj.name === state.day ? day : obj);
    //return an updated days array
    return days
  };
  
  const bookInterview = (id, interview) => {
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
      const days = updateSpots(state, appointments);
      setState({...state, appointments, days});
    })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(state, appointments);
      setState({...state, appointments, days});
    });
  };

  const setDay = (day) => setState({ ...state, day});
  useEffect(() => {
    Promise.all([axios("/api/days"), axios("/api/appointments"), axios("/api/interviewers")])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  return {state, setDay, bookInterview, cancelInterview}
}
 
