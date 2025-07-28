describe('TC-ORG-04-04 — Acceder al perfil público del organizador y visualizar eventos disponibles', () => {

  beforeEach(() => {
    cy.viewport(1280,720);
    cy.loginAsOrganizador();
    cy.contains('Mis Eventos').click();
  });

   it('Accede desde el botón de compartir al perfil público del organizador y ve eventos activos', () => {
    cy.get('[data-cy="btn-compartir-perfil"]').click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((copiedPath) => {
        const fullUrl = 'https://vps-3696213-x.dattaweb.com' + copiedPath;
        cy.visit(fullUrl);

        cy.url().should('include', '/MegaEventos');
        cy.contains('ModernEvent').should('exist');
        cy.contains('Adquirí tu entrada').should('exist');
        cy.contains(/ATP|Mayores de/i).should('exist');
      });
    });
  });
});
