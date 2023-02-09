////////////////////////////////////
// (Appointment) Form Component
////////////////////////////////////

import React, { useState } from 'react';

// Child Component
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

// Component
export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setInterviewer(null);
    setStudent('');
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }

  // Return Component
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(props.edit) ? props.onCancel : cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}
