////////////////////////////
// useAppicationData Hook
////////////////////////////

import { useState, useEffect } from 'react';

import axios from 'axios';

////////
// Hook
////////

/**
 * Returns an object containing the state object, and methods.
 * @returns {object} Returns an object containing the state object, and methods: setDay,bookInterview, cancelInterview.
 */
export default function useAppicationData() {
  // Open WebSocket
  useEffect(() => {
    const socket = new WebSocket (process.env.REACT_APP_WEBSOCKET_URL);

    socket.addEventListener("open", (event) => {
      socket.send("ping");
    });

    socket.onmessage = (event) => {
      console.log(`Message received: ${event.data}`);
    };
  }, [])



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
        setState(prev => ({
          ...prev, days: responses[0].data,
          appointments: responses[1].data,
          interviewers: responses[2].data
        }));
      });
  }, [])

  // Manage state when changing day in the DayList
  const setDay = day => setState({ ...state, day });

  /**
  * Returns an array of day objects.
  *
  * @param {number} id Selected appointment id.
  * @param {array} days Current days state.
  * @param {object} appointments Current appointments state.
  * @returns {array} Returns an updated array of day objects.
  */
  function updateSpots(id, days, appointments) {
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

    return days;
  }

  // Manage Individual Interviews

  /**
   * Updates state when booking a new interview.
   *
   * @param {number} id Selected appointment id.
   * @param {object} interview Current days state.
   * @setState Updates state to include new interview.
   */

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => updateSpots(id, [...state.days], { ...appointments }))
      .then((days) => {
        setState({
          ...state,
          appointments,
          days
        })
      });
  };

  /**
  * Updates state when deleting an interview.
  * @param {number} id Selected appointment id.
  * @setState Updates state to include new interview availability.
  */

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => updateSpots(id, [...state.days], { ...appointments }))
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
