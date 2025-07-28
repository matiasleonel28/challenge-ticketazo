
describe('TC-REC-06 | Confirmación visible tras envío exitoso', () => {
  it('Debe mostrar mensaje de confirmación luego del envío con email registrado', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')
    cy.get('input[type="email"]').clear().type('3ypsmhh8c5@zudpck.com')
    cy.contains('button', 'Enviar').click()
    cy.contains('Se ha enviado un correo para restablecer la contraseña').should('be.visible')
    // Verifica que se redirige a la página de login
    cy.url().should('include', '/auth/login')
    
    
  })
})
