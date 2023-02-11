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

  function updateSpots(id, days, appointmentsToFilter) {
    const aTF = appointmentsToFilter;
    
    function spotCounter() {
      let spotCount = 0;
      let dayIndex = 0;

      for (const appDay of days) {
      const daySlots = appDay.appointments;

      if (daySlots.includes(id)) {
        dayIndex = (appDay.id) - 1;
        console.log (dayIndex)
        for (const slot of daySlots) {
          if (!aTF[slot].interview) {
            spotCount++;
          }
        }
      }
    }
    return spotCount;
  }
  

  const spots = spotCounter();
  console.log(`Spots ${spots}`)
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
    .then(() => { 
        setState({
          ...state,
          appointments
        })
      });
  };
  
  // Delete interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments ={
      ...state.appointments,
      [id]:appointment
    };
    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
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
