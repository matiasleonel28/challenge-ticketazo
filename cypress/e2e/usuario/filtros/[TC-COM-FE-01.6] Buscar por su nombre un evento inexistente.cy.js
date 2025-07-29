describe('[TC-COM-FE-01.6] Buscar por su nombre un evento inexistente', () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
  })

  it('Buscar un evento con un nombre inexistente y verificar que no se muestre ningún resultado', () => {
  cy.get('input[aria-label="Search"]').type('Lalala');
      cy.get('[data-testid="event-card"]').should('have.length', 0);
      cy.contains('No se encontraron eventos').should('exist');

})
})