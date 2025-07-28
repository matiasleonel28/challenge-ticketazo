
describe('TC-REC-07 |  Validar acceso de retorno a Login desde la pantalla actual', () => {
  it('Debe existir una opción visible para volver al login y debe redirigir correctamente', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')

    // Buscar un elemento que incluya texto relacionado a volver al login
    cy.get('a, button').contains(/login|iniciar sesión/i).should('exist').click()

    // Validar redirección
    cy.url().should('include', '/auth/login')
  })
})
