////////////////////////////////////
// (Appointment) Confirm Component
////////////////////////////////////

import React from "react";

// Child Component
import Button from "components/Button";

// Component
export default function Confirm(props) {

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}