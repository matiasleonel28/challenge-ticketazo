describe('Validar eventos con fecha y horario no anteriores a ahora', () => {
  function parseFechaTexto(fechaTexto) {
    const regex = /\d{1,2} de (\w+) de (\d{4})/i;
    const match = fechaTexto.match(regex);
    if (!match) return null;

    const diaMatch = fechaTexto.match(/\d{1,2}/);
    if (!diaMatch) return null;

    const dia = parseInt(diaMatch[0], 10);
    const mesNombre = match[1].toLowerCase();
    const anio = parseInt(match[2], 10);

    const meses = {
      enero: 0,
      febrero: 1,
      marzo: 2,
      abril: 3,
      mayo: 4,
      junio: 5,
      julio: 6,
      agosto: 7,
      septiembre: 8,
      octubre: 9,
      noviembre: 10,
      diciembre: 11,
    };

    const mes = meses[mesNombre];
    if (mes === undefined) return null;

    return { dia, mes, anio };
  }

  function parseHoraTexto(horaTexto) {
    const regex = /(\d{1,2}):(\d{2})\s*(AM|PM)/i;
    const match = horaTexto.match(regex);
    if (!match) return null;

    let hora = parseInt(match[1], 10);
    const minutos = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();

    if (ampm === 'PM' && hora !== 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;

    return { hora, minutos };
  }

  it('Detectar todos los eventos con fecha y hora anteriores a ahora', () => {
    cy.visit('https://vps-3696213-x.dattaweb.com/');

    const eventosPasados = [];

    cy.get('[data-cy^="evento-card-"] > .flex-auto').each(($card, index, list) => {
      cy.wrap($card).within(() => {
        cy.get('[data-cy="evento-fecha"]').invoke('text').then((fechaTexto) => {
          cy.get('[data-cy="evento-horario"]').invoke('text').then((horaTexto) => {
            fechaTexto = fechaTexto.trim();
            horaTexto = horaTexto.trim();

            const fecha = parseFechaTexto(fechaTexto);
            const hora = parseHoraTexto(horaTexto);

            if (fecha && hora) {
              const fechaEvento = new Date(fecha.anio, fecha.mes, fecha.dia, hora.hora, hora.minutos);
              const ahora = new Date();

              if (fechaEvento.getTime() < ahora.getTime()) {
                eventosPasados.push({
                  indice: index,
                  fechaTexto,
                  horaTexto,
                  fechaEvento: fechaEvento.toString(),
                });
              }
            } else {
              eventosPasados.push({
                indice: index,
                fechaTexto,
                horaTexto,
                error: 'Formato inválido',
              });
            }

            // Si es el último elemento, hacer la evaluación final
            if (index === list.length - 1) {
              if (eventosPasados.length > 0) {
                const mensajes = eventosPasados.map(ev => {
                  if (ev.error) {
                    return `Tarjeta ${ev.indice}: ${ev.error} - Fecha: "${ev.fechaTexto}" Hora: "${ev.horaTexto}"`;
                  } else {
                    return `Tarjeta ${ev.indice}: Evento en pasado - Fecha/Hora: ${ev.fechaEvento}`;
                  }
                }).join('\n');

                throw new Error(`Se encontraron eventos con problemas:\n${mensajes}`);
              }
            }
          });
        });
      });
    });
  });
});

