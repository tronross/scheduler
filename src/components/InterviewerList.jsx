///////////////////////////////////
// InterviewerList Component
///////////////////////////////////
import React from "react";

import InterviewerListItem from "./InterviewerListItem";

// Component
export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}