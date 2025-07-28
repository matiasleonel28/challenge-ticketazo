Challenge — Ticketazo | Cypress E2E Automation
Proyecto: Automatización de pruebas funcionales con Cypress

Descripción general del proyecto
Este documento establece la estrategia de automatización para el sistema Ticketazo. El objetivo es validar las funcionalidades centrales de los perfiles Comprador, Organizador y Administrador mediante pruebas automatizadas E2E con Cypress, garantizando la estabilidad funcional del sistema en sus flujos críticos.

Equipo
Nombre	Rol asignado
Matías Gómez	Organizador – Mis eventos, perfil público, Recuperar contraseña (Pantalla)
Pablo Pena Heredia	Login y Registro
[Nombre 3]	Administrador – Gestión de eventos
[Nombre 4]	Usuario – Compra de entradas

Responsable de la entrega: [Completar]

Enlaces de referencia
Repositorio GitHub: https://github.com/matiasleonel28/challenge-ticketazo

Plan de pruebas (ClickUp): https://app.clickup.com/90131537395/v/b/6-901317031051-2

Tablero de defectos: https://app.clickup.com/90131537395/v/l/li/901317032082?pr=90138845377

Entorno QA utilizado: https://vps-3696213-x.dattaweb.com

Alcance
Incluido:

Pruebas E2E automatizadas de interfaz

Validación completa de flujo del Comprador

Validación completa de flujo del Organizador

Pruebas responsivas con cy.viewport()

Ejecución cross-browser (Chrome, Firefox, Edge)

Excluido:

Pruebas directas a API (solo vía interfaz)

Pruebas de rendimiento o carga

Validaciones en base de datos

Funcionalidades cubiertas
Comunes:

Cambio de tema claro/oscuro y su persistencia

Comprador:

Navegación sin login y visualización de eventos públicos

Filtros por título, fecha, categoría, cercanía

Registro y login con validaciones

Compra de entradas (asientos, medios de pago, QR, entradas gratuitas)

Visualización de entradas adquiridas

Logout

Organizador:

Registro con campos obligatorios

Creación y edición de eventos

Edición de perfil y redes sociales

Gestión de usuarios autorizados

Vista y gestión de la sección "Mis eventos"

Vista pública del perfil con eventos activos

Administrador:

Gestión de eventos (parcial, en progreso)

Estrategia de pruebas
Framework: Cypress

Lenguaje: JavaScript

Técnicas: partición de clases, valores límite, error guessing

Tipos de prueba:

Funcionales E2E

Regresión (smoke)

Cross-browser

Responsivas con cy.viewport()

Exploratorias (manuales)

Criterios de aceptación
Todos los tests automatizados deben ejecutarse sin errores

Los flujos críticos deben completarse sin fallas

Todos los defectos críticos y altos deben estar reportados

Severidades
Severidad	Descripción	Acción esperada
Crítica	Interrumpe el flujo principal	Corrección inmediata
Alta	Falla funcional relevante	Corrección prioritaria
Media	Afecta experiencia sin bloquear	Corrección en próxima iteración
Baja	Estética, textos o detalles menores	Corrección opcional

Reporte de defectos
Herramienta: ClickUp (uso interno)

Cada defecto contiene:

ID y título

Test case relacionado

Precondiciones y pasos

Resultado esperado vs actual

Navegador y resolución

Evidencia (screenshot o video de Cypress)

Estructura del proyecto (Cypress)
pgsql
Copiar
Editar
cypress/
├── e2e/
│   ├── login/
│   ├── usuario/
│   ├── organizador/
│   │   └── mis-eventos/
│   │       ├── TC-ORG-04-01-ver-listado.cy.js
│   │       ├── TC-ORG-04-02-filtrar-eventos.cy.js
│   └── admin/
├── support/
│   └── commands.js
├── fixtures/
│   └── users.json
.gitignore
package.json
README.md
Instalación y ejecución
bash
Copiar
Editar
git clone https://github.com/matiasleonel28/challenge-ticketazo.git
cd challenge-ticketazo
npm install
npx cypress open       # para modo interactivo
npx cypress run        # para modo headless
Comandos personalizados
cy.loginAsOrganizador()

cy.viewport(1280, 720)

Selectores personalizados mediante data-cy para mayor estabilidad

Datos de prueba
Organizador con eventos:

Email: 3ypsmhh8c5@zudpck.com

Contraseña: Aa123456@

Eventos: MegaTest, ModernEvent

Organizador sin eventos:

Email: firduvufyi@necub.com

Contraseña: Aa123456@



