# Challenge — Ticketazo | Cypress E2E Automation

## Descripción general del proyecto

Este repositorio contiene la automatización de pruebas funcionales de la plataforma Ticketazo, utilizando Cypress y JavaScript. Se cubren flujos críticos de los perfiles Usuario, Organizador y Administrador mediante pruebas E2E estructuradas.

## Equipo

| Nombre                | Rol asignado                             |
|-----------------------|-------------------------------------------|
| Matías Gómez          | Organizador – Mis eventos, perfil público |
| Pablo Pena Heredia    | Login y Registro                          |
| [Nombre 3]            | Administrador – Gestión de eventos        |
| [Nombre 4]            | Usuario – Compra de entradas              |

Responsable de la entrega: [Completar]

## Enlaces de referencia

- **Repositorio GitHub:** https://github.com/matiasleonel28/challenge-ticketazo  
- **Plan de Pruebas (ClickUp):** https://app.clickup.com/90131537395/v/b/6-901317031051-2  
- **Tablero de Defectos:** https://app.clickup.com/90131537395/v/l/li/901317032082?pr=90138845377  
- **Entorno QA:** https://vps-3696213-x.dattaweb.com

## Alcance

### Incluido
- Pruebas E2E automatizadas desde la UI
- Validación completa de flujo del Comprador
- Validación completa de flujo del Organizador
- Pruebas responsivas (`cy.viewport`)
- Ejecución en Chrome, Firefox y Edge

### Excluido
- Pruebas directas a API (solo interfaz)
- Pruebas de carga o estrés
- Validaciones en base de datos

## Funcionalidades cubiertas

### Funcionalidades comunes
- Cambio y persistencia de tema (claro/oscuro)

### Comprador
- Visualización de eventos sin login
- Filtros (título, fecha, categoría, cercanía)
- Registro y login con validaciones
- Compra de entradas (asientos, pago, QR, gratuitas)
- Gestión y visualización de entradas
- Logout

### Organizador
- Registro con campos obligatorios
- Creación de eventos
- Edición de perfil/redes
- Gestión de usuarios autorizados
- Vista y búsqueda en “Mis eventos”
- Perfil público con eventos activos

### Administrador
- Gestión de eventos (parcial)

## Estrategia de pruebas

- Framework: Cypress  
- Lenguaje: JavaScript  
- Técnicas: partición de clases, valores límite, error guessing  
- Tipos de prueba: funcionales E2E, regresión (smoke), cross-browser, responsivas, exploratorias manuales

## Criterios de aceptación

- Todos los tests deben pasar sin errores
- Flujos críticos deben completarse sin bloqueos
- Todos los bugs críticos y altos deben estar reportados

## Severidades

| Severidad | Descripción                            | Acción esperada            |
|-----------|----------------------------------------|----------------------------|
| Crítica   | Interrumpe el uso del sistema          | Corrección inmediata       |
| Alta      | Falla funcional relevante              | Corrección prioritaria     |
| Media     | Afecta la experiencia sin bloquear     | Corrección en iteración    |
| Baja      | Inconsistencias visuales o menores     | Corrección opcional        |

## Reporte de defectos

- Herramienta: ClickUp  
- Cada tarjeta incluye:
  - ID y título del defecto
  - Test case relacionado
  - Precondiciones y pasos
  - Resultado esperado / actual
  - Ambiente (navegador, resolución)
  - Evidencia (screenshot o video de Cypress)

## Estructura del proyecto
cypress/
├── e2e/
│ ├── login/
│ ├── usuario/
│ ├── organizador/
│ │ └── mis-eventos/
│ │ ├── TC-ORG-04-01-ver-listado.cy.js
│ │ ├── TC-ORG-04-02-filtrar-eventos.cy.js
│ └── admin/
├── support/
│ └── commands.js
├── fixtures/
│ └── users.json
.gitignore
package.json
README.md


## Instalación y ejecución

```bash
git clone https://github.com/matiasleonel28/challenge-ticketazo.git
cd challenge-ticketazo
npm install
npx cypress open       # modo interactivo




