////////////////////////////
// Appointment Component
////////////////////////////

import React, { Fragment } from 'react';
import useVisualMode from 'hooks/useVisualMode';

// Stylesheet
import './styles.scss'

// Child Components
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

// Component
export default function Appointment(props) {
  // extract and define nested props
  const interview = {...props.interview};
  const interviewerObj = {...interview.interviewer};

  // Mode constants
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';

  // Manipulate Appointment visual mode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // Create appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props.bookInterview(props.appointmentId, interview)
      .then (() => transition(SHOW));
  }

  // Delete appointment
  function deleteAppointment() {
    transition(CONFIRM);
  }

  function confirmChoice() {
    transition(DELETING);
    
    props.cancelInterview(props.appointmentId)
      .then(() => transition(EMPTY));
  }

  // Edit appointment
  function editAppointment() {
    transition(EDIT);
  }

  // Return Component
  return (
    <Fragment >
      <Header time={props.time} />
      <article className="appointment" >
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
              <Show 
                student={interview.student}
                interviewer={interviewerObj}
                onDelete={deleteAppointment}
                onEdit={editAppointment}
                appointmentId={props.appointmentId}
              />
            )}
            {mode === CREATE && (
              <Form
                interviewers={props.interviewers}
                student={interview.student}
                onCancel={back}
                onSave={save}
              />
            )}
            {mode === SAVING && (
              <Status
                message={"Saving..."}
              />
            )}
            {mode === CONFIRM && (
              <Confirm
                onConfirm={confirmChoice}
                onCancel={back}
              />
            )}
            {mode === DELETING && (
              <Status 
                message={"Deleting..."}
              />
            )}
            {mode === EDIT && (
              <Form

              />
            )}
      </article>
    </Fragment>
  );
}

