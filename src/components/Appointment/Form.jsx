////////////////////////////////////
// (Appointment) Form Component
////////////////////////////////////

import React, { useState } from 'react';

// Child Components
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

// Component
export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function () {
    setInterviewer(null);
    setStudent('');
  }

  const cancel = function () {
    reset();
    setError('');
    props.onCancel();
  }

  function validate() {
    if (student === '') {
      setError("Student Name Cannot Be Blank");
      return;
    }

    if (interviewer === null) {
      setError('Please Select an Interviewer');
      return;
    }

    setError('');
    props.onSave(student, interviewer);
  }

  // Render Component
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(props.edit) ? props.onCancel : cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}
