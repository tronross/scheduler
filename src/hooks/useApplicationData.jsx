////////////////////////////
// useAppicationData Hook
////////////////////////////

import { useState, useEffect } from 'react';
import axios from 'axios';

// Hook
export default function useAppicationData() {
  // Define state
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  // GET Routes (set/update state)
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((responses) => {
        setState(prev => ({...prev, days: responses[0].data,
                                    appointments: responses[1].data, 
                                    interviewers: responses[2].data}));
      });
  }, [])

  // Manage state when changing day in the DayList
  const setDay = day => setState({ ...state, day });

  
  // Calculate number of spots remaining in day when saving or deleting an appointment
  
  function updateSpots(id, days, appointments) {
    const newDays = [...days];
    let spotCount = 0;

    for (const appDay of days) {
      const daySlots = [...appDay.appointments];

      // Find day containing appointment id
      if (daySlots.includes(id)) {
        // Count spots
        for (const slot of daySlots) {
          if (!appointments[slot].interview) {
            spotCount++;
          }
        }
        // Update spots
        appDay.spots = spotCount;
      }
    };
  
  return newDays; 
}

  // Manage Individual Interviews
  // New interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => updateSpots(id, [...state.days], {...appointments}))  
      .then((days) => { 
          setState({
            ...state,
            appointments,
            days
          })
        });
    };
  
  // Delete interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]:appointment
    };
    
    return axios.delete(`/api/appointments/${id}`) 
      .then(() => updateSpots(id, [...state.days], {...appointments}))
      .then((days) => {
          setState({
            ...state,
            appointments,
            days
          })
        });
    };
     
  return {
           state,
           setDay,
           bookInterview,
           cancelInterview
         };
}
