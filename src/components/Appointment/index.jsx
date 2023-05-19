////////////////////////////
// Appointment Component
////////////////////////////

import React, { Fragment, useEffect } from 'react';

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
import Error from './Error';

// Component
export default function Appointment(props) {
  // extract and define nested props
  const interview = { ...props.interview };
  const interviewerObj = { ...interview.interviewer };

  // Mode constants
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

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
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // Delete appointment
  function deleteAppointment() {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING, true);

    props
      .cancelInterview(props.appointmentId)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  // Edit appointment
  function editAppointment() {
    transition(EDIT);
  }

  useEffect(() => {
    if (mode === EMPTY && interview) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
     }
    }, [interview, transition, mode]);
  

  // Render Component
  return (
    <Fragment >
      <Header time={props.time} />
      <article className="appointment" data-testid="appointment" >
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && !interview.student && (<Empty onAdd={() => transition(CREATE)} />
        )}
        {mode === SHOW && interview.student && (
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
            message={"Are You Sure You Would Like to Delete?"}
            onConfirm={destroy}
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
            interviewers={props.interviewers}
            interviewer={interviewerObj.id}
            student={interview.student}
            onCancel={back}
            onSave={save}
            edit={true}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={"The Appointment was not Saved"}
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"The Appointment was not Deleted"}
            onClose={back}
          />
        )}
      </article>
    </Fragment>
  );
}
