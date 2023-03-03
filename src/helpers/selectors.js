/////////////////////
// Selectors
/////////////////////


/**
 * Returns an array of appointment objects for the selected day.
 *
 * @param {object} state State object comprising all appointment data.
 * @param {string} day Day to return appointments of.
 */

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
  });

  return appointmentsForDay
};

/**
 * Returns an array of interviewer objects for the selected day.
 *
 * @param {object} state State object comprising all appointment data.
 * @param {string} day Day to return appointments of.
 */

export function getInterviewersForDay(state, day) {
  const rightDay = state.days.filter(dayObj => 
    dayObj.name === day
  );
  
  // edge case error handling
  const rightDayObj = rightDay[0];
  if (!rightDayObj) {
    return [];
  }
  
  const interviewersIds = rightDayObj.interviewers;

  const interviewersForDay = interviewersIds.map((intId) => {
    return state.interviewers[intId];
  });

  return interviewersForDay;
};

// getInterview
export function getInterview(state, interview) {
  const interviewers = state.interviewers;
  let interviewerKey;

  // edge case error handling
  if (!interview) {
    return null;
  }
  
  for (const intKey in interviewers) {
    if (Number(intKey) === interview.interviewer) {
      interviewerKey = intKey;
    }
  }
  
  const interviewer = interviewers[interviewerKey];
  
  const interviewObj = {
    student:      interview.student,
    interviewer: {
                  id: interviewer.id,
                  name: interviewer.name,
                  avatar: interviewer.avatar
                 }
  };

  return interviewObj;
};
