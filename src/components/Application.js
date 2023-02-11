////////////////////////////
// Application Component
////////////////////////////

import React from 'react';

// Child Components
import DayList from './DayList';
import Appointment from './Appointment';

// Stylesheet
import 'components/Application.scss';

// Helper functions and hooks
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationData'


// Component
export default function Application(props) {
  // Import state management from hook
  const {
          state,
          setDay,
          bookInterview,
          cancelInterview
      } = useApplicationData();
   
  const interviewers = getInterviewersForDay(state, state.day);
  
  // Render appointment schedule
  const appointmentSchedule = getAppointmentsForDay(state, state.day).map(
    appointment => {
    // console.log(state.days)
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          appointmentId={appointment.id}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  // Return Component
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
      <section className="schedule" >
        {appointmentSchedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
