
// For getting  appointments for day
export const getAppointmentsForDay = (state, day) => {
  const appointmentByDay = [];
  const filterDays = state.days.filter((weekDay) => weekDay.name === day);

  if (!filterDays[0]) {
    return [];
  }
  filterDays[0].appointments.forEach((id) => {
    appointmentByDay.push(state.appointments[id]);
  })

  return appointmentByDay;
};

// Returns interviews object corresponding to a interview id
export const getInterview = (state, interview) => {
  if (!interview) return null;

  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return interviewObj;
};

// Used for getting interviewer object for a day of the week
export const getInterviewersForDay = (state, name) => {
  const interviewersByDay = [];
  const filterDays = state.days.filter((weekDay) => weekDay.name === name);

  if (!filterDays[0] || state.days.length === 0) {
    return [];
  }
  filterDays[0].interviewers.forEach((id) => {
    interviewersByDay.push(state.interviewers[id]);
  });

  return interviewersByDay;
};
