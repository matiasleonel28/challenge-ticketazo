describe('TC-ORG-04-01 — Mis eventos - listado inicial', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.loginAsOrganizador();
    cy.visit('https://vps-3696213-x.dattaweb.com/');
    cy.contains('Mis Eventos').click();
    
  });

  it('Renderiza al menos una tarjeta de evento', () => {
    cy.get('.grid > .text-foreground > .flex-auto').should('have.length.at.least', 1);
  });

  it('Cada tarjeta tiene estructura funcional mínima', () => {
    
    cy.get('img[alt="MegaTest"]').should('be.visible');
    cy.url().should('include', '/myEvents');
    cy.get('.grid > .text-foreground > .flex-auto').first().within(() => {
      cy.contains(/MegaTest|ModernEvent/).should('exist');       // Título
      cy.contains('Movistar Arena').should('exist');             // Ubicación
      cy.contains(/de \w+ de \d{4}/).should('exist');            // Fecha natural
    });
      cy.contains('Ver evento').first().should('be.visible'); // Verificar que esté el Botón 'Ver evento'
  });

  it('Botón "Compartir perfil" está presente', () => {
    cy.get('[data-cy="btn-compartir-perfil"]').should('exist');
  });
});
