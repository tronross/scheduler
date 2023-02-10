////////////////////////////
// useAppicationData Hook
////////////////////////////

import { useState, useEffect } from 'react';
import axios from 'axios';
 
export default function useAppicationData() {
  // Define state
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  // Manage interviews
  function bookInterview(id, interview) {
    // (Immutable) update appointments object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
          ...state,
          appointments
        })
      });
  };
  
  function cancelInterview(id) {
    // (Immutable) update appointments object
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
    
  // Manage state when changing day in the DayList
  const setDay = day => setState({ ...state, day });
  
  // GET Routes, set/update state
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
    
  return {
           state,
           setDay,
           bookInterview,
           cancelInterview
         };
}