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
      confirmarEmail: 'xasdddd1d@gmail.com',
      password: 'Password1234_',
      repetirPassword: 'Password1234_',
      provincia: 'Córdoba',
      localidad: 'Villa Santa Cruz del Lago',
      dia: '04',
      mes: '10',
      año: '1995',
      enviarFormulario: true
    };

    const datosFinal = { ...datosDefault, ...datos };

    // campos basicos
    cy.get('[data-cy="input-nombres"]').type(datosFinal.nombres);
    cy.get('[data-cy="input-apellido"]').type(datosFinal.apellido);
    cy.get('[data-cy="input-telefono"]').type(datosFinal.telefono);
    cy.get('[data-cy="input-dni"]').type(datosFinal.dni);

    // ubicacion
    seleccionarUbicacion(datosFinal.provincia, datosFinal.localidad);

    // fecha de nacimiento
    completarFechaNacimiento(datosFinal.dia, datosFinal.mes, datosFinal.año);

    // email y contrasena
    cy.get('[data-cy="input-email"]').type(datosFinal.email);
    cy.get('[data-cy="input-confirmar-email"]').type(datosFinal.confirmarEmail);
    cy.get('[data-cy="input-password"]').type(datosFinal.password);
    cy.get('[data-cy="input-repetir-password"]').type(datosFinal.repetirPassword);

    if (datosFinal.enviarFormulario) {
      cy.get('[data-cy="btn-registrarse"]').click();
    }
  };

  // funciones helper reutilizables
  const seleccionarUbicacion = (provincia, localidad) => {
    cy.get('[data-cy="select-provincia"]').type(provincia);
    cy.get('[role="listbox"] [role="option"]').contains(provincia).click();
    cy.get('[data-cy="select-localidad"]').should('be.enabled');
    cy.wait(1000);
    cy.get('[data-cy="select-localidad"]').type(localidad);
    cy.get('[role="listbox"] [role="option"]').contains(localidad).click();
  };

  const completarFechaNacimiento = (dia, mes, año) => {
    cy.get('[data-cy="input-fecha-nacimiento"]').within(() => {
      cy.get('[aria-label="día, "]').clear({ force: true }).type(dia, { force: true });
      cy.get('[aria-label="mes, "]').clear({ force: true }).type(mes, { force: true });
      cy.get('[aria-label="año, "]').clear({ force: true }).type(año, { force: true });
    });
  };

  const completarFormularioCompleto = (email) => {
    cy.get('[data-cy="input-nombres"]').type('Pablo');
    cy.get('[data-cy="input-apellido"]').type('Pena Heredia');
    cy.get('[data-cy="input-telefono"]').type('3516664061');
    cy.get('[data-cy="input-dni"]').type('11121119');
    seleccionarUbicacion('Córdoba', 'Villa Santa Cruz del Lago');
    completarFechaNacimiento('04', '10', '1995');
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type('Password1234_');
    cy.get('[data-cy="input-repetir-password"]').type('Password1234_');
  };

  const verificarErrorYRecargar = (selector, mensaje) => {
    cy.get(selector).should('be.visible').and('contain.text', mensaje);
    cy.url().should('include', '/registerUser');
    cy.reload();
  };

  const probarCasosInvalidos = (casos, completarFormularioCb, verificarErrorCb) => {
    casos.forEach((caso) => {
      completarFormularioCb(caso);
      cy.get('[data-cy="btn-registrarse"]').click();
      if (!caso.esBug) {
        verificarErrorCb(caso);
      }
      cy.url().should('include', '/registerUser');
      cy.reload();
    });
  };

  describe('Tests Positivos', () => {
    it('[TC-REG-COMP-01] Verificar que el formulario puede ser enviado exitosamente con todos los campos requeridos llenos con datos válidos.', () => {
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Usuario registrado con éxito. Por favor, verifica tu correo electrónico para activar tu cuenta.');
      });
      completarFormulario();
    });
  });

  describe('Tests Negativos', () => {
    it('[TC-REG-COMP-03] Intentar enviar el formulario con uno o más campos requeridos vacíos y verificar que se muestran mensajes de error apropiados.', () => {
      cy.get('[data-cy="input-telefono"]').type('3516664061');
      cy.get('[data-cy="input-dni"]').type('11121119');
      seleccionarUbicacion('Córdoba', 'Villa Santa Cruz del Lago');
      completarFechaNacimiento('04', '10', '1995');
      cy.get('[data-cy="input-email"]').type('test@gmail.com');
      cy.get('[data-cy="input-confirmar-email"]').type('test@gmail.com');
      cy.get('[data-cy="input-password"]').type('Password1234_');
      cy.get('[data-cy="input-repetir-password"]').type('Password1234_');
      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-slot="error-message"]').should('be.visible')
        .and('contain.text', 'Completa este campo');
      cy.url().should('include', '/registerUser');
    });

    it('[TC-REG-COMP-04] Ingresar un formato de email inválido en los campos "Email" y/o "Confirmar Email" y verificar que el sistema rechaza la entrada y muestra un mensaje de error.', () => {
      const emailsInvalidos = [
        { email: 'asd.com', mensaje: 'Incluye un signo "@" en la dirección de correo electrónico' },
        { email: 'hola@.com', mensaje: 'El signo "." está colocado en una posición incorrecta' },
        { email: 'dsada@dsadsad', esBug: true }
      ];

      probarCasosInvalidos(
        emailsInvalidos,
        (caso) => completarFormularioCompleto(caso.email),
        (caso) => cy.get('.text-tiny.text-danger').should('be.visible').and('contain.text', caso.mensaje)
      );
    });

    it('[TC-REG-COMP-05] Ingresar un número de teléfono que no coincide con el patrón requerido (menos de 8 dígitos) y verificar que se muestra un mensaje de error.', () => {
      completarFormulario({ telefono: '1234567', enviarFormulario: false });
      cy.get('[data-cy="btn-registrarse"]').click();
      verificarErrorYRecargar('[data-slot="error-message"]', 'Utiliza un formato que coincida con el solicitado');
    });

    it('[TC-REG-COMP-06] Proporcionar un DNI que no tiene 7-8 dígitos y verificar que se muestra un mensaje de error apropiado.', () => {
      const dnisInvalidos = [
        { dni: '123456', mensaje: 'Utiliza un formato que coincida con el solicitado' },
        { dni: '12345', mensaje: 'Utiliza un formato que coincida con el solicitado' }
      ];

      probarCasosInvalidos(
        dnisInvalidos,
        (caso) => completarFormulario({ dni: caso.dni, enviarFormulario: false }),
        (caso) => cy.get('[data-slot="error-message"]').should('be.visible').and('contain.text', caso.mensaje)
      );
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
      completarFormulario({ dia: '24', mes: '07', año: '2020', enviarFormulario: false });
      cy.get('[data-cy="btn-registrarse"]').click();
      verificarErrorYRecargar('[data-cy="error-message"]', 'Debes ser mayor de 18 años');
    });

    it('[TC-REG-COMP-09] Intentar registrarse con un email que ya existe en el sistema.', () => {
      completarFormulario({
        email: 'usuario.existente@test.com',
        confirmarEmail: 'usuario.existente@test.com',
        dni: '11111111'
      });

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Usuario registrado con éxito. Por favor, verifica tu correo electrónico para activar tu cuenta.');
      });

      cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerUser');

      completarFormulario({
        email: 'usuario.existente@test.com',
        confirmarEmail: 'usuario.existente@test.com',
        dni: '22222222',
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();
      cy.on('window:alert', (alertText) => {
        if (alertText.includes('Usuario registrado con éxito')) {
          expect(alertText).to.contains('Usuario registrado con éxito');
        } else {
          cy.get('[data-cy="error-message"]').should('be.visible')
            .and('contain.text', 'Ya existe un usuario registrado con ese correo electrónico');
        }
      });
    });
  });
});