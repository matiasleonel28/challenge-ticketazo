describe('TC-ORG-04-04b — Perfil público inexistente redirige a inicio', () => {
  it('Acceder a un perfil público inválido redirige correctamente al home', () => {
    cy.viewport(1280, 720);

    // Visitamos un perfil público con nombre inexistente
    cy.visit('https://vps-3696213-x.dattaweb.com/myEvents/OrganizadorFalso123', { failOnStatusCode: false });

    // El sistema debe redirigir a la home
    cy.url().should('eq', 'https://vps-3696213-x.dattaweb.com/');
  });
});
