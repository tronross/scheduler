////////////////////////////
// Application Tests
////////////////////////////

import React from 'react';
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, prettyDOM } from '@testing-library/react';

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
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const monday = getAllByTestId(container, 'day').find(day =>
      queryByText(day,'Monday')
    );

    expect(getByText(monday, 'no spots remaining')).toBeInTheDocument;
  });


  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointmentToCancel = getAllByTestId(container, 'appointment').find(appointment =>
      queryByText(appointment,'Archie Cohen')
    );

    fireEvent.click(getByAltText(appointmentToCancel, 'Delete'));

    expect(getByText(appointmentToCancel, 'Are You Sure You Would Like to Delete?')).toBeInTheDocument;

    fireEvent.click(getByText(appointmentToCancel, 'Confirm'));

    expect(getByText(appointmentToCancel, 'Deleting...')).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointmentToCancel, 'Add'));
    
    const monday = getAllByTestId(container, 'day').find(day =>
      queryByText(day,'Monday')
    );

    expect(getByText(monday, '2 spots remaining')).toBeInTheDocument();


    console.log(prettyDOM(appointmentToCancel));
      debug();
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".



  });

});
