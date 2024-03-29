///////////////////////////////////
// InterviewerList Component
///////////////////////////////////

import React from 'react';
import PropTypes from 'prop-types';

// Child Component
import InterviewerListItem from './InterviewerListItem';

// Stylesheet
import 'components/InterviewerList.scss'

// Component
export default function InterviewerList(props) {

  const interviewers = props.interviewers;

  const interviewersList = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.onChange(interviewer.id)}
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

// propType test
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
