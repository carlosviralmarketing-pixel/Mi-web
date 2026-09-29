# Sistema de outreach PPL en Grok Bot: arquitectura y plan de Claude

Versión del 2026-09-29. Es el resumen consolidado de todo el diseño hecho con Claude, para compararlo con el plan de Grok Bot antes de construir.
El detalle completo está en el repo `carlosviralmarketing-pixel/Mi-web`, rama `claude/grokbot-system-design-mr1g2a`, carpeta `grokbot/`.

---

## 1. Por qué rehacemos el sistema

El sistema anterior (un solo ChatGPT conectado a Notion) falló por tres razones:

| Problema | Solución en el nuevo diseño |
|---|---|
| Un solo "cerebro" hacía todo (investigar, puntuar, videos, mensajes, admin) y se confundía | **Un bot por trabajo**, cada uno con su manual y solo las herramientas que necesita |
| Solo corría si alguien le escribía, así que nunca arrancaba a enviar | **Rutinas programadas** en Grok Bot para cada bot. Nada depende de abrir un chat |
| Reglas y datos mezclados en Notion; nadie sabía qué versión de una regla valía | **Reglas en un solo lugar (GitHub / Skills). Datos en un solo lugar (Notion).** Sin espejos |

Objetivo de todo el sistema: **agendar llamadas con clientes.**

---

## 2. Principios

1. **Los bots se hablan como un equipo** y además **actualizan el CRM**. Las dos cosas, siempre.
2. **Regla de oro: primero se actualiza Notion, después se manda el mensaje** con el link a la fila.
3. **La memoria del bot no es fuente de verdad.** Notion sí.
4. **Nadie envía nada a un prospecto** hasta que Carlos y Adriano digan que el sistema completo está listo. Mientras tanto el SDR prepara borradores y Danny envía.
5. **Cada uno en su carril:** un bot puede pedirle algo a otro, pero no hacer su trabajo ni pedirle que rompa sus reglas.
6. **Construir paso a paso**, una fase a la vez, no todo junto.
7. **Plan B:** si una fase no funciona, se simplifica y Danny hace ese paso a mano en Notion. Los manuales están escritos para que también los pueda seguir una persona.

---

## 3. El equipo (6 bots)

| # | Bot | Trabajo | Cuándo corre | Herramientas |
|---|---|---|---|---|
| 00 | **Operator** ("CEO") | Dirige la reunión diaria, desbloquea, reparte prioridades, escala a humanos. No hace el trabajo de otros | L–V 08:00 + cuando alguien reporta un bloqueo + 18:15 | Notion (lectura), grupo Grok, Slack |
| 01 | **Sales Intelligence Manager (SIM)** | Decide a quién buscamos y por qué: criterios, scoring, tracks, batch activo semanal. Responde dudas de criterio | Lunes 07:00 | Notion (lectura), GitHub (playbooks), grupo Grok, Slack |
| 02 | **Prospector** | Encuentra empresas y personas, enriquece (LinkedIn + email verificado), puntúa, asigna track. Corre el signal sweep diario | Martes 07:00 (leads) · L–V 06:30 (señales) · cuando le piden leads | Notion, Exa, Clay, grupo Grok, Slack |
| 03 | **Video Automation** | Hace un video personalizado por prospecto y guarda una URL que funcione en Notion | L–V cada 2 h, 07:00–17:00 | Notion, Higgsfield, Cloudflare, grupo Grok, Slack |
| 04 | **SDR** | Outreach por LinkedIn y email, junto con Danny. Prepara borradores; Danny edita y envía | L–V 09:00 (completo) + 15:00 (solo inbox) | Notion, Gmail (solo borradores), LinkedIn, grupo Grok, Slack |
| 05 | **Admin** | Cuadra el registro al final del día, arma el briefing de cada reunión, dashboard | L–V 18:00 + cuando se agenda una reunión | Notion, Google Calendar, Gmail (lectura; envía solo al equipo interno), grupo Grok, Slack |

El puntaje y la asignación de track se pueden hacer con un modelo clasificador barato: solo devuelve números y un nombre de track.

---

## 4. Cómo se comunican

### Grupo de Grok Bot "PPL Outreach" (la oficina de los bots)
- Están los 6 bots. Grok Bot permite **unos 6 bots por grupo**, así que estamos justo en el límite: no se agrega un séptimo a este grupo.
- `@Bot` cuando un solo bot es dueño del pedido · varios `@` solo si de verdad hacen falta · `@everyone` solo para la reunión y avisos grandes.
- **Un hilo por resultado o aprobación** (por ejemplo "Batch de videos 29-sep", "Respuesta de Cole @ Cogent").

### Reunión diaria (L–V 08:00, en el grupo)
La dirige el Operator. Orden: Prospector → Video → SDR → Admin → SIM (lunes). Cada bot responde con números sacados de Notion:
```
Ayer:      <qué hice, con números>
Hoy:       <qué voy a hacer, con números>
Bloqueado: <qué me frena y a quién necesito>  (o "nada")
```
El Operator reparte trabajo en el momento, escala lo que no puede resolver y publica en Slack un resumen de 5 líneas.
Si un bot no se reporta, se considera caído y el Operator lo escala.

### Mensajes durante el día
| Tipo | Ejemplo | ¿Requiere respuesta? |
|---|---|---|
| Entrega | Prospector → Video: "8 leads listos para video: <links>" | Confirmar recibido |
| Pedido | SDR → Prospector: "Me quedan 12 leads, necesito ~30 de pharma" | Sí, con fecha |
| Pregunta | SDR → SIM: "¿Un lead Cool con PDUFA reciente entra?" | Sí |
| Bloqueo | Video → Operator: "Sin créditos en Higgsfield" | Sí |
| Aviso | SDR → Admin: "Reunión agendada con X el jueves 3pm" | No |

Reglas: un dueño y un pedido por mensaje · hablarle al dueño, no a todos · responder a más tardar en la siguiente corrida · las decisiones quedan en Notion (si son sobre un lead) o en el playbook (si son sobre una regla).
**Quién decide:** criterio y targeting → SIM · prioridades y carga de trabajo → Operator · plata, envíos, legal → Carlos / Adriano.

### Slack #ppl-grokbot (para los humanos)
Solo para: resumen diario (Operator), borradores por aprobar (SDR → Danny), videos por revisar (Video → Danny), reuniones agendadas + briefing (Admin), bloqueos (Operator).
Danny puede escribir ahí (por ejemplo "@SDR Cole respondió, prepara respuesta") y eso activa al bot.
La conversación detallada entre bots se queda en Grok Bot. **WhatsApp no**, porque no tiene conector nativo y habría que sumar un proveedor extra que vería datos de prospectos.

### Limitación conocida
Grok Bot **no tiene disparador por email entrante**. El SDR revisa el inbox a horas fijas (09:00 y 15:00; se pueden agregar más).

---

## 5. Flujo de un lead

```
New ──► Ready for Video ──► Ready for Outreach ──► In Cadence ──► Replied ──► Meeting Booked ──► Won / Lost / Nurture
Prospector   Video              SDR                   SDR           SDR         Admin
```
| Etapa | Dueño | Pasa a la siguiente cuando… | Mensaje que se manda |
|---|---|---|---|
| New | Prospector | Campos obligatorios llenos y Fit Score ≥ 62 | Prospector → Video: "N listos" |
| Ready for Video | Video | URL + Tracking ID guardados y verificados | Video → SDR + Danny: "N videos para revisar" |
| Ready for Outreach | SDR | Primer toque enviado (Cadence Step = 1) | — |
| In Cadence | SDR | Responde, o termina la cadencia (→ Nurture) | — |
| Replied | SDR | Agenda reunión o dice que no (→ Lost) | SDR → Danny: borrador de respuesta |
| Meeting Booked | Admin | Reunión hecha y resultado registrado | SDR → Admin: quién y cuándo |

---

## 6. Día de cada bot (resumen)

**SDR (orden estricto):**
1. **Inbox primero:** leer respuestas en Gmail y LinkedIn, parar la cadencia, marcar Replied, preparar la respuesta para Danny. Rebotes → Email Status = None. "No me interesa" → Do Not Contact.
2. **Pendientes del día:** todo lo que tenga Next Action Date ≤ hoy (follow-ups de la cadencia, llamadas prometidas, revisión de videos).
3. **Outreach nuevo:** solo con 1 y 2 al día. Leads Ready for Outreach del batch activo, primero los de mayor puntaje.
4. **¿Sin leads?** Si quedan menos de 20, le pide más al Prospector.
5. **Cierre:** le manda a Danny su lista del día (respuestas → follow-ups → borradores nuevos).
Actualiza Notion **después de cada acción**.

**Prospector, corrida semanal:**
1. Lee las reglas.
2. Busca empresas con Exa (máx. 30).
3. Deduplica contra Notion.
4. Busca personas con Clay (máx. 5 por empresa).
5. Enriquece.
6. Puntúa y asigna track.
7. Llena Brand.
8. Guarda cada fila apenas está completa.
9. Si pasa el umbral → Ready for Video.
10. Avisa a Video.

**Video:**
1. Frame de inicio con talento propio licenciado. Nunca recrea a una persona real de la web del prospecto.
2. Prompt con empresa, marca y señal.
3. Genera en Higgsfield.
4. Sube a Cloudflare con Tracking ID.
5. **Verifica que la URL abra.**
6. Guarda en Notion.
7. Crea tarea de revisión para Danny.
8. Avisa.

**Admin:**
- **Fin del día:** compara Gmail y LinkedIn contra Notion y corrige lo que falte; resumen del día al Operator.
- **Reunión agendada:** calendario, aviso al equipo, briefing (empresa, persona, señal, historial con el SDR, ángulo sugerido, preguntas), repaso 24 h antes.

---

## 7. Reglas de negocio (playbooks)

### Pharma / Biotech
- **Empresas:** mid-size y specialty pharma + biotech, **enfermedades raras primero**. Mejor si son más chicas porque compran más rápido.
- **También entran:** large-cap solo con lanzamiento o vencimiento de patente, biotechs con buena financiación pre-comerciales, orphan-disease.
- **Disparadores:** Fase 3 / PDUFA cercano, pérdida de exclusividad.
- **Fuera:** las agencias pharma quedan fuera de los bots (van por la red de Adriano).
- **Personas:** Brand/Marketing/DTC · Patient Advocacy · Digital/Innovation/Omnichannel (incluye AI). Máximo 5 por empresa, ordenadas por función → seniority → alcance US/global.
- **Fit Score (0–100):**
  - category_fit 30
  - timing 25
  - contact 20
  - ai_pain 15
  - whitespace 10
  - **Tiers:** Hot ≥78 · Warm 62–77 · Cool 45–61 · Cold <45

### Retail (fashion ecommerce)
- **Empresas:** marcas ecommerce-first de 50–2.000 empleados y ~$20M–1B de facturación, que necesitan fotos on-model todo el tiempo.
- **Excluidas:** Zara, H&M, Mango, ASOS, Zalando, Shein.
- **Ola 1 = marcas con sede en EE.UU.** Las razones: NY Fashion Workers Act, ley de etiquetado de AI de California, y la zona horaria.
- **Prioridad según su avance con AI:**
  - P1 = inversión pública en AI
  - P2 = encaja pero la señal de AI es débil
  - P3 = más chicas
- **Personas:** Ecommerce/Digital · AI/Data/Tech · Creative/Studio · Marketing/Brand · Founder (marcas de menos de 500 personas).

### Para ambos
- Solo compradores. Solo el cargo actual (se re-verifica cada trimestre).
- LinkedIn es el primer toque; email solo a direcciones verificadas por Clay.
- Datos personales: nombre, cargo, LinkedIn y email de trabajo. Se respetan los pedidos de borrado.
- **Selección semanal:** el fit es solo un filtro (Hot/Warm). Cuatro señales en vivo eligen los 20–30 contactos de la semana: cambio de cargo, posts sobre consentimiento/AI, dinero nuevo, interacción con competidores.

### Signal sweep diario (el que ya existe)
- **Presupuesto por corrida:**
  - ~25 cuentas
  - ≤3 sub-agentes
  - ≤15 páginas abiertas
  - ≤15 triggers
  - ≤10 tareas
  - ≤25 búsquedas en Clay, sin créditos de enriquecimiento
- **Evidencia:** no hay trigger sin una URL abierta más una cita textual. Un resumen de noticias o agregador no alcanza.
- **Tareas:** solo se crean si se cumplen todas estas condiciones:
  - el prospecto está en el batch activo;
  - la señal pasa el umbral (Pharma ≥12, Retail ≥24);
  - la cadencia permite escribirle ahora.
- **Borrador:** siempre marcado `DRAFT`.

### Oferta
| | Lo que compras | Lo que obtienes | Oferta |
|---|---|---|---|
| Pharma | Pacientes y HCP/KOL licenciados | Experiencias interactivas, historias de pacientes, contenido para HCP con una persona real al centro | Pacientes y KOLs listos para licenciar. La reunión se plantea como: no quedarse atrás, aliviar el presupuesto con autenticidad, prueba entre pares. El piloto se define en la reunión |
| Retail | Modelos licenciados | Más contenido para ads y ecommerce | **Agenda una demo y te llevas tu primera campaña gratis** |

- No reemplazamos a la agencia de cuenta: sumamos el consentimiento y la licencia de la imagen AI de personas reales.
- En pharma **no se pre-arman entregables** (hay riesgo MLR/regulatorio). Las capacidades se muestran en el video de outreach con ejemplos propios.
- Las personas son personas, nunca "assets". La licencia tiene alcance y plazo definidos y es renovable, nunca perpetua.

### Cadencia (8 pasos, ~4 por canal)
Hay dos entradas: **general** (por fit) y **señal** (abre con la señal). Las dos terminan en la misma cadencia.

| Paso | Día | Canal | Contenido |
|---|---|---|---|
| 1 | 0 | LinkedIn | Invitación con nota corta |
| 2 | 0 | Email (si está verificado) | Primer email + link al video |
| 3 | al aceptar | LinkedIn | Mensaje + video |
| 4 | 4 | LinkedIn | "¿Alcanzaste a leer mi nota?" |
| 5 | 4 | Email | Follow-up en el mismo hilo |
| 6 | 8 | LinkedIn | "¿Vale una conversación corta?" |
| 7 | 12 | Email | Último email |
| 8 | 13 | LinkedIn | Última nota |

Se detiene con cualquier respuesta, rebote o Do Not Contact. Sin respuesta al terminar → Nurture 90 días. Danny puede editar cualquier texto.

---

## 8. CRM en Notion

**Bases de datos (se quedan, no se reconstruyen):** PPL Prospects (907 personas) · PPL Triggers · PPL Tasks.

| Segmento | Personas | Empresas | En Active Batch |
|---|---|---|---|
| Pharma | 510 | 93 | 82 |
| Fashion / Retail | 367 | 85 | 26 |
| Biotech + Rare Disease | 26 | 24 | 16 |

**Campos obligatorios en PPL Prospects:** Name · Company · Brand (pharma) · Segment · Persona · Title · LinkedIn URL · Email Status · LinkedIn Status · Fit Score · Priority · Track · Pipeline Stage · Cadence Step · Owner.
**Campos operativos:** Email · Buying Signal · Active Batch · Next Action · **Next Action Date** (alimenta los pendientes del SDR) · **Video URL** · **Tracking ID** · Last Touch · Do Not Contact.

**PPL Tasks:** prefijo según quién la creó: `SIGNAL-` `CADENCE-` `REPLY-` `VIDEO-QA-` `BRIEF-` `ESC-`. Tipo · Prospecto · Trigger · Fecha · Operator (Danny / SDR bot / Carlos / Adriano) · Estado · Draft.

**Log diario:** el Operator guarda el resumen de la reunión en una página de Notion, "Grokbot — daily log".

---

## 9. Plan de construcción (una fase a la vez)

| Fase | Qué | Terminada cuando |
|---|---|---|
| **0. Limpiar datos** | Llenar Brand, Segment, Track, Email Status y Score en los 907 (solo campos vacíos, sin pisar nada) | Ninguna fila del Active Batch tiene campos obligatorios vacíos |
| **1. Prospección** | SIM + Prospector con rutinas activas | 2 corridas semanales seguidas agregan leads puntuados y sin duplicados, reportados en la reunión |
| **2. Video** | Arreglar el bug: la URL del video no llegaba a Notion | 1 video pharma + 1 retail, la URL abre desde Notion |
| **3. SDR en modo borrador** | El SDR prepara, Danny aprueba y envía | 1 semana con Danny editando < 30 % de los borradores |
| **4. Admin** | Cierre del día, briefing, dashboard | El briefing llega antes de la siguiente llamada agendada |
| **5. SDR envía** | El SDR envía los pasos aprobados de la cadencia (las respuestas siempre las revisa Danny) | Solo con el OK de Carlos y Adriano |

Mientras tanto, Danny sigue prospectando a mano en LinkedIn, sobre todo fashion.

---

## 10. Pendientes y decisiones abiertas

| # | Pregunta | Fase | Dueño |
|---|---|---|---|
| 1 | Crear #ppl-grokbot en Slack y conectarlo a Grok Bot | Todas | Carlos |
| 2 | Un email por bot: ¿qué direcciones? ¿El SDR envía desde la cuenta de Danny o desde la suya? | 3 | Carlos |
| 3 | ¿El video va por email **y** LinkedIn, o por LinkedIn solo cuando no hay email? | 3 | Adriano |
| 4 | Topes diarios: invitaciones de LinkedIn, emails por inbox | 3 | Carlos |
| 5 | Presupuesto de créditos de Higgsfield por semana y por video | 2 | Carlos |
| 6 | ¿Qué se guardó en Notion en vez de la URL del video en la prueba fallida? | 2 | Adriano |
| 7 | Copiar los mensajes de retail desde Notion al playbook | 3 | Adriano |
| 8 | Pasar la spec del signal sweep de Notion al playbook y archivar la página | 1 | Adriano |
| 9 | Oferta especial de "$300" para pharma: ¿quién califica y qué incluye? | 3 | Adriano |
| 10 | ¿Qué modelo clasificador usamos para el score y el track? | 1 | Carlos |
| 11 | Plantillas de prompts de video por segmento | 2 | Carlos |
| 12 | Acceso de LinkedIn para el SDR y cuánto riesgo aceptamos con envíos automáticos | 5 | Carlos + Adriano |
| 13 | ¿Grok Bot puede leer archivos directo de GitHub, o cargamos los playbooks como Skills? | 1 | Carlos |

---

## 11. Puntos para comparar con el plan de Grok Bot

Al consolidar, revisar si el plan de Grok Bot coincide en:
1. **Número y rol de los bots.** ¿Son los mismos 6? ¿Hay alguno de más o de menos?
2. **Dónde viven las reglas:** GitHub, Skills de Grok Bot o Notion. Tiene que ser **un solo lugar**.
3. **Comunicación:** grupo de Grok + reunión de las 8:00 + Slack para humanos.
4. **Aprobación humana antes de cualquier envío** hasta la Fase 5.
5. **Orden de construcción:** datos → prospección → video → SDR → admin.
6. **Etapas del pipeline y quién es dueño de cada una.**
7. **Horarios de las rutinas.**
8. Cualquier herramienta o conector que Grok Bot proponga y que no esté aquí.
