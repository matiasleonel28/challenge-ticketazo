describe('TC-ORG-04-01b — Mis eventos sin datos', () => {
    beforeEach(() => {
    cy.viewport(1280, 720); 
  });  
  it('Organizador sin eventos ve mensaje adecuado', () => {
    // Login explícito con organizador sin eventos
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
    cy.get('[data-cy="input-email"]').type('firduvufyi@necub.com');
    cy.get('[data-cy="input-password"]').type('Aa123456@');
    cy.get('[data-cy="btn-login"]').click();

    
    cy.contains('Mis Eventos').should('be.visible').click();

    // Validaciones de página vacía
    cy.contains('Mis Eventos').should('be.visible');
    cy.contains('Aún no tenés eventos creados').should('exist'); // ⚠️ adaptá según mensaje real
    cy.get('.grid > .text-foreground > .flex-auto').should('not.exist');
    cy.get('[data-testid="btn-compartir-perfil"]').should('not.exist');
  });
});
