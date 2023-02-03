/////////////////////
// Selectors
/////////////////////

// getAppointmentsForDay
export function getAppointmentsForDay(state, day) {
  const rightDay = state.days.filter(dayObj => 
    dayObj.name === day
  );
  
  // edge case error handling
  const rightDayObj = rightDay[0];
  if (!rightDayObj) {
    return [];
  }
  
  const appointmentsIds = rightDayObj.appointments;

  const appointmentsForDay = appointmentsIds.map((appId) => {
    return state.appointments[appId]
  })

  return appointmentsForDay
};
