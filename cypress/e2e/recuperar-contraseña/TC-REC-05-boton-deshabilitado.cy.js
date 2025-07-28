
describe('TC-REC-05 | Botón "Enviar" deshabilitado si el campo email está vacío', () => {
  it('Debe deshabilitar el botón si no se ingresó un email', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')

    // Verificar que el botón "Enviar" está deshabilitado al cargar la página
    cy.get('input[type="email"]').clear()
    cy.contains('button', 'Enviar').should('be.disabled')

    // Verificar que el botón se habilita al ingresar un email válido
    cy.get('input[type="email"]').type('test@correo.com')
    cy.contains('button', 'Enviar').should('not.be.disabled')
  })
})
