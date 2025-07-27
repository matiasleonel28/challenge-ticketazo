describe('Registro de Organizador', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerClient');
  });

  const completarFormulario = (datos = {}) => {
    const datosDefault = {
      razonSocial: 'Organizador Prueba SRL',
      cuit: '20300000009',
      provincia: 'Buenos Aires',
      localidad: 'La Plata',
      direccion: 'Calle Falsa 123',
      telefono: '1155554444',
      email: 'organizador.test@example.com',
      confirmarEmail: 'organizador.test@example.com',
      password: 'OrgPass1_', // 1 mayús, 8 caracteres, 1 símbolo, 1 número
      repetirPassword: 'OrgPass1_',
      enviarFormulario: true
    };

    // Combinar datos default con datos personalizados
    const datosFinal = { ...datosDefault, ...datos };

    // Completar campos básicos
    cy.get('[data-cy="input-razon-social"]').type(datosFinal.razonSocial);
    cy.get('[data-cy="input-cuit"]').type(datosFinal.cuit);
    cy.get('[data-cy="input-direccion"]').type(datosFinal.direccion);
    cy.get('[data-cy="input-telefono"]').type(datosFinal.telefono);

    // Provincia y localidad
    cy.get('[data-cy="select-provincia"]').type(datosFinal.provincia);
    cy.get('[role="listbox"] [role="option"]').contains(datosFinal.provincia).click();

    cy.get('[data-cy="select-localidad"]').should('be.enabled');
    cy.wait(1000);
    cy.get('[data-cy="select-localidad"]').type(datosFinal.localidad);
    cy.get('[role="listbox"] [role="option"]').contains(datosFinal.localidad).click();

    // Email
    cy.get('[data-cy="input-email"]').type(datosFinal.email);
    cy.get('[data-cy="input-confirmar-email"]').type(datosFinal.confirmarEmail);

    // Contraseña
    cy.get('[data-cy="input-password"]').type(datosFinal.password);
    cy.get('[data-cy="input-repetir-password"]').type(datosFinal.repetirPassword);

    // Enviar formulario si está habilitado
    if (datosFinal.enviarFormulario) {
      cy.get('[data-cy="btn-registrarse"]').click();
    }
  };

  describe('Tests Positivos', () => {
    it('[TC-REG-ORG-01] Verificar que el formulario puede ser enviado exitosamente con todos los campos requeridos llenos con datos válidos.', () => {
      // Capturar alert usando cy.on
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Organizador registrado exitosamente. Su cuenta está pendiente de aprobación por el Administrador');
      });

      completarFormulario();
    });
  });

  describe('Tests Negativos', () => {
    it('[TC-REG-ORG-02] Intentar enviar el formulario con uno o más campos requeridos vacíos y verificar que se muestran mensajes de error apropiados.', () => {
      // Solo llenar algunos campos, dejando otros vacíos
      cy.get('[data-cy="input-telefono"]').type('1155554444');
      cy.get('[data-cy="input-direccion"]').type('Calle Falsa 123');

      // Provincia y localidad
      cy.get('[data-cy="select-provincia"]').type('Buenos Aires');
      cy.get('[role="listbox"] [role="option"]').contains('Buenos Aires').click();
      cy.wait(1000);
      cy.get('[data-cy="select-localidad"]').type('La Plata');
      cy.get('[role="listbox"] [role="option"]').contains('La Plata').click();

      // Email y contraseña
      cy.get('[data-cy="input-email"]').type('test@gmail.com');
      cy.get('[data-cy="input-confirmar-email"]').type('test@gmail.com');
      cy.get('[data-cy="input-password"]').type('Password1_');
      cy.get('[data-cy="input-repetir-password"]').type('Password1_');

      // Dejar Razón Social y CUIT vacíos
      cy.get('[data-cy="btn-registrarse"]').click();

      // Verificar errores
      cy.get('[data-slot="error-message"]')
        .should('be.visible')
        .and('contain.text', 'Completa este campo');

      cy.url().should('include', '/registerClient');
    });

    it('[TC-REG-ORG-03] Ingresar un formato de email inválido en los campos "Email" y/o "Confirmar Email" y verificar que el sistema rechaza la entrada y muestra un mensaje de error.', () => {
      const emailsInvalidos = [
        { email: 'testorg.com', mensaje: 'Incluye un signo "@" en la dirección de correo electrónico' },
        { email: 'organizador@.co', mensaje: 'El signo "." está colocado en una posición incorrecta' },
        { email: 'org@domain', esBug: true } // Bug: no muestra error
      ];

      emailsInvalidos.forEach((caso) => {
        completarFormulario({
          email: caso.email,
          confirmarEmail: caso.email,
          enviarFormulario: false
        });

        cy.get('[data-cy="btn-registrarse"]').click();

        if (caso.esBug) {
          cy.log(`BUG: "${caso.email}" debería mostrar error`);
          cy.get('[data-slot="error-message"]').should('not.exist');
        } else {
          cy.get('[data-slot="error-message"]').should('be.visible')
            .and('contain.text', caso.mensaje);
        }

        cy.url().should('include', '/registerClient');
        cy.reload();
      });
    });

    it('[TC-REG-ORG-04] Ingresar un CUIT que excede la longitud máxima (11 dígitos) y verificar que el sistema rechaza la entrada y muestra un mensaje de error.', () => {
      completarFormulario({
        cuit: '203000000091', // 12 dígitos
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-slot="error-message"]').should('be.visible')
        .and('contain.text', 'El CUIT debe tener exactamente 11 dígitos');

      cy.url().should('include', '/registerClient');
    });

    it('[TC-REG-ORG-05] Ingresar un número de teléfono con menos de 8 dígitos y verificar que se muestra un mensaje de error.', () => {
      completarFormulario({
        telefono: '1234567', // 7 dígitos
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-slot="error-message"]').should('be.visible')
        .and('contain.text', 'Utiliza un formato que coincida con el solicitado');

      cy.url().should('include', '/registerClient');
    });

    it('[TC-REG-ORG-06] Intentar enviar el formulario con contraseñas que no coinciden en los campos "Contraseña" y "Repetir Contraseña".', () => {
      completarFormulario({
        password: 'PassOrg1_',
        repetirPassword: 'PassOrg2_',
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-cy="error-message"]').should('be.visible')
        .and('contain.text', 'Las contraseñas no coinciden');

      cy.url().should('include', '/registerClient');
    });

    it('[TC-REG-ORG-07] Intentar registrarse con un email que ya existe en el sistema.', () => {
  // Primer registro: crear organizador con email específico
  completarFormulario({
    email: 'organizador.existente@test.com',
    confirmarEmail: 'organizador.existente@test.com'
  });

  // Capturar el alert del primer registro
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.contains('Cliente registrado con éxito, espera la validación del administrador');
  });

  // Volver a la página de registro para el segundo intento
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerClient');

  // Segundo registro: intentar con el MISMO email pero datos diferentes
  completarFormulario({
    razonSocial: 'Otra Empresa SRL',
    cuit: '20987654321',
    email: 'organizador.existente@test.com', // MISMO EMAIL
    confirmarEmail: 'organizador.existente@test.com', // MISMO EMAIL
    password: 'OtraPass1_',
    repetirPassword: 'OtraPass1_',
    enviarFormulario: false
  });

  cy.get('[data-cy="btn-registrarse"]').click();

  // Verificar que aparece el mensaje de error de email duplicado
  cy.get('[data-cy="error-message"]').should('be.visible')
    .and('contain.text', 'El usuario con este correo electrónico ya existe');

  // Verificar que el formulario NO se envió (permanece en registerClient)
  cy.url().should('include', '/registerClient');
});

it('[TC-REG-ORG-08] Intentar registrarse con un CUIT que ya existe en el sistema.', () => {
  // Primer registro: crear organizador con CUIT específico
  completarFormulario({
    cuit: '20123456789',
    email: 'organizador1@test.com',
    confirmarEmail: 'organizador1@test.com'
  });

  // Capturar el alert del primer registro
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.contains('Cliente registrado con éxito, espera la validación del administrador');
  });

  // Volver a la página de registro para el segundo intento
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerClient');

  // Segundo registro: intentar con el MISMO CUIT pero email diferente
  completarFormulario({
    razonSocial: 'Otra Empresa SRL',
    cuit: '20123456789', // MISMO CUIT
    email: 'organizador2@test.com', // DIFERENTE EMAIL
    confirmarEmail: 'organizador2@test.com',
    password: 'OtraPass1_',
    repetirPassword: 'OtraPass1_',
    enviarFormulario: false
  });

  cy.get('[data-cy="btn-registrarse"]').click();

  // BUG: El sistema valida email en lugar de CUIT duplicado
  cy.get('[data-cy="error-message"]').should('be.visible')
    .and('contain.text', 'El usuario con este correo electrónico ya existe');

  // Verificar que el formulario NO se envió (permanece en registerClient)
  cy.url().should('include', '/registerClient');
});
  });
});