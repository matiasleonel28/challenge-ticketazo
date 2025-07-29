// challenge-ticketazo/cypress/e2e/organizador/organizador-editar-perfil/EditarPerfilOrg.cy.test.js

describe('Edición de Perfil de Organizador', () => {
    beforeEach(() => {

              cy.loginAsOrganizador();
              cy.get('a[href="/editProfile"]').click({force: true});

        // Reemplaza estos valores con las credenciales reales del organizador
       // cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');
       // cy.get('input[name="email"]').type('organizador@email.com');
       // cy.get('input[name="password"]').type('Aa123456@');
       // cy.get('button[type="submit"]').click();
       // cy.url().should('include', '/dashboard');
       // cy.visit('/organizador/perfil');
    });

    it('Debe mostrar todos los campos del perfil', () => {
        //cy.contains('Perfil del Establecimiento');
        //cy.contains('Editar Perfil').click();
      
        cy.get('input[aria-label="Nombre"]').should('exist');
       // cy.get('input[name="nombre"]').should('exist');
        cy.get('input[aria-label="Nombre de usuario"]').should('exist');
        cy.get('input[aria-label="Teléfono"]').should('exist');
        cy.get('input[aria-label="Domicilio"]').should('exist');
        cy.get('input[aria-label="Email"]').should('exist');
        cy.get('input[aria-label="CUIT"]').should('exist');
        cy.get('input[aria-label="Provincia"]').should('exist');
        cy.get('input[aria-label="Localidad"]').should('exist');
        cy.get('input[aria-label="LinkedIn"]').should('exist');
        cy.get('input[aria-label="Twitter"]').should('exist');
        cy.get('input[aria-label="Instagram"]').should('exist');
        cy.get('input[aria-label="TikTok"]').should('exist');
        cy.contains('Guardar Cambios');
    });

    it('Debe editar el perfil exitosamente (positivo)', () => {
       // cy.get('.user-profile-editor input[aria-label="Nombre"]').clear().type('Test edited');

       
        cy.get('input[placeholder="Ej: juanperez123"]').clear().type('juanperez123');       
        cy.get('input[aria-label="Nombre de usuario"]').clear().type('OrgQA2024');
        cy.get('input[aria-label="Teléfono"]').clear().type('54911112222');
      
        cy.get('input[aria-label="LinkedIn"]').clear().type('https://linkedin.com/in/orgqa');
        cy.get('input[aria-label="Twitter"]').clear().type('https://twitter.com/orgqa');
        cy.get('input[aria-label="Instagram"]').clear().type('https://instagram.com/orgqa');
        cy.get('input[aria-label="TikTok"]').clear().type('https://tiktok.com/@orgqa');
        cy.contains('Guardar Cambios').click();
        cy.contains('Perfil actualizado').should('exist');
    });

    it('No debe permitir email inválido (negativo)', () => {
        cy.get('input[name="email"]').clear().type('correo-invalido');
        cy.contains('Guardar Cambios').click();
        cy.contains('Email inválido').should('exist');
    });

    it('No debe permitir CUIT inválido (negativo)', () => {
        cy.get('input[name="cuit"]').clear().type('abc123');
        cy.contains('Guardar Cambios').click();
        cy.contains('CUIT inválido').should('exist');
    });

    it('No debe permitir campos obligatorios vacíos (negativo)', () => {
        cy.get('input[name="nombre"]').clear();
        cy.get('input[name="nombreUsuario"]').clear();
        cy.contains('Guardar Cambios').click();
        cy.contains('Campo obligatorio').should('exist');
    });

    it('Debe permitir cambiar la imagen de perfil (positivo)', () => {
        const imagePath = 'images/profile.jpg'; // Debe existir en fixtures
        cy.get('input[type="file"]').attachFile(imagePath);
        cy.contains('Guardar Cambios').click();
        cy.contains('Perfil actualizado').should('exist');
    });

    it('No debe permitir teléfono con letras (negativo)', () => {
        cy.get('input[name="telefono"]').clear().type('54abc98882');
        cy.contains('Guardar Cambios').click();
        cy.contains('Teléfono inválido').should('exist');
    });

    it('Debe permitir dejar campos de redes sociales vacíos (positivo)', () => {
        cy.get('input[name="linkedin"]').clear();
        cy.get('input[name="twitter"]').clear();
        cy.get('input[name="instagram"]').clear();
        cy.get('input[name="tiktok"]').clear();
        cy.contains('Guardar Cambios').click();
        cy.contains('Perfil actualizado').should('exist');
    });

    it('No debe permitir nombre de usuario con espacios (negativo)', () => {
        cy.get('input[name="nombreUsuario"]').clear().type('usuario con espacio');
        cy.contains('Guardar Cambios').click();
        cy.contains('Nombre de usuario inválido').should('exist');
    });

    it('Debe mostrar mensaje de error si la provincia no está seleccionada (negativo)', () => {
        cy.get('input[name="provincia"]').select('');
        cy.contains('Guardar Cambios').click();
        cy.contains('Provincia obligatoria').should('exist');
    });
});