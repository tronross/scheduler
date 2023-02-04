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

// Component
export default function Appointment(props) {
  // extract and define nested props
  const interview = {...props.interview};
  const interviewerObj = {...interview.interviewer};

  // Mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log('Mode: ', mode)

  return (
    <Fragment >
      <Header time={props.time} />
      <article className="appointment" >
            {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
            {mode === SHOW && (
              <Show 
                student={interview.student}
                interviewer={interviewerObj}
              />
            )}
      </article>
    </Fragment>
  );
}

