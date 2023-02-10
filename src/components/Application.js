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
  const {
          state,
          setDay,
          bookInterview,
          cancelInterview
      } = useApplicationData();
    // // State
    // const [state, setState] = useState({
      //   day: 'Monday',
      //   days: [],
      //   appointments: {},
      //   interviewers: {}
      // })
      
      // function bookInterview(id, interview) {
        //   // (Immutable) update appointments object
        //   const appointment = {
          //     ...state.appointments[id],
          //     interview: { ...interview }
          //   };
          
  //   const appointments = {
    //     ...state.appointments,
    //     [id]: appointment
    //   };
    
    //   return axios.put(`/api/appointments/${id}`, {interview})
    //     .then(() => {
      //       setState({
        //         ...state,
        //         appointments
        //       })
        //     });
        // }
        
        // function cancelInterview(id) {
          //    // (Immutable) update appointments object
          //   const appointment = {
            //     ...state.appointments[id],
            //     interview: null
            //   };
            
            //   const appointments ={
              //     ...state.appointments,
              //     [id]:appointment
              //   };
              
              //   return axios.delete(`/api/appointments/${id}`)
              //     .then(() => {
                //       setState({
                  //         ...state,
                  //         appointments
                  //       })
                  //     });
                  // }
                  
  // Data management
  // const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);
  
  // Render appointment schedule
  const appointmentSchedule = dailyAppointments.map((appointment) => {
    
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
    )}
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
