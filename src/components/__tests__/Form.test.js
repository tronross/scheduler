////////////////////////////
// Form Unit Test
////////////////////////////

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  // Mock data
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  // Unit tests
  it('renders without student name if not provided', () => {
    
  const { getByPlaceholderText } = render(
    <Form interviewers={interviewers} />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it('renders with initial student name', () => {

    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
  
    const { getByText } = render(
      <Form onSave={onSave}
        interviewer={interviewers[0].id}
        interviewers={interviewers}
        student={undefined}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
 
    const { getByText } = render(
      <Form onSave={onSave} interviewers={interviewers} student={"Lydia Miller-Jones"}/>
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer is defined", () => {
    const onSave = jest.fn();
  
    const { getByText, queryByText } = render(
      <Form 
        onSave={onSave}
        interviewer={interviewers[0].id}
        interviewers={interviewers}
        student={"Lydia Miller-Jones"}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
  
  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

});
