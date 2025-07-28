
describe('TC-REC-02 | Recuperar contraseña - Validación de envío con email de formato inválido', () => {
  const emailsInvalidos = ['2', '☻']

  emailsInvalidos.forEach((input) => {
    it(`No debería permitir envío con email inválido: "${input}"`, () => {
      cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword')
      cy.get('input[type="email"]').clear().type(input)
      cy.contains('button', 'Enviar').click()

      
      cy.contains(`Incluye un signo "@" en la dirección de correo electrónico. La dirección "${input}" no incluye el signo "@"`).should('exist')

     
      cy.contains('Se ha enviado un correo para restablecer la contraseña').should('not.exist')
    })
  })
})
