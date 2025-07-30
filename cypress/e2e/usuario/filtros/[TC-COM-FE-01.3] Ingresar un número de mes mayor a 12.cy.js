describe('[TC-COM-FE-01.3] Rechazar ingreso de mes > 12', () => {
  it('Intenta ingresar "15" y verifica que no queda retenido', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')

    // Intenta ingresar "15"
    cy.get('[data-type="month"][contenteditable="true"]')
      .first()
      .type('15', { force: true })

    // Verifica que el campo NO conserve el valor "15"
    cy.get('[data-type="month"][contenteditable="true"]')
      .first()
      .invoke('text')
      .then(texto => {
        cy.log(`Valor final en campo mes: "${texto}"`)
        expect(texto).to.not.eq('15') // Esperás que lo rechace
      })
    })
})