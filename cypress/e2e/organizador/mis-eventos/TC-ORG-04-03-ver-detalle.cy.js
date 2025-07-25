describe('TC-ORG-04-03 — Acceder al detalle del evento desde Mis Eventos', () => {

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.loginAsOrganizador();
    cy.wait(2000);
    cy.contains('Mis Eventos').click();
     cy.wait(1000);
  });

  it('Abre el panel lateral con la información del evento', () => {
    cy.contains('Ver evento').first().click();

    // En lugar de verificar la URL, validás contenido del panel lateral
    cy.contains('MegaTest').should('exist'); // o "ModernEvent"
    cy.contains('span', 'Movistar Arena').should('exist');
    cy.contains('Adquirir entrada').should('exist');
    cy.contains(/^\w+,\s\d{1,2} de \w+ de \d{4}$/).should('exist'); // Validación de formato de fecha
  });
  });

