///////////////////////////////////
// InterviewerList Component
///////////////////////////////////
import React from "react";

import InterviewerListItem from "./InterviewerListItem";

// Stylesheet
import "components/InterviewerList.scss"

// Component
export default function InterviewerList(props) {
  
  // Error-preventing placeholder variable
  let onChange;

  const interviewers = props.interviewers;

  const interviewersList = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersList}</ul>
    </section>
  );
}