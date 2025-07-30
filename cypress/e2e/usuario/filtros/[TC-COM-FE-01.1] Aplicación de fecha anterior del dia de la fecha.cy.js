describe ('[TC-COM-FE-01.1] Aplicación de fecha anterior del día de la fecha ', () => {


 
  it('Valida que se muestre un mensaje de error por fecha anterior', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')

    // Ingresar fecha anterior (1 día menos que hoy)
    cy.ingresarFechaAnterior(1)

    // Esperar a que el sistema valide automáticamente y aparezca el mensaje
    cy.get('[data-slot="error-message"]', { timeout: 5000 })
      .should('be.visible')
      .and('contain.text', 'El valor debe ser 29/7/2025 o posterior.')
  })

})