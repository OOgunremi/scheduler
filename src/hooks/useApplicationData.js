import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
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
      setState({...state, appointments});
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
      setState({...state, appointments});
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
 