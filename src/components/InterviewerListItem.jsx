/////////////////////////////////
// InterviewerListItem Component
/////////////////////////////////
import React from "react";
import classNames from "classnames";

// Stylesheet
import "components/InterviewerListItem.scss"

// Component
export default function InterviewerListItem(props)  {
  const interviewerClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});

  return (
    <li className="interviewers__item" onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
