import 'cypress-file-upload';

describe('Edición de Perfil de Organizador', () => {
    beforeEach(() => {
        cy.loginAsOrganizador();
        cy.get('a[href="/editProfile"]').click({force: true});
    });

    describe('Tests Positivos', () => {
        it('TC-3.1 Verificar que todos los campos del perfil sean mostrados', () => {
            cy.get('input[aria-label="Nombre"]').should('exist');
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

        it('TC-3.2 Verificar que l0S campos del  perfil se haya editado exitosamente (positivo)', () => {
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

        it('TC-3.3 Verificar que la imagen de perfil se pueda cambiar (positivo)', () => {
            const imagePath = 'images/profile.jpg';
            cy.get('input[type="file"]').attachFile(imagePath);
            cy.contains('Guardar Cambios').click();
            cy.contains('Perfil actualizado').should('exist');
        });

        it('TC-3.4 Verificar que los campos de redes sociales sean vacíos (positivo)', () => {
            cy.get('input[aria-label="LinkedIn"]').clear();
            cy.get('input[aria-label="Twitter"]').clear();
            cy.get('input[aria-label="Instagram"]').clear();
            cy.get('input[aria-label="TikTok"]').clear();
            cy.contains('Guardar Cambios').click();
            cy.contains('Perfil actualizado').should('exist');
        });
    });

    describe('Tests Negativos', () => {
        it('TC-3.5 verificar que  el placeholder sea "Ej:11 1234-5678" si el campo de teléfono está vacío', () => {
            cy.get('input[aria-label="Teléfono"]').clear().blur();
            cy.get('input[aria-label="Teléfono"]').should('have.attr', 'placeholder', 'Ej:11 1234-5678');
        });

        it('TC-3.6 Verificar que el placeholder sea "Ej: Juan Pérez" si el campo de nombre de usuario está vacío', () => {
            cy.get('input[aria-label="Nombre"]').first().clear().blur();
            cy.get('input[aria-label="Nombre"]').first().should('have.attr', 'placeholder', 'Ej: Juan Pérez');
        });
    });
});
