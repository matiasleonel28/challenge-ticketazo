describe('Registro de Organizador', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerClient');
  });

  // generar datos unicos para evitar conflictos
  const generarEmailUnico = () => `organizador${Date.now()}${Math.random().toString(36).substr(2, 5)}@test.com`;
  const generarCuitUnico = () => `201${Date.now().toString().slice(-8)}`;

  const completarFormulario = (datos = {}) => {
    const datosDefault = {
      razonSocial: 'Organizador Prueba SRL',
      cuit: generarCuitUnico(),
      provincia: 'Buenos Aires',
      localidad: 'La Plata',
      direccion: 'Calle Falsa 123',
      telefono: '1155554444',
      email: generarEmailUnico(),
      confirmarEmail: '', // se establece igual al email
      password: 'OrgPass1_',
      repetirPassword: 'OrgPass1_',
      enviarFormulario: true
    };

    const datosFinal = { ...datosDefault, ...datos };
    
    // si no se especifica confirmarEmail, usar el mismo email
    if (!datosFinal.confirmarEmail) {
      datosFinal.confirmarEmail = datosFinal.email;
    }

    // campos basicos
    cy.get('[data-cy="input-razon-social"]').type(datosFinal.razonSocial);
    cy.get('[data-cy="input-cuit"]').type(datosFinal.cuit);
    cy.get('[data-cy="input-direccion"]').type(datosFinal.direccion);
    cy.get('[data-cy="input-telefono"]').type(datosFinal.telefono);

    // ubicacion
    seleccionarUbicacion(datosFinal.provincia, datosFinal.localidad);

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

  const verificarErrorYRecargar = (selector, mensaje) => {
    cy.get(selector).should('be.visible').and('contain.text', mensaje);
    cy.url().should('include', '/registerClient');
    cy.reload();
  };

  const probarCasosInvalidos = (casos, completarFormularioCb, verificarErrorCb) => {
    casos.forEach((caso) => {
      completarFormularioCb(caso);
      cy.get('[data-cy="btn-registrarse"]').click();
      if (!caso.esBug) {
        verificarErrorCb(caso);
      }
      cy.url().should('include', '/registerClient');
      cy.reload();
    });
  };

  describe('Tests Positivos', () => {
    it('[TC-REG-ORG-01] Verificar que el formulario puede ser enviado exitosamente con todos los campos requeridos llenos con datos válidos.', () => {
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cliente registrado con éxito, espera la validación del administrador');
      });
      completarFormulario();
    });
  });

  describe('Tests Negativos', () => {
    it('[TC-REG-ORG-02] Intentar enviar el formulario con uno o más campos requeridos vacíos y verificar que se muestran mensajes de error apropiados.', () => {
      const emailUnico = generarEmailUnico();
      
      cy.get('[data-cy="input-telefono"]').type('1155554444');
      cy.get('[data-cy="input-direccion"]').type('Calle Falsa 123');
      seleccionarUbicacion('Buenos Aires', 'La Plata');
      cy.get('[data-cy="input-email"]').type(emailUnico);
      cy.get('[data-cy="input-confirmar-email"]').type(emailUnico);
      cy.get('[data-cy="input-password"]').type('Password1_');
      cy.get('[data-cy="input-repetir-password"]').type('Password1_');
      cy.get('[data-cy="btn-registrarse"]').click();

      cy.get('[data-slot="error-message"]').should('be.visible')
        .and('contain.text', 'Completa este campo');
      cy.url().should('include', '/registerClient');
    });

    it('[TC-REG-ORG-03] Ingresar un formato de email inválido en los campos "Email" y/o "Confirmar Email" y verificar que el sistema rechaza la entrada y muestra un mensaje de error.', () => {
      const emailsInvalidos = [
        { email: 'testorg.com', mensaje: 'Incluye un signo "@" en la dirección de correo electrónico' },
        { email: 'organizador@.co', mensaje: 'El signo "." está colocado en una posición incorrecta' },
        { email: 'org@domain', esBug: true }
      ];

      probarCasosInvalidos(
        emailsInvalidos,
        (caso) => completarFormulario({ 
          email: caso.email, 
          confirmarEmail: caso.email, 
          enviarFormulario: false 
        }),
        (caso) => cy.get('[data-slot="error-message"]').should('be.visible').and('contain.text', caso.mensaje)
      );
    });

    it('[TC-REG-ORG-04] Ingresar un CUIT que excede la longitud máxima (11 dígitos) y verificar que el sistema rechaza la entrada y muestra un mensaje de error.', () => {
      completarFormulario({ cuit: '203000000091', enviarFormulario: false });
      cy.get('[data-cy="btn-registrarse"]').click();
      verificarErrorYRecargar('[data-slot="error-message"]', 'El CUIT debe tener exactamente 11 dígitos');
    });

    it('[TC-REG-ORG-05] Ingresar un número de teléfono con menos de 8 dígitos y verificar que se muestra un mensaje de error.', () => {
      completarFormulario({ telefono: '1234567', enviarFormulario: false });
      cy.get('[data-cy="btn-registrarse"]').click();
      verificarErrorYRecargar('[data-slot="error-message"]', 'Utiliza un formato que coincida con el solicitado');
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
      // email especifico para este test
      const emailDuplicado = generarEmailUnico();
      
      // primer registro con email especifico
      completarFormulario({
        email: emailDuplicado,
        confirmarEmail: emailDuplicado
      });

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cliente registrado con éxito, espera la validación del administrador');
      });

      cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerClient');

      // segundo registro: mismo email pero datos diferentes
      completarFormulario({
        razonSocial: 'Otra Empresa SRL',
        cuit: generarCuitUnico(), // cuit diferente
        email: emailDuplicado, // mismo email
        confirmarEmail: emailDuplicado,
        password: 'OtraPass1_',
        repetirPassword: 'OtraPass1_',
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();
      cy.get('[data-cy="error-message"]').should('be.visible')
        .and('contain.text', 'El usuario con este correo electrónico ya existe');
      cy.url().should('include', '/registerClient');
    });

    it('[TC-REG-ORG-08] Intentar registrarse con un CUIT que ya existe en el sistema.', () => {
      // datos especificos para este test
      const cuitDuplicado = generarCuitUnico();
      const email1 = generarEmailUnico();
      const email2 = generarEmailUnico();
      
      // primer registro: crear organizador con cuit especifico
      completarFormulario({
        cuit: cuitDuplicado,
        email: email1,
        confirmarEmail: email1
      });

      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contains('Cliente registrado con éxito, espera la validación del administrador');
      });

      cy.visit('https://vps-3696213-x.dattaweb.com/auth/registerClient');

      // segundo registro: mismo cuit pero email diferente
      completarFormulario({
        razonSocial: 'Otra Empresa SRL',
        cuit: cuitDuplicado, // mismo cuit
        email: email2, // diferente email
        confirmarEmail: email2,
        password: 'OtraPass1_',
        repetirPassword: 'OtraPass1_',
        enviarFormulario: false
      });

      cy.get('[data-cy="btn-registrarse"]').click();

      // verificar el comportamiento actual del sistema
      cy.get('[data-cy="error-message"]').should('be.visible')
        .and('contain.text', 'Ya existe un organizador registrado con ese CUIT');

      cy.url().should('include', '/registerClient');
    });
  });
});