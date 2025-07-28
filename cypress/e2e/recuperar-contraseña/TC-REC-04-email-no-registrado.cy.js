describe('TC-REC-04 | Envío con email válido pero no registrado', () => {
  it('Debe redirigir y mostrar mensaje genérico aunque el email no exista', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')
    cy.get('input[type="email"]').clear().type('notfound999@qa.com')
    cy.contains('button', 'Enviar').click()
    cy.contains('Se ha enviado un correo para restablecer la contraseña').should('exist')
    cy.url().should('include', '/auth/login')
    
  })
})