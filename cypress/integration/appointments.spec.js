//////////////////////////////
// Cypress Appointment Tests
//////////////////////////////

describe('Appointments', () => {

  it('should book an interview', () => {
    cy.visit('/')

    cy.contains('[data-testid=day]', 'Monday')

    cy.get('[alt=Add]')
      .first()
      .click();

  })

});