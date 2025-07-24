describe('TC-ORG-04-02 — Filtrar eventos por título', () => {
    beforeEach(() => {
    cy.viewport(1280, 720); 
  });  
  it('Filtra correctamente eventos en “Mis Eventos”', () => {
    cy.loginAsOrganizador();
    cy.visit('https://vps-3696213-x.dattaweb.com/');

    // Ingresar filtro por nombre
    cy.get('input[placeholder="Busca tu próxima función!"]').type('MegaTest');

    // Validar que sólo se muestre el evento filtrado
    cy.get('.grid > .text-foreground > .flex-auto').should('have.length', 1);
    cy.contains('MegaTest').should('exist');
    cy.contains('Concierto de Verano').should('not.exist');
  });
});
