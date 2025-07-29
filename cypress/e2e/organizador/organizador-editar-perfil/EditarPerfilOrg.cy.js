// challenge-ticketazo/cypress/e2e/organizador/organizador-editar-perfil/EditarPerfilOrg.cy.test.js

import 'cypress-file-upload';

describe('Edición de Perfil de Organizador', () => {
    beforeEach(() => {

              cy.loginAsOrganizador();
              cy.get('a[href="/editProfile"]').click({force: true});

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

   

    it('Debe permitir cambiar la imagen de perfil (positivo)', () => {
        const imagePath = 'images/profile.jpg'; // Debe existir en fixtures
        // Importa el comando en el archivo de soporte, normalmente en cypress/support/commands.js:
        // import 'cypress-file-upload';
        // Asegúrate de que el input sea de tipo "file" y que el plugin esté instalado
        cy.get('input[type="file"]').attachFile(imagePath);
        cy.contains('Guardar Cambios').click();
        cy.contains('Perfil actualizado').should('exist');
    });

    it('Debe mostrar el placeholder "Ej:11 1234-5678" si el campo de teléfono está vacío', () => {
        cy.get('input[aria-label="Teléfono"]').clear().blur();
        cy.get('input[aria-label="Teléfono"]').should('have.attr', 'placeholder', 'Ej:11 1234-5678');
    });

    it('Debe permitir dejar campos de redes sociales vacíos (positivo)', () => {
        cy.get('input[aria-label="LinkedIn"]').clear();
        cy.get('input[aria-label="Twitter"]').clear();
        cy.get('input[aria-label="Instagram"]').clear();
        cy.get('input[aria-label="TikTok"]').clear();
        cy.contains('Guardar Cambios').click();
        cy.contains('Perfil actualizado').should('exist');
    });

    it('Debe mostrar el placeholder "Ej: Juan Pérez" si el campo de nombre de usuario está vacío', () => {
        cy.get('input[aria-label="Nombre"]').first().clear().blur();
        cy.get('input[aria-label="Nombre"]').first().should('have.attr', 'placeholder', 'Ej: Juan Pérez');
    });

   
});