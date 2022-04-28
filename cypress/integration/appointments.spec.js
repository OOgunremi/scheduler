describe("Appointment", () => {

  it("should book an interview",() => {
  cy.visit("/")
    .contains("[data-testid=day]", "Monday")
    .get("[alt=Add]")
    .first()
    .click()
    .get('[data-testid="student-name-input"]')
    .type("Lekan")
    .get(':nth-child(1) > .interviewers__item-image')
    .click("")
    .get('.button--confirm')

  });
});