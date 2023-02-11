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

  function updateSpots(id, days, appointments) {
    const apps = appointments;
    let newDays = [...days];
    
    // Declare variables to update day with
    let spotCount = 0;
    let dayIndex = 0;
    let dayId = 0;

    for (const appDay of days) {
      const daySlots = [...appDay.appointments];

      // Find day containing appointment id, and set update variables
      if (daySlots.includes(id)) {
        dayId = appDay.id;
        dayIndex = (appDay.id) - 1;
        console.log (`dayIndex: ${dayIndex}, dayId: ${dayId}, appointments: ${days[dayIndex].appointments}`)
        // Count spots
        for (const slot of daySlots) {
          if (!apps[slot].interview) {
            spotCount++;
          }
        }
      }
    };

    const updatedDay = {
      id: dayId,
      name: days[dayIndex].name,
      appointments: days[dayIndex].appointments,
      interviewers: days[dayIndex].interviewers,
      spots: spotCount 
    }

  newDays.splice(dayIndex, 1, updatedDay);
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
      console.log(days);
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
