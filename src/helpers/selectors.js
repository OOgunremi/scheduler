export const getAppointmentsForDay = (state, day) => {
  //console.log('state = ', state, "day = ", day)
  const appointmentByDay = [];
  const filterDays = state.days.filter((weekDay) =>
    weekDay.name === day) 
    if(!filterDays[0]) {return []};
  filterDays[0].appointments.forEach((id) => {
    appointmentByDay.push(state.appointments[id])
  });
  console.log(appointmentByDay)
    return appointmentByDay;
  }
//export default getAppointmentsForDay;


export const getInterview = (state, interview) => {
  if (!interview) return null;
  console.log('state = ', state, "day = ", interview)
  const interviewObj= {  
    "student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]
  }

    return interviewObj;
  }
