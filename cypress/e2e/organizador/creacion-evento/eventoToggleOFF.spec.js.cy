describe('Paso 2.1 - Crear evento con fecha única (Toggle OFF)', () => {
beforeEach(() => {
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');

  cy.get('[data-cy="input-email"]').type('3ypsmhh8c5@zudpck.com');
  cy.get('[data-cy="input-password"]').type('Aa123456@');
  cy.get('[data-cy="btn-login"]').click();

  // Esperar que la URL cambie como señal de login exitoso
  cy.url({ timeout: 10000 }).should('not.include', '/auth/login');

  // Validar que estamos en el dashboard
  cy.get('body').then($body => {
    if ($body.find('[data-cy="btn-nuevo-evento"]').length > 0) {
      cy.log('Dashboard cargado correctamente');
    } else {
      cy.log('Elemento btn-nuevo-evento no encontrado, posible render incompleto o sesión fallida');
    }
  });
});

  it('Crea evento con todos los campos obligatorios', () => {
    cy.get('[data-cy="toggle-multifecha"]').should('exist').uncheck();
    cy.get('[data-cy="input-titulo"]').type('Concierto Único');
    cy.get('[data-cy="input-fecha"]').type('2025-08-15');
    cy.get('[data-cy="input-hora"]').type('21:00');
    cy.get('[data-cy="select-edad"]').select('+13');
    cy.get('[data-cy="select-genero"]').select('Concierto');
    cy.get('[data-cy="input-duracion"]').type('120');
    cy.get('[data-cy="select-lugar"]').select('Teatro Vera');
    cy.get('[data-cy="btn-siguiente"]').click();
    cy.contains('Paso 2.2', { timeout: 8000 }).should('exist');
  });

  it('Permite ingresar duraciones menores a 180 min', () => {
    cy.get('[data-cy="input-duracion"]').clear().type('90');
    cy.get('[data-cy="input-duracion"]').should('have.value', '90');
  });

  it('No permite avanzar si falta el título', () => {
    cy.get('[data-cy="btn-siguiente"]').click();
    cy.get('[data-cy="input-titulo"]')
      .should('exist')
      .then(($el) => {
        expect($el[0].validationMessage).to.contain('complete');
      });
  });

  it('Valida formato de fecha incorrecta', () => {
    cy.get('[data-cy="input-fecha"]').clear().type('2023-02-30').blur();
    cy.get('.error-fecha', { timeout: 5000 }).should('exist');
  });

  it('Admite emojis en el título del evento', () => {
    cy.get('[data-cy="input-titulo"]').type('🎸 Noche de Rock');
    cy.get('[data-cy="input-titulo"]').should('have.value', '🎸 Noche de Rock');
  });

  it('Permite campos opcionales en blanco', () => {
    cy.get('[data-cy="input-descripcion"]').should('exist').clear();
    cy.get('[data-cy="btn-siguiente"]').click();
    cy.contains('Paso 2.2', { timeout: 8000 }).should('exist');
  });

});
