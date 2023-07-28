Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Karem')
    cy.get('#lastName').type('Andrade')
    cy.get('#email').type('karem@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})