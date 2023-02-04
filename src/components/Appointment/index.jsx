////////////////////////////
// Appointment Component
////////////////////////////

import React, { Fragment } from "react";
import useVisualMode from "hooks/useVisualMode";

// Stylesheet
import "./styles.scss"

// Child Components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

// Component
export default function Appointment(props) {
  // extract and define nested props
  const interview = {...props.interview};
  const interviewerObj = {...interview.interviewer};

  // Mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log('Mode: ', mode)

  return (
    <Fragment >
      <Header time={props.time} />
      <article className="appointment" >
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
              <Show 
                student={interview.student}
                interviewer={interviewerObj}
              />
            )}
            {mode === CREATE && (
            <Form
              interviewers={[]}
              student={interview.student}
              />
            )}
      </article>
    </Fragment>
  );
}

