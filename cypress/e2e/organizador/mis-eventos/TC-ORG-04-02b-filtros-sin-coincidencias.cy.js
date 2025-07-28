describe('TC-ORG-04-02b - filtro-sin-coindencias muestra mensaje adecuado' , () =>{
    beforeEach(()=>{
        cy.viewport(1280, 720);
    });
    it('No muestra eventos cuando el término de búsqueda no coincide',() => {
        cy.loginAsOrganizador();
        cy.visit('https://vps-3696213-x.dattaweb.com/');
        cy.get('input[aria-label="Search"]').type('eventoquenoexiste123');
        cy.get('[data-testid="event-card"]').should('have.length', 0);
        cy.contains('No se encontraron eventos').should('exist');

  })

})