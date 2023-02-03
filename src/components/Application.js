////////////////////////////
// Application Component
////////////////////////////
import React, { useState, useEffect } from "react";
import axios from "axios";

// Child Components
import DayList from "./DayList";
import Appointment from "./Appointment";

// Stylesheet
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";

// Component
export default function Application(props) {
  // State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  

  // Routes
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((responses) => {
      setState(prev => ({...prev, days: responses[0].data, appointments: responses[1].data, interviewers: responses[2].data}));
    });
  }, [])
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              value={state.day}
              onChange={setDay}
            />
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return (
          <Appointment
          key={appointment.id}
          {...appointment}
          />
          )}
        )}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
