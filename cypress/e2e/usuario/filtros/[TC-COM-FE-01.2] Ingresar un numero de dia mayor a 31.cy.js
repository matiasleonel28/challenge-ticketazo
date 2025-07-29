describe('[TC-COM-FE-01.2] Ingresar un numero de dia mayor a 31', () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/')
  })

  it('Limpia el campo día, ingresa "40" y verifica el texto resultante', () => {
    cy.get('[data-slot="start-input"]').within(() => {
     
    cy.get('[data-type="day"][contenteditable="true"]').then($el => {
        $el[0].innerText = '' 
      })

      // Ingreso del valor: "40"
      cy.get('[data-type="day"][contenteditable="true"]')
        .type('40', { force: true })
    })

    
    cy.wait(500)

    // Verificamos qué quedó realmente visible
    cy.get('[data-type="day"][contenteditable="true"]')
      .invoke('text')
      .then(texto => {
        cy.log(`Valor final : "${texto}"`)
        expect(texto).to.eq('40') 
      })
  })
})