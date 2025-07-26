describe('Funcionalidad de Inicio de Sesión (Login)', () => {
  beforeEach(() => {
     cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
  });

  describe('Tests Positivos', () => {
    it('[TC-LOG-01]Verificar que un usuario puede iniciar sesión exitosamente con un email y contraseña válidos.', () => {
        cy.get('[data-cy=input-email]').type('pablopenaheredia@gmail.com');
        cy.get('[data-cy=input-password]').type('Asdasdasd1_');
        cy.get('[data-cy=btn-login]').click();
        cy.url().should('eq', 'https://vps-3696213-x.dattaweb.com/');
    });

    it('[TC-LOG-02] Verificar que el campo de contraseña acepta entradas válidas y enmascara los caracteres.', () => {
    cy.get('[data-cy=input-password]')
        .should('have.attr', 'type', 'password')
        .type('Asdasdasd1_')
        .should('have.value', 'Asdasdasd1_');
});

    it('[TC-LOG-03] Validar que al hacer clic en el enlace "¿Olvidaste tu contraseña?" se redirige al usuario a la página de recuperación de contraseña.', () => {
      cy.get('[data-cy="btn-forgot-password"]').click();
      cy.url().should('include', '/forgotPassword');
    });

    it('[TC-LOG-04] Verificar que el enlace "¿No tienes cuenta? Regístrate!" lleva a la página de registro.', () => {
      cy.get('[data-cy="btn-register-user"]').click();
      cy.url().should('include', '/registerUser');
    });

    it('[TC-LOG-05] Verificar que el enlace "¿Querés crear tus eventos?" lleva a la página de registro/login del organizador.', () => {
      cy.get('[data-cy="btn-register-client"]').click();
      cy.url().should('include', '/registerClient');
    });
  });

  describe('Tests Negativos', () => {
    it('[TC-LOG-06] Intentar iniciar sesión con un formato de email inválido y verificar los mensajes de error.', () => {
      cy.get('[data-cy="input-email"]').type('invalido@.com');
      cy.get('[data-cy="input-password"]').type('Password123_');
      cy.get('[data-cy="btn-login"]').click();
      cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'El signo "." está colocado en una posición incorrecta en la dirección ".com".');
    });

    it('[TC-LOG-07] Intentar enviar el formulario con el campo de email vacío y asegurar que se muestra un mensaje de error.', () => {
      cy.get('[data-cy="input-email"]').clear();
      cy.get('[data-cy="input-password"]').type('Password123_');
      cy.get('[data-cy="btn-login"]').click();
      cy.get('.text-danger')
      .should('be.visible').should('be.visible').and('contain.text', 'Completa este campo');
    });

    it('[TC-LOG-08] Ingresar un email válido pero una contraseña incorrecta y verificar que el login falla con la retroalimentación de error correcta.', () => {
      cy.get('[data-cy="input-email"]').type('pablopenaheredia@gmail.com');
      cy.get('[data-cy="input-password"]').type('ContrasenaIncorrecta');
      cy.get('[data-cy="btn-login"]').click();
      cy.get('[data-cy="error-message"]').should('be.visible').and('contain.text', 'Correo o contraseña incorrectos');
    });
  });
});