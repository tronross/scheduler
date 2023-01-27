///////////////////////////////////
// InterviewerList Component
///////////////////////////////////
import React from "react";

import InterviewerListItem from "./InterviewerListItem";

// Stylesheet
import "components/InterviewerListItem.scss"

// Component
export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  const interviewersList = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === props.id}
      setInterviewer={props.setInterviewer}
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