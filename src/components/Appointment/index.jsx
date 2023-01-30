////////////////////////////
// Appointment Component
////////////////////////////
import React, { Fragment } from "react";

// Stylesheet
import "./styles.scss"

// Child Components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

// Component
export default function Appointment(props) {
  const interview = {...props.interview};
  const interviewerObj = {...interview.interviewer};

  return (
    <Fragment >
      <Header time={props.time} />
      <article className="appointment" >
        <>
          {props.interview ?
            <>
              <Show student={interview.student} interviewer={interviewerObj.name} />
            </>
            :
            <>
              <Empty />
            </>
          }
        </>
      </article>
    </Fragment>
  );
}
