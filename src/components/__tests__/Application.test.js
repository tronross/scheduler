////////////////////////////
// Application Tests
////////////////////////////

import React from 'react';
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, prettyDOM, getByTestId } from '@testing-library/react';
import axios from 'axios';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () =>{
  
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText} = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();    
  });


  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment =  getAllByTestId(container, 'appointment')[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    
    fireEvent.click(getByText(appointment, 'Save'));
    
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const monday = getAllByTestId(container, 'day').find(day =>
      queryByText(day,'Monday')
    );

    expect(getByText(monday, 'no spots remaining')).toBeInTheDocument;
  });


  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointmentToCancel = getAllByTestId(container, 'appointment').find(appointment =>
      queryByText(appointment,'Archie Cohen')
    );

    fireEvent.click(getByAltText(appointmentToCancel, 'Delete'));

    expect(getByText(appointmentToCancel, 'Are You Sure You Would Like to Delete?')).toBeInTheDocument;

    fireEvent.click(queryByText(appointmentToCancel, 'Confirm'));

    expect(getByText(appointmentToCancel, 'Deleting...')).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointmentToCancel, 'Add'));
    
    const monday = getAllByTestId(container, 'day').find(day =>
      queryByText(day,'Monday')
    );

    expect(getByText(monday, '2 spots remaining')).toBeInTheDocument();
  });


  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
   
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointmentToEdit = getAllByTestId(container, 'appointment').find(appointment =>
      queryByText(appointment,'Archie Cohen')
    );

    fireEvent.click(getByAltText(appointmentToEdit, 'Edit'));

    fireEvent.change(getByTestId(appointmentToEdit, 'student-name-input'), {
      target: { value: "Dave desJardins" }
    });

    fireEvent.click(queryByText(appointmentToEdit, 'Save'));

    expect(getByText(appointmentToEdit, 'Saving...')).toBeInTheDocument();

    await waitForElement(() => getByText(appointmentToEdit, 'Dave desJardins'));

    const monday = getAllByTestId(container, 'day').find(day =>
      queryByText(day,'Monday')
    );

    expect(getByText(monday, '1 spot remaining')).toBeInTheDocument();
  });


  it('shows the save error when failing to save an appointment', () => {
    axios.put.mockRejectedValueOnce();
  });

});
