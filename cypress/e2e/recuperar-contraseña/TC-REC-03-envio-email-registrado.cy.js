describe('TC-REC-03 | Envío exitoso con email válido registrado', () => {
  it('Debe aceptar el envío y redirigir con mensaje si el email está registrado', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')
    cy.get('input[type="email"]').clear().type('3ypsmhh8c5@zudpck.com')
    cy.contains('button', 'Enviar').click()
    cy.contains('Se ha enviado un correo para restablecer la contraseña').should('exist')
    cy.wait (1000)
    cy.url().should('include', '/auth/login')
  })
})