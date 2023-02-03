////////////////////////////
// Application Component
////////////////////////////
import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper functions
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

// Child Components
import DayList from "./DayList";
import Appointment from "./Appointment";

// Stylesheet
import "components/Application.scss";

// Component
export default function Application(props) {
  // State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // Data management
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentSchedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
      />
    )}
  )


  

  // Routes
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((responses) => {
      setState(prev => ({...prev, days: responses[0].data,
                                  appointments: responses[1].data, 
                                  interviewers: responses[2].data}));
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
        {appointmentSchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
