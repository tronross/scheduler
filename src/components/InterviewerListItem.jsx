///////////////////////////////////
// InterviewerListItem Component
///////////////////////////////////
import React from "react";
import classNames from "classnames";

// Stylesheet
import "components/InterviewerListItem.scss"

// Component
export default function InterviewerListItem(props)  {
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});

  const showName = function() {
    if (props.selected) {
      return props.name
    };
  }

  const interviewerName = showName();


  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className={interviewerClass}
        src={props.avatar}
        alt={props.name}
      />
      {interviewerName}
    </li>
  );
}
