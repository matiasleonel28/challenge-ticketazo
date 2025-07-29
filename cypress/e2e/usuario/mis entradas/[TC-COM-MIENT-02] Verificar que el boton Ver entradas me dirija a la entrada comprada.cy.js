describe('[TC-COM-MIENT-02] Verificar que el botón "Ver entradas" me dirija a la entrada comprada.', () => {
  beforeEach(() => {
    cy.viewport('macbook-13') // Solución que me trajo la IA, porque ya no sabía como hacerlo visible
    cy.visit('https://vps-3696213-x.dattaweb.com/')
  })

  it('Valida que al hacer clic en "Ver entradas" me redirija a la entrada comprada', () => {
 
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
      cy.get('[data-cy="input-email"]').type('lojic98050@dosonex.com');
      cy.get('[data-cy="input-password"]').type('Aa123456@');
      cy.get('[data-cy="btn-login"]').click();


    cy.contains('Mis entradas').click();
    cy.url().should('include', '/tickets/list');
    cy.contains('Ver todas las entradas').should('be.visible').click();
    

 
  }); 
})