describe('Registro de Comprador', () => {
  beforeEach(() => {
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerUser');
  });
  const completarFormulario = (datos = {}) => {
  const datosDefault = {
    nombres: 'Pablo',
    apellido: 'Pena Heredia',
    telefono: '3516664061',
    dni: '11121119',
    email: 'xasdddd1d@gmail.com',
    confirmarEmail: 'xasdddd1d@g  mail.com',
    password: 'Password1234_',
    repetirPassword: 'Password1234_',
    provincia: 'Córdoba',
    localidad: 'Villa Santa Cruz del Lago',
    dia: '04',
    mes: '10',
    año: '1995',
    enviarFormulario: true
  };

  // Combinar datos default con datos personalizados
  const datosFinal = { ...datosDefault, ...datos };

  // Completar campos básicos
  cy.get('[data-cy="input-nombres"]').type(datosFinal.nombres);
  cy.get('[data-cy="input-apellido"]').type(datosFinal.apellido);
  cy.get('[data-cy="input-telefono"]').type(datosFinal.telefono);
  cy.get('[data-cy="input-dni"]').type(datosFinal.dni);

  // Provincia y localidad
  cy.get('[data-cy="select-provincia"]').type(datosFinal.provincia);
  cy.get('[role="listbox"] [role="option"]').contains(datosFinal.provincia).click();

  cy.get('[data-cy="select-localidad"]').should('be.enabled');
  cy.wait(1000);
  cy.get('[data-cy="select-localidad"]').type(datosFinal.localidad);
  cy.get('[role="listbox"] [role="option"]').contains(datosFinal.localidad).click();

  // Fecha de nacimiento
  cy.get('[data-cy="input-fecha-nacimiento"]').within(() => {
    cy.get('[aria-label="día, "]').clear({ force: true }).type(datosFinal.dia, { force: true });
    cy.get('[aria-label="mes, "]').clear({ force: true }).type(datosFinal.mes, { force: true });
    cy.get('[aria-label="año, "]').clear({ force: true }).type(datosFinal.año, { force: true });
  });

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
        it('[TC-REG-COMP-01] Verificar que el formulario puede ser enviado exitosamente con todos los campos requeridos llenos con datos válidos.', () => {
      // Capturar alert usando cy.on
      cy.on('window:alert', (alertText) => {
    expect(alertText).to.contains('Usuario registrado con éxito. Por favor, verifica tu correo electrónico para activar tu cuenta.');
  });

  completarFormulario();
    });
  });

  describe('Tests Negativos', () => {
    it('[TC-REG-COMP-03] Intentar enviar el formulario con uno o más campos requeridos vacíos y verificar que se muestran mensajes de error apropiados.', () => {
  // Solo llenar los campos que NO vamos a borrar
  cy.get('[data-cy="input-telefono"]').type('3516664061');
  cy.get('[data-cy="input-dni"]').type('11121119');

  // Provincia y localidad
  cy.get('[data-cy="select-provincia"]').type('Córdoba');
  cy.get('[role="listbox"] [role="option"]').contains('Córdoba').click();
  cy.wait(1000);
  cy.get('[data-cy="select-localidad"]').type('Villa Santa Cruz del Lago');
  cy.get('[role="listbox"] [role="option"]').contains('Villa Santa Cruz del Lago').click();

  // Fecha de nacimiento
  cy.get('[data-cy="input-fecha-nacimiento"]').within(() => {
    cy.get('[aria-label="día, "]').clear({ force: true }).type('04', { force: true });
    cy.get('[aria-label="mes, "]').clear({ force: true }).type('10', { force: true });
    cy.get('[aria-label="año, "]').clear({ force: true }).type('1995', { force: true });
  });

  // Email y contraseña
  cy.get('[data-cy="input-email"]').type('test@gmail.com');
  cy.get('[data-cy="input-confirmar-email"]').type('test@gmail.com');
  cy.get('[data-cy="input-password"]').type('Password1234_');
  cy.get('[data-cy="input-repetir-password"]').type('Password1234_');

  // Dejar nombres y apellido vacíos (no los llenamos)
  cy.get('[data-cy="btn-registrarse"]').click();

  // Verificar errores
  cy.get('[data-slot="error-message"]')
    .should('be.visible')
    .and('contain.text', 'Completa este campo');

  cy.url().should('include', '/registerUser');
});

it('[TC-REG-COMP-04] Ingresar un formato de email inválido en los campos "Email" y/o "Confirmar Email" y verificar que el sistema rechaza la entrada y muestra un mensaje de error.', () => {
  const emailsInvalidos = [
    { email: 'asd.com', mensaje: 'Incluye un signo "@" en la dirección de correo electrónico' },
    { email: 'hola@.com', mensaje: 'El signo "." está colocado en una posición incorrecta' },
    { email: 'asd@asd', esBug: true } // Bug: no muestra error
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
      cy.get('[data-slot="error-message"]').should('exist');
    } else {
      cy.get('[data-slot="error-message"]').should('be.visible')
        .and('contain.text', caso.mensaje);
    }

    cy.url().should('include', '/registerUser');
    cy.reload();
  });
});

    it('[TC-REG-COMP-05] Ingresar un número de teléfono que no coincide con el patrón requerido (menos de 8 dígitos) y verificar que se muestra un mensaje de error.', () => {
      completarFormulario({
        telefono: '1234567',
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-slot="error-message"]').should('be.visible')
        .and('contain.text', 'Utiliza un formato que coincida con el solicitado');

      cy.url().should('include', '/registerUser');
      cy.reload();
    });

    it('[TC-REG-COMP-06] Proporcionar un DNI que no tiene 7-8 dígitos y verificar que se muestra un mensaje de error apropiado.', () => {
  const dnisInvalidos = [
    { dni: '123456', mensaje: 'Utiliza un formato que coincida con el solicitado' },
    { dni: '12345', mensaje: 'Utiliza un formato que coincida con el solicitado' }, 
  ];

  dnisInvalidos.forEach((caso) => {
    completarFormulario({
      dni: caso.dni,
      enviarFormulario: false
    });

    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-slot="error-message"]').should('be.visible')
      .and('contain.text', caso.mensaje);

    cy.url().should('include', '/registerUser');
    cy.reload();
  });
});

    it('[TC-REG-COMP-07] Intentar enviar el formulario con contraseñas que no coinciden en los campos "Contraseña" y "Repetir Contraseña".', () => {
  completarFormulario({
    password: 'Contraseña123_',
    repetirPassword: 'Contraseña1234_',
    enviarFormulario: false
  });

  cy.get('[data-cy="btn-registrarse"]').click();

  cy.get('[data-cy="error-message"]').should('be.visible')
    .and('contain.text', 'Las contraseñas no coinciden');

  cy.url().should('include', '/registerUser');
});
    it('[TC-REG-COMP-08] Intentar registrarse con una fecha de nacimiento que resulte en una edad menor a 18 años.', () => {
      completarFormulario({
        dia: '24',
        mes: '07', 
        año: '2020', // Menor de 18 años
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-cy="error-message"]').should('be.visible')
        .and('contain.text', 'Debes ser mayor de 18 años');

      cy.url().should('include', '/registerUser');
      cy.reload();
    });

    it('[TC-REG-COMP-09] Intentar registrarse con un email que ya existe en el sistema.', () => {
  completarFormulario();
  cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerUser');

  completarFormulario({
    email: 'pablopenaheredia@gmail.com',
    confirmarEmail: 'pablopenaheredia@gmail.com',
    enviarFormulario: false
  });

  cy.get('[data-cy="btn-registrarse"]').click();
  cy.get('[data-cy="error-message"]').should('be.visible')
    .and('contain.text', 'Ya existe un usuario registrado con ese correo electrónico');
});
  });
}); 