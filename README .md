# Challenge — Ticketazo | Cypress E2E Automation

## Objetivo

Automatizar casos funcionales críticos de la plataforma Ticketazo utilizando Cypress, aplicando buenas prácticas de testing E2E, manejo de datos de prueba, uso de fixtures y reporte de defectos.

## Equipo

| Nombre                | Rol asignado                                                            |
|-----------------------|-------------------------------------------------------------------------|
| Matías Gómez          | Organizador – Mis eventos, perfil público. Recuperar contraseña (página)|
| Pablo Pena Heredia    | Login y Registro                                                        |
| Anghela Anzaldo       | Organizador - Editar perfil                                             |
| Antonella Masini      | Usuario – Compra de entradas, filtrado de eventos, logout               |
| Nazarena Salvatierra  | Organizador – Creación de eventos                                       |



## Enlaces de referencia

- **Repositorio GitHub:** https://github.com/matiasleonel28/challenge-ticketazo  
- **ClickUp (Features y Tablero de reporte de Defectos):** https://app.clickup.com/90131537395/v/b/s/90138845377
- **Entorno QA:** https://vps-3696213-x.dattaweb.com
- **Plan de pruebas:** https://docs.google.com/document/d/1kGRl5AZ7CG2QANxAKysOkiuTMG4VeEVfxguR2GSBglw/edit?usp=sharing


## Estructura del proyecto

```
cypress/
├── e2e/
│   ├── admin/
│   ├── auth/
│   ├── organizador/
│   ├── recuperar-contraseña/
│   └── usuario/
├── fixtures/
│   └── authData.json
├── screenshots/
├── support/
│   └── commands.js
.gitignore
cypress.config.js
package.json
package-lock.json
README.md
```

## Instalación y ejecución

```bash
git clone https://github.com/matiasleonel28/challenge-ticketazo.git
cd challenge-ticketazo
npm install
npx cypress open       # modo interactivo
```

## Comandos custom

- `cy.loginAsOrganizador()`
- `cy.viewport(1280, 720)`
- Uso de atributos `data-cy` como selectores estables



