describe('Recuperar Contraseña - Validaciones', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/forgotPassword');
  });

  describe('Tests Positivos', () => {

    it('[TC-REC-03] Envío exitoso con email válido registrado', () => {
      cy.get('input[type="email"]').clear().type('3ypsmhh8c5@zudpck.com');
      cy.contains('button', 'Enviar').click();
      cy.contains('Se ha enviado un correo para restablecer la contraseña').should('exist');
      cy.wait(1000);
      cy.url().should('include', '/auth/login');
    });

    it('[TC-REC-04] Envío con email válido pero no registrado', () => {
      cy.get('input[type="email"]').clear().type('notfound999@qa.com');
      cy.contains('button', 'Enviar').click();
      cy.contains('Se ha enviado un correo para restablecer la contraseña').should('exist');
      cy.url().should('include', '/auth/login');
    });

    it('[TC-REC-06] Confirmación visible tras envío exitoso', () => {
      cy.get('input[type="email"]').clear().type('3ypsmhh8c5@zudpck.com');
      cy.contains('button', 'Enviar').click();
      cy.contains('Se ha enviado un correo para restablecer la contraseña').should('be.visible');
      cy.url().should('include', '/auth/login');
    });

    it('[TC-REC-07] Validar acceso de retorno a Login desde la pantalla actual', () => {
      cy.get('a, button').contains(/login|iniciar sesión/i).should('exist').click();
      cy.url().should('include', '/auth/login');
    });
  });

  describe('Tests Negativos', () => {

    it('[TC-REC-01] Validación de envío con campo email vacío', () => {
      cy.get('input[type="email"]').clear();
      cy.contains('button', 'Enviar').click();
      cy.contains('El email es obligatorio').should('exist');
    });

    it('[TC-REC-02] Validación de envío con email de formato inválido', () => {
      const emailsInvalidos = ['2', '☻'];
      emailsInvalidos.forEach((input) => {
        cy.get('input[type="email"]').clear().type(input);
        cy.contains('button', 'Enviar').click();
        cy.contains(`Incluye un signo "@" en la dirección de correo electrónico. La dirección "${input}" no incluye el signo "@"`).should('exist');
        cy.contains('Se ha enviado un correo para restablecer la contraseña').should('not.exist');
      });
    });

    it('[TC-REC-05] Botón "Enviar" deshabilitado si el campo email está vacío', () => {
      cy.get('input[type="email"]').clear();
      cy.contains('button', 'Enviar').should('be.disabled');
      cy.get('input[type="email"]').type('test@correo.com');
      cy.contains('button', 'Enviar').should('not.be.disabled');
    });
  });
});