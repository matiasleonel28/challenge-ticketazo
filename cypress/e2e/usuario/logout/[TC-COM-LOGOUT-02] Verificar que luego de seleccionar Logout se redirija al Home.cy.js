describe ('[TC-COM-LOGOUT-02] Verificar que luego de seleccionar "Logout" se redirija al Home', () => {
  beforeEach(() => {
    cy.viewport('macbook-13')
    cy.visit('https://vps-3696213-x.dattaweb.com/');
  });

  it('Verifica que al hacer clic en "Logout" se redirija al Home', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
      cy.get('[data-cy="input-email"]').type('lojic98050@dosonex.com');
      cy.get('[data-cy="input-password"]').type('Aa123456@');
      cy.get('[data-cy="btn-login"]').click();

    cy.contains('Logout').click();
    //cy.url().should('include', '/tickets/list');
    cy.get('[data-cy="eventos-grid"]').should('be.visible');
  })
})