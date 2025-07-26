# Challenge — Ticketazo | Cypress E2E Automation

Proyecto: Automatización de Pruebas Funcionales con Cypress

Automatización de pruebas del sistema Ticketazo, realizado por el equipo como parte del Challenge final. Se abordan flujos críticos de los perfiles Usuario, Organizador y Administrador, mediante pruebas E2E y buenas prácticas.

## Equipo

Matías Gómez — Organizador (Mis eventos, perfil público)

Pablo Pena Heredia — Login y registro

[Nombre 3] — Administrador (eventos)

[Nombre 4] — Usuario (compra entradas)

Responsable de la entrega: 

# Enlaces importantes

Repositorio GitHub: https://github.com/matiasleonel28/challenge-ticketazo

Plan de pruebas: https://app.clickup.com/90131537395/v/b/6-901317031051-2

Tablero Trello: https://app.clickup.com/90131537395/v/l/li/901317032082?pr=90138845377

Entorno QA utilizado: https://vps-3696213-x.dattaweb.com

1. Introducción

Este documento establece la estrategia y el enfoque para la automatización de pruebas del proyecto Ticketazo. El objetivo es validar de forma sistemática las funcionalidades clave de la plataforma, asegurando la calidad de los flujos críticos para Compradores y Organizadores mediante Cypress + JavaScript.

2. Alcance del Proyecto

Dentro del Alcance:

Automatización UI de flujos funcionales.

Validación de flujo completo del Comprador.

Validación de flujo completo del Organizador.

Pruebas responsivas con cy.viewport().

Ejecución en navegadores: Chrome, Firefox y Edge.

Fuera del Alcance:

Pruebas API directas (solo a través de la UI).

Pruebas de carga o rendimiento.

Validación en base de datos.

3. Funcionalidades cubiertas (por rol)

Funcionalidades comunes

Cambio y persistencia de tema (claro/oscuro).

Comprador

Visualización de eventos públicos sin login.

Filtros: título, fecha, categoría, cercanía, etc.

Registro, login (validaciones y errores).

Compra: asientos, medios de pago, QR, "Entrada Gratis".

Visualización y gestión de entradas.

Logout funcional.

Organizador

Registro con campos obligatorios.

Creación de eventos con todos los pasos.

Edición de perfil y redes.

Gestión de usuarios autorizados y permisos.

Sección "Mis Eventos": listado, búsqueda, botón compartir.

Vista pública del perfil y eventos activos.

4. Estrategia de Pruebas

Framework: Cypress

Lenguaje: JavaScript

Técnicas: Partición de equivalencia, valores límite, error guessing.

Tipos:

Pruebas funcionales automatizadas

Pruebas de regresión (con smoke test)

Cross-browser

Responsivas con cy.viewport()

Exploratorias manuales (no automatizables)

5. Criterios de Aceptación

100% de los tests automatizados deben pasar.

Flujos de compra y creación de eventos sin errores críticos.

Todos los defectos Críticos o Altos reportados.

Clasificación de Severidad

Severidad

Descripción

Acción

Crítica

Falla que impide el uso del flujo

Corrección inmediata

Alta

Falla funcional sin bloqueo total

Corrección prioritaria

Media

Falla que afecta experiencia

Corrección en siguiente iteración

Baja

Visual, texto, inconsistencias menores

Corrección opcional

6. Reporte de Defectos

Herramienta: Trello (o ClickUp en gestión interna)

Cada tarjeta contiene:

ID Defecto

TC relacionado

Título

Precondiciones

Pasos detallados

Resultado esperado / actual

Ambiente (navegador, resolución)

Evidencia (video o screenshot Cypress)

7. Cypress - Estructura y Ejecución

Estructura de carpetas

cypress/
├── e2e/
│   ├── login/
│   ├── usuario/
│   ├── organizador/
│   │   └── mis-eventos/
│   │       ├── TC-ORG-04-01-ver-listado.cy.js
│   │       ├── TC-ORG-04-02-filtrar-eventos.cy.js
│   │       └── ...
│   └── admin/
├── support/
│   └── commands.js
├── fixtures/
│   └── users.json
.gitignore
package.json
README.md

## Instalación y ejecución

git clone https://github.com/usuario/challenge-ticketazo.git
cd challenge-ticketazo
npm install
npx cypress open # o npx cypress run

Comandos custom

cy.loginAsOrganizador()

cy.viewport(1280,720)

Uso de data-cy para selectores estables

8. Datos de prueba

Organizador:

Email: 3ypsmhh8c5@zudpck.com

Contraseña: Aa123456@

Eventos: MegaTest, ModernEvent

Organizador sin eventos:

Email: firduvufyi@necub.com

Contraseña: Aa123456@

9. Validación de Entorno

QA: https://vps-3696213-x.dattaweb.com (usado por defecto)

Producción: https://ticketazo.com.ar (misma data)

10. Checklist de entrega

