describe('[TC-COM-ENT-01] Seleccionar comprar entradas sin estar logueado', () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
  })

  it('Valida que al intentar comprar entradas sin estar logueado, se muestre un mensaje de error', () => {
    cy.get('[data-cy="btn-ver-evento-8"]').first().click()
    cy.contains('button', 'Adquirir entrada').click()

cy.url({ timeout: 5000 }).should('include', '/login')

})
})