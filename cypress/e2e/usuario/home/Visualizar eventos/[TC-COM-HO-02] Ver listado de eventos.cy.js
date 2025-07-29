describe ('[TC-COM-HO-02] Ver listado de eventos', () => {

    it ('Ver todos los eventos disponibles al momento de ingresar al home', () => {
        cy.visit('https://vps-3696213-x.dattaweb.com/')
        cy.get('[data-cy="eventos-grid"]').should('be.visible');

    })
})