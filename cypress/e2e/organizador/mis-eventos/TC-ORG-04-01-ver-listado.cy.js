describe('TC-ORG-04-01 — Mis eventos - listado inicial', () => {
    beforeEach(() => {
    cy.viewport(1280, 720); 
  });  
  it('Organizador visualiza sus eventos correctamente', () => {
    // Comando custom que deberías tener en cypress/support/commands.js
    cy.loginAsOrganizador();

    cy.visit('https://vps-3696213-x.dattaweb.com/');

    // Validación de sección general
    cy.contains('Mis Eventos').should('be.visible').click();  
    

    // Validación de tarjetas de evento
    cy.get('.grid > .text-foreground > .flex-auto').should('have.length.at.least', 1);

    // Botón "Ver evento"
    cy.get('.rounded-b-small > .z-0').first().should('exist');

    // Botón "Compartir perfil"
    cy.get('.rounded-b-small > .z-0').should('exist');
  });
});