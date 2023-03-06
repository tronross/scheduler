/////////////////////
// Selectors
/////////////////////


/**
 * Returns an array of appointment objects for the selected day.
 *
 * @param {object} state  All current appointments data.
 * @param {string} day Selected day.
 * @returns {array} Selected day's appointment objects.
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
 * @param {object} state All current appointments data.
 * @param {string} day Selected day.
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

/**
 * Returns an interview object for the selected appointment slot.
 *
 * @param {object} state All current appointments data.
 * @param {object} interview Interviewer id and student name for appointment.
 */

export function getInterview(state, interview) {
  const interviewers = state.interviewers;
  let interviewerKey;

  console.log(interview)

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
