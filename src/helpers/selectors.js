const getAppointmentsForDay = (state, day) => {
  console.log('state = ', state, "day = ", day)
  const appointmentByDay = [];
  const filterDays = state.days.filter((weekDay) =>
    weekDay.name === day) 
    if(!filterDays[0]) {return []};
  filterDays[0].appointments.forEach((id) => {
    appointmentByDay.push(state.appointments[id])
  });
    return appointmentByDay;
  }
export default getAppointmentsForDay;
