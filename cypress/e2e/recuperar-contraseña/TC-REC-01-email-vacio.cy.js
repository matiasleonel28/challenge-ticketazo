describe('TC-REC-01 | Validación de envío con campo email vacío', () => {
  it('No permite enviar si el campo email está vacío', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')
    cy.get('input[type="email"]').clear()
    cy.contains('button', 'Enviar').click()
    cy.contains('El email es obligatorio').should('exist') 
  })
})