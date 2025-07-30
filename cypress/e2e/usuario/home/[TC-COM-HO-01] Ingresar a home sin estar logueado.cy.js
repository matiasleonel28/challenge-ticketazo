describe ('[TC-COM-HO-01] Ingresar a home sin estar logueado', () => {

    it ('Ingresar al home', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/')
        cy.wait(2000)

        cy.url ().should('eq', 'https://vps-3696213-x.dattaweb.com/')
        cy.wait (2000)

        cy.contains('Login');
      
        
    
    })
})