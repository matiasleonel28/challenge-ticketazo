describe('Mis Eventos - Organizador', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  describe('Tests Positivos', () => {

    it('[TC-ORG-04-01] Renderiza al menos una tarjeta de evento', () => {
      cy.loginAsOrganizador();
      cy.visit('https://vps-3696213-x.dattaweb.com/');
      cy.contains('Mis Eventos').click();
      cy.get('.grid > .text-foreground > .flex-auto').should('have.length.at.least', 1);
    });

    it('[TC-ORG-04-02] Filtra correctamente eventos en “Mis Eventos”', () => {
      cy.loginAsOrganizador();
      cy.visit('https://vps-3696213-x.dattaweb.com/');
      cy.get('input[placeholder="Busca tu próxima función!"]').type('MegaTest');
      cy.get('.grid > .text-foreground > .flex-auto').should('have.length', 1);
      cy.contains('MegaTest').should('exist');
      cy.contains('Concierto de Verano').should('not.exist');
    });

    it('[TC-ORG-04-03] Abre el panel lateral con la información del evento', () => {
      cy.loginAsOrganizador();
      cy.visit('https://vps-3696213-x.dattaweb.com/');
      cy.contains('Mis Eventos').click();
      cy.contains('Ver evento').first().click();
      cy.contains('MegaTest').should('exist'); // o "ModernEvent"
        cy.contains('span', 'Movistar Arena').should('exist');
        cy.contains('Adquirir entrada').should('exist');
        cy.get('.shadow-lg > :nth-child(2) > :nth-child(2) > span').should('exist');
    });

    it('[TC-ORG-04-04] Desde el botón de compartir se accede al perfil público con eventos', () => {
      cy.loginAsOrganizador();
      cy.visit('https://vps-3696213-x.dattaweb.com/');
      cy.contains('Mis Eventos').click();
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

  describe('Tests Negativos', () => {

    it('[TC-ORG-04-01b] Organizador sin eventos ve mensaje adecuado', () => {
      cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
      cy.get('[data-cy="input-email"]').type('firduvufyi@necub.com');
      cy.get('[data-cy="input-password"]').type('Aa123456@');
      cy.get('[data-cy="btn-login"]').click();
      cy.contains('Mis Eventos').should('be.visible').click();
      cy.contains('Aún no tenés eventos creados').should('exist');
      cy.get('.grid > .text-foreground > .flex-auto').should('not.exist');
      cy.get('[data-testid="btn-compartir-perfil"]').should('not.exist');
    });

    it('[TC-ORG-04-02b] No muestra eventos cuando el término de búsqueda no coincide', () => {
      cy.loginAsOrganizador();
      cy.visit('https://vps-3696213-x.dattaweb.com/');
      cy.get('input[aria-label="Search"]').type('eventoquenoexiste123');
      cy.get('[data-testid="event-card"]').should('have.length', 0);
      cy.contains('No se encontraron eventos').should('exist');
    });

    it('[TC-ORG-04-04b] Acceder a un perfil público inválido redirige correctamente al home', () => {
      cy.visit('https://vps-3696213-x.dattaweb.com/myEvents/OrganizadorFalso123', { failOnStatusCode: false });
      cy.url().should('eq', 'https://vps-3696213-x.dattaweb.com/');
    });
  });
});