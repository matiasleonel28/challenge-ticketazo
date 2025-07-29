describe('[TC-COM-FE-01.4] Ingresar un número de año superior a 9999', () => {
  it('Intenta ingresar "12345" como año y verifica que no pueda guardarlo para su búsqueda', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')

    cy.get('[data-type="year"][contenteditable="true"]')
      .first()
      .then($el => {
        $el[0].innerText = '' 
      })

    cy.get('[data-type="year"][contenteditable="true"]')
      .first()
      .type('12345', { force: true })

    cy.wait(500)

    cy.get('[data-type="year"][contenteditable="true"]')
      .first()
      .invoke('text')
      .then(texto => {
        cy.log(`Año renderizado: "${texto}"`)
        expect(texto).to.not.eq('12345')
        expect(Number(texto)).to.be.at.most(9999)
      })
  })
})