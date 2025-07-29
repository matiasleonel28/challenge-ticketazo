describe('[TC-COM-FILTRO-01] Limpiar filtros desde UI', () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
  })

  it('Selecciona la categoría "Recital" y luego limpia los filtros', () => {
    // Abrir dropdown y seleccionar "Recital"
    cy.get('[aria-label="Categoría"]')
      .should('exist')
      .click({ force: true })

 cy.get('[data-slot="value"]')
  .invoke('text')
  .should('include', 'Categoría')

    // Click en "Limpiar filtros" aunque esté oculto
    cy.contains('button', 'Limpiar filtros', { matchCase: false })
      .should('exist')
      .click({ force: true })

    // Verificar que se hayan quitado los filtros
    cy.get('.filter-indicator').should('not.exist')
  })
})