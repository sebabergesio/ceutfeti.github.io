/* ============================================
   ===== CHATBOT InfoCEUT v4.0 =====
   ===== TODAS las variantes posibles =====
   ============================================ */
(function() {
    'use strict';

    if (window.__CEUT_CHATBOT_LOADED__) return;
    window.__CEUT_CHATBOT_LOADED__ = true;

    if (document.getElementById('chatToggle')) return;

    // ===== 1. Font Awesome =====
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(fa);
    }

    // ===== 2. CSS =====
    if (!document.getElementById('chatbot-styles')) {
        const link = document.createElement('link');
        link.id = 'chatbot-styles';
        link.rel = 'stylesheet';
        link.href = 'chatbot.css';
        document.head.appendChild(link);
    }

    // ===== 3. Configuración =====
    const CHATBOT_CONFIG = {
        nombreBot: 'InfoCEUT',
        subtitulo: 'En línea · Respondo al instante',
        mensajeBienvenida: '¡Hola! 👋 Soy el asistente del Centro de Estudiantes. ¿En qué te puedo ayudar?',
        mensajeNoEncontrado: `No encontré esa respuesta 😅.<br><br>
            <strong>Podés contactarnos por:</strong><br>
            💬 WhatsApp: <a href="https://wa.me/543482211788?text=Hola,%20tengo%20una%20consulta" target="_blank">+54 3482 211788</a><br>
            📧 Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a><br>
            📍 Ubicación: Calle 44 Nº 1000<br><br>
            O probá con alguna de las <strong>opciones rápidas</strong> de abajo 👇`,
        delayMinimo: 400,
        delayMaximo: 800,

        sugerencias: [
            { texto: '📚 Moodle', clave: 'moodle' },
            { texto: '📝 SYSACAD', clave: 'sysacad' },
            { texto: '📝 Mesas de examen', clave: 'mesa de examen' },
            { texto: '📝 Inscripciones', clave: 'inscripcion a materias' },
            { texto: '📆 Feriados', clave: 'feriados' },
            { texto: '🏖️ Recesos', clave: 'receso' },
            { texto: '📄 Formularios', clave: 'formulario' },
            { texto: '📄 Constancia alumno', clave: 'constancia de alumno regular' },
            { texto: '🛡️ Licencias', clave: 'licencia' },
            { texto: '📚 Biblioteca', clave: 'biblioteca' },
            { texto: '🎨 Logos UTN', clave: 'logos' },
            { texto: '📢 Quejas', clave: 'queja' },
            { texto: '👥 Tutorías', clave: 'tutoria' },
            { texto: '💬 WhatsApp', clave: 'whatsapp' },
            { texto: '📞 Contacto', clave: 'contacto' },
            { texto: '🕐 Horario Alumnado', clave: 'horario alumnado' },
            { texto: '🏥 Salud y bienestar', clave: 'salud estudiante' },
            { texto: '💼 Pasantías', clave: 'pasantia' },
            { texto: '🎓 Carreras', clave: 'carreras' },
            { texto: '📊 Duración carreras', clave: 'duracion de carreras' },
            { texto: '📉 Recursar', clave: 'recursar' },
            { texto: '📋 Reglamento', clave: 'reglamento de estudio' },
            { texto: '🆘 Violencia de género', clave: 'violencia de genero' },
            { texto: '🤝 Sumarme al CEUT', clave: 'formar parte del ceut' },
            { texto: '🏥 Qué hace el CEUT', clave: 'que hace el ceut' }
        ],

        followups: {
            'inscripcion': [
                { texto: '📝 Mesas de examen', clave: 'mesa de examen' },
                { texto: '📚 SYSACAD', clave: 'sysacad' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'licencia': [
                { texto: '📄 Formularios', clave: 'formulario' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'pasantia': [
                { texto: '🤝 Sumarme al CEUT', clave: 'formar parte del ceut' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'carreras': [
                { texto: '📊 Duración carreras', clave: 'duracion de carreras' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'salud': [
                { texto: '🆘 Violencia de género', clave: 'violencia de genero' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'reglamento': [
                { texto: '📉 Recursar', clave: 'recursar' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'biblioteca': [
                { texto: '📚 Moodle', clave: 'moodle' },
                { texto: '📞 Contacto', clave: 'contacto' }
            ],
            'default': [
                { texto: '📞 Contacto', clave: 'contacto' },
                { texto: '📚 Moodle', clave: 'moodle' },
                { texto: '📝 SYSACAD', clave: 'sysacad' }
            ]
        },

        // ===== INTENCIONES (palabras clave sueltas que activan respuesta directa) =====
        intenciones: {
            'mesas_examen': {
                tags: ['mesa', 'mesas', 'final', 'finales', 'examen', 'examenes', 'rendir', 'rendi', 'rindo', 'turno', 'llamado', 'finalear'],
                prioridad: 150
            },
            'inscripcion': {
                tags: ['inscribirme', 'inscribo', 'inscripcion', 'anotar', 'anotarme', 'anoto', 'cursar', 'cursada', 'cursado', 'materia', 'materias'],
                prioridad: 145
            },
            'constancia': {
                tags: ['constancia', 'certificado', 'certificados', 'papel', 'papeles', 'regular'],
                prioridad: 140
            },
            'licencia': {
                tags: ['licencia', 'licencias', 'pausar', 'pausa', 'suspender', 'suspension'],
                prioridad: 140
            },
            'whatsapp': {
                tags: ['whatsapp', 'wsp', 'wpp', 'wasap', 'zap', 'wasa', 'wp'],
                prioridad: 135
            },
            'email': {
                tags: ['email', 'correo', 'mail', 'gmail'],
                prioridad: 135
            },
            'moodle': {
                tags: ['moodle', 'aula', 'virtual', 'plataforma'],
                prioridad: 135
            },
            'sysacad': {
                tags: ['sysacad', 'siu', 'sistema', 'sistemas'],
                prioridad: 135
            },
            'biblioteca': {
                tags: ['biblioteca', 'libro', 'libros', 'catalogo', 'elibro', 'koha', 'welibrary'],
                prioridad: 130
            },
            'carreras': {
                tags: ['carrera', 'carreras', 'ingenieria', 'tecnicatura', 'licenciatura'],
                prioridad: 125
            },
            'pasantia': {
                tags: ['pasantia', 'pasantias', 'trabajo', 'trabajar', 'empleo', 'empleos', 'laboral', 'laburo', 'laburar', 'cv', 'curriculum'],
                prioridad: 140
            },
            'salud': {
                tags: ['psicologa', 'psicologia', 'psicologo', 'salud', 'mental', 'emocional', 'adicciones', 'ansiedad', 'depresion', 'contencion'],
                prioridad: 145
            },
            'queja': {
                tags: ['queja', 'quejas', 'reclamo', 'reclamos', 'propuesta', 'propuestas', 'sugerencia', 'sugerencias', 'buzon'],
                prioridad: 130
            },
            'tutoria': {
                tags: ['tutoria', 'tutorias', 'tutor', 'tutores'],
                prioridad: 130
            },
            'recursar': {
                tags: ['recursar', 'recurso', 'recurse', 'repetir'],
                prioridad: 135
            },
            'reglamento': {
                tags: ['reglamento', 'ordenanza', 'derechos', 'inasistencias', 'faltas'],
                prioridad: 130
            },
            'feriados': {
                tags: ['feriado', 'feriados'],
                prioridad: 140
            },
            'receso': {
                tags: ['receso', 'vacaciones', 'vacacion'],
                prioridad: 140
            },
            'formulario': {
                tags: ['formulario', 'formularios', 'solicitud', 'solicitudes', 'planilla'],
                prioridad: 130
            },
            'horario_alumnado': {
                tags: ['horario', 'horarios', 'atencion'],
                prioridad: 125
            },
            'violencia': {
                tags: ['violencia', 'acoso', 'abuso', 'maltrato', 'denuncia', 'denunciar', 'genero'],
                prioridad: 150
            },
            'sumarse': {
                tags: ['sumarme', 'sumar', 'voluntario', 'voluntariado', 'delegado', 'integrar', 'colaborar', 'unirme'],
                prioridad: 130
            },
            'logos': {
                tags: ['logo', 'logos', 'logotipo'],
                prioridad: 140
            },
            'wifi': {
                tags: ['wifi', 'internet'],
                prioridad: 140
            },
            'copiado': {
                tags: ['copiado', 'copias', 'impresion', 'imprimir', 'fotocopia', 'fotocopias'],
                prioridad: 140
            },
            'cursos': {
                tags: ['curso', 'cursos', 'capacitacion'],
                prioridad: 130
            },
            'ubicacion': {
                tags: ['ubicacion', 'direccion'],
                prioridad: 120
            },
            'crisis': {
                tags: ['morir', 'suicidio', 'matarme', 'desaparecer'],
                prioridad: 200
            }
        },

        respuestas: [
            // ============ CRISIS (prioridad máxima) ============
            {
                id: 'crisis',
                claves: [
                    'me quiero morir', 'no quiero vivir', 'quiero desaparecer',
                    'no aguanto mas', 'no doy mas', 'estoy desesperado',
                    'me quiero matar', 'no le encuentro sentido', 'quiero terminar con todo'
                ],
                respuesta: `<strong>💙 Estamos con vos</strong><br><br>
                    Si estás pasando por un momento difícil, no estás solo/a.<br><br>
                    📞 <strong>Línea de prevención del suicidio:</strong> 135 (CABA) o 0800-345-1435<br>
                    📞 <strong>SAME:</strong> 107<br>
                    📞 <strong>Emergencias:</strong> 911<br><br>
                    También podés contactar a nuestra <strong>Psicóloga</strong>:<br>
                    💬 <a href="https://wa.me/543482211788?text=Hola,%20necesito%20hablar%20con%20alguien" target="_blank">+54 3482 211788</a>`
            },

            // ============ SALUDOS ============
            {
                id: 'saludo',
                claves: [
                    'hola', 'buenas', 'buen dia', 'buen día', 'buenas tardes', 'buenas noches',
                    'hola buenas', 'holaa', 'holaaa', 'hello', 'hi', 'hey', 'que tal',
                    'como andas', 'como estas', 'todo bien', 'holis', 'holi', 'epa', 'buenas buenas'
                ],
                respuesta: '¡Hola! 👋 ¿Cómo puedo ayudarte?'
            },
            {
                id: 'gracias',
                claves: [
                    'gracias', 'muchas gracias', 'mil gracias', 'genial', 'perfecto',
                    'excelente', 'buenisimo', 'joya', 'de diez', 'capo', 'crack', 'buena onda'
                ],
                respuesta: '¡De nada! 😊 Cualquier otra consulta, acá estoy.'
            },

            // ============ MESAS DE EXAMEN ============
            {
                id: 'mesas_examen',
                claves: [
                    // Formales
                    'fecha de mesa', 'fechas de mesa', 'mesa de examen', 'mesas de examen',
                    'llamado a examen', 'llamado a final', 'llamado a mesas',
                    'turno de examen', 'turnos de examen', 'turno examen', 'turno final',
                    'fechas de finales', 'fechas de examenes', 'calendario de examenes',
                    'proximo examen', 'siguiente examen', 'cuando rindo',
                    // Coloquiales con "anoto"
                    'me anoto a una mesa', 'me anoto a mesa', 'anotarme a mesa',
                    'anotarme a una mesa', 'anotarme a examen', 'anotarme a un examen',
                    'anotarme a final', 'anotarme a un final', 'anotarme a finales',
                    'anotarme para examen', 'anotarme para final', 'anotarme para rendir',
                    'como me anoto a una mesa', 'como me anoto a mesa',
                    'como me anoto a un examen', 'como me anoto a un final',
                    'como me anoto a examen', 'como me anoto a final',
                    'como anotarme a mesa', 'como anotarme a examen',
                    'como anotarme a final', 'como anotarme a rendir',
                    'quiero anotarme a una mesa', 'quiero anotarme a un examen',
                    'quiero anotarme a un final', 'quiero anotarme a rendir',
                    'necesito anotarme a un examen', 'necesito anotarme a mesa',
                    'necesito anotarme a final', 'necesito rendir',
                    'tengo que rendir', 'debo rendir',
                    // Inscribirse
                    'inscribirme a examen', 'inscribirme a mesa', 'inscribirme a final',
                    'inscribirme a un examen', 'inscribirme a una mesa', 'inscribirme a un final',
                    'como inscribirme a examen', 'como inscribirme a mesa',
                    'me inscribo a mesa', 'me inscribo a examen', 'me inscribo a final',
                    // Rendir
                    'quiero rendir', 'quiero rendir final', 'quiero rendir un final',
                    'quiero rendir examen', 'quiero rendir un examen',
                    'necesito rendir', 'cuando puedo rendir', 'cuando rindo',
                    'que dia rindo', 'cuando es el final', 'cuando es el examen',
                    // Donde
                    'donde me anoto a examen', 'donde me anoto a mesa', 'donde me inscribo a examen',
                    'donde me inscribo a mesa', 'donde anoto para rendir',
                    // Cortas
                    'anoto', 'anotarme', 'me anoto', 'inscripcion examen', 'inscripcion final',
                    'inscripcion mesa', 'mesa', 'mesas', 'final', 'finales', 'examen', 'examenes',
                    'rendir', 'rindo', 'turno', 'llamado', 'finalear',
                    // Frustración
                    'no se cuando rindo', 'no encuentro las mesas', 'no se cuando es el final',
                    'se puede rendir', 'puedo rendir', 'ya me puedo anotar a rendir'
                ],
                respuesta: `<strong>📅 LLAMADO A EXÁMENES</strong><br><br>
                    <em style="color:var(--texto-claro, #6B7280); font-size:0.75rem;">📌 Para anotarte: SYSACAD → Inscripción a exámenes. Se habilita 1 semana antes de cada llamado.</em><br><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>1º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">18 al 22 de mayo</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>2º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">06 al 10 de julio</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>3º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">27 al 31 de julio</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>4º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">22 al 25 de septiembre</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>5º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">30 de noviembre al 4 de diciembre</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>6º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">7 al 11 de diciembre</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>7º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">14 al 18 de diciembre</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>8º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">10 al 12 de febrero de 2027</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>9º llamado</strong></td><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">15 al 19 de febrero de 2027</td></tr>
                        <tr><td style="padding:4px 8px;"><strong>10º llamado</strong></td><td style="padding:4px 8px; text-align:right;">22 al 26 de febrero de 2027</td></tr>
                    </table>
                    <br>🔗 <a href="https://www3.frrq.utn.edu.ar/sysacadweb/loginalumno.asp" target="_blank">Anotate en SYSACAD →</a>`,
                followup: 'inscripcion'
            },

            // ============ INSCRIPCIÓN A MATERIAS ============
            {
                id: 'inscripcion',
                claves: [
                    // Formales
                    'inscripcion a materias', 'inscripcion a cursado', 'inscripcion a cursar',
                    'cuando me inscribo', 'cuando son las inscripciones',
                    'fechas de inscripcion', 'periodo de inscripcion',
                    'inscripcion abierta', 'inscripciones abiertas',
                    // Anotarse
                    'me anoto a una materia', 'me anoto a materia', 'me anoto a materias',
                    'anotarme a una materia', 'anotarme a materia', 'anotarme a materias',
                    'anotarme a cursar', 'anotarme a cursada', 'anotarme a cursado',
                    'anotarme en materias', 'anotarme en una materia',
                    'como me anoto a una materia', 'como me anoto a materia',
                    'como me anoto a materias', 'como me anoto a cursar',
                    'como anotarme a materia', 'como anotarme a cursar',
                    'quiero anotarme a materias', 'quiero anotarme a cursar',
                    'quiero anotarme a una materia', 'quiero cursar',
                    'necesito anotarme a materias', 'necesito cursar',
                    // Inscribirse
                    'inscribirme a materia', 'inscribirme a materias',
                    'inscribirme a cursado', 'inscribirme a cursar',
                    'como inscribirme a materia', 'como inscribirme a cursado',
                    'me inscribo a materia', 'me inscribo a cursar',
                    // Donde
                    'donde me anoto a materias', 'donde me inscribo a materias',
                    'donde me anoto a cursar', 'donde me inscribo a cursado',
                    'donde me anoto a cursar', 'donde cursar',
                    // Cuando
                    'cuando me anoto', 'cuando me tengo que anotar',
                    'cuando me anoto a materias', 'cuando me inscribo a materias',
                    'hasta cuando me anoto', 'hasta cuando me puedo anotar',
                    'hasta cuando hay tiempo para anotarme',
                    'cuando abren las inscripciones', 'cuando abre la inscripcion',
                    'abrio la inscripcion', 'abrieron las inscripciones',
                    'ya me puedo anotar', 'puedo anotarme', 'ya abrio',
                    // Cortas
                    'inscripcion', 'inscripciones', 'anotarme', 'anoto', 'me anoto',
                    'inscribirme', 'inscribo', 'me inscribo', 'cursar', 'cursada', 'cursado',
                    'anotarse a materias', 'anotar materias', 'anotar cursada',
                    // Frustración
                    'no se cuando me anoto', 'no se como anotarme', 'no puedo anotarme',
                    'no me deja anotarme', 'no encuentro donde anotarme'
                ],
                respuesta: `<strong>🎓 FECHAS DE INSCRIPCIÓN</strong><br><br>
                    📚 <strong>Inscripción a cursado:</strong><br>
                    Casi siempre se realiza la semana anterior al inicio de cada cuatrimestre.<br><br>
                    📝 <strong>Inscripción a exámenes:</strong><br>
                    Se habilita 1 semana antes de cada llamado.<br>
                    Podés anotarte hasta la mañana del día anterior a la mesa.<br><br>
                    🔗 <strong>Inscribite en SYSACAD:</strong><br>
                    <a href="https://www3.frrq.utn.edu.ar/sysacadweb/loginalumno.asp" target="_blank">SYSACAD - Login Alumno</a><br><br>
                    📅 <a href="academico.html#calendario">Ver calendario completo →</a><br><br>
                    📞 Consultas: <a href="tel:+543482751911">+54 3482 751911</a> (Alumnado)`,
                followup: 'inscripcion'
            },

            // ============ FERIADOS ============
            {
                id: 'feriados',
                claves: [
                    'feriado', 'feriados', 'dia no laborable', 'dias no laborables',
                    'feriado nacional', 'feriados nacionales', 'proximo feriado',
                    'que feriados hay', 'cuando es feriado', 'cuando hay feriado',
                    'dias feriados', 'feriado proximo', 'feriado mes',
                    'finde largo', 'fin de semana largo', 'finde xl',
                    'no hay clases', 'no hay clase', 'suspenden clases',
                    'cuando no hay clases', 'dias sin clases', 'dias sin clase',
                    'proximo finde largo', 'cuando es el proximo feriado'
                ],
                respuesta: `<strong>📆 FERIADOS NACIONALES INAMOVIBLES</strong><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse; margin-top:6px;">
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>24 de marzo</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Día de la Memoria</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>2 de abril</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Malvinas Argentinas</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>3 de abril</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Viernes Santo</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>1º de mayo</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Día del Trabajador</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>25 de mayo</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Revolución de Mayo</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>20 de junio</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Gral. Belgrano</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>9 de julio</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Día de la Independencia</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>8 de diciembre</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Inmaculada Concepción</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>25 de diciembre</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Navidad</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>1º de enero 2027</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Año Nuevo</td></tr>
                        <tr><td style="padding:3px 8px;"><strong>8 y 9 feb 2027</strong></td><td style="padding:3px 8px; text-align:right;">Carnaval</td></tr>
                    </table>
                    <br><strong>📆 FERIADOS TRASLADABLES</strong><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse; margin-top:6px;">
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>15 de junio</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Gral. Güemes (17/06)</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>17 de agosto</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Gral. San Martín</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>12 de octubre</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Diversidad Cultural</td></tr>
                        <tr><td style="padding:3px 8px;"><strong>23 de noviembre</strong></td><td style="padding:3px 8px; text-align:right;">Soberanía Nacional (20/11)</td></tr>
                    </table>
                    <br><strong>📆 FERIADOS CON FINES TURÍSTICOS</strong><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse; margin-top:6px;">
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>23 de marzo</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Feriado turístico</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>10 de julio</strong></td><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">Feriado turístico</td></tr>
                        <tr><td style="padding:3px 8px;"><strong>7 de diciembre</strong></td><td style="padding:3px 8px; text-align:right;">Feriado turístico</td></tr>
                    </table>`
            },

            // ============ RECESOS ============
            {
                id: 'receso',
                claves: [
                    'receso', 'recesos', 'vacaciones', 'receso invernal',
                    'receso estival', 'receso de invierno', 'receso de verano',
                    'cuando son las vacaciones', 'cuando son las vacas',
                    'cuando hay vacaciones', 'vacaciones de invierno',
                    'vacaciones de verano', 'vacaciones invierno', 'vacaciones verano',
                    'cuando empiezan las clases', 'cuando arrancan las clases',
                    'inicio de clases', 'vuelta a clases', 'vuelven las clases',
                    'cuando vuelvo a clases', 'cuando vuelven las clases',
                    'cuando termina el cuatrimestre', 'cuando termina el año',
                    'cuando empieza el cuatrimestre', 'cuando arranca la facu'
                ],
                respuesta: `<strong>🏖️ RECESOS ACADÉMICOS</strong><br><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                        <tr><td style="padding:6px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>Receso invernal</strong></td><td style="padding:6px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;">13 al 24 de julio</td></tr>
                        <tr><td style="padding:6px 8px;"><strong>Receso estival</strong></td><td style="padding:6px 8px; text-align:right;">4 al 22 de enero de 2027</td></tr>
                    </table>`
            },

            // ============ FORMULARIOS ============
            {
                id: 'formulario',
                claves: [
                    'formulario', 'formularios', 'solicitud', 'solicitudes',
                    'planilla', 'planillas', 'form',
                    'que formularios hay', 'formularios disponibles',
                    'necesito formulario', 'necesito un formulario',
                    'donde estan los formularios', 'donde veo los formularios',
                    'donde saco formulario', 'donde descargo formulario',
                    'como consigo formulario', 'como pido formulario',
                    'solicitudes academicas', 'formularios utn', 'formularios pdf'
                ],
                respuesta: `<strong>📄 FORMULARIOS DISPONIBLES</strong><br>
                    <span style="font-size:0.7rem; color:var(--texto-claro, #6B7280);">Sección <a href="academico.html">Académico</a> → Formularios</span><br><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">📄 Aumento de Inasistencias</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">📄 Solicitud de Equivalencias</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">📄 Interrupción a la Licencia</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">📄 Licencia Estudiantil</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">📄 Renuncia a la Regularidad</td></tr>
                        <tr><td style="padding:4px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">📄 Restitución de Estudiante Regular</td></tr>
                        <tr><td style="padding:4px 8px;">📄 Validación del Cursado</td></tr>
                    </table>
                    <br><a href="academico.html">Ver todos los formularios →</a>`
            },

            // ============ LICENCIAS ============
            {
                id: 'licencia',
                claves: [
                    'licencia', 'licencias', 'licencia estudiantil',
                    'ordenanza 1705', 'pausar la carrera', 'pausar estudios', 'pausar cursada',
                    'pausar', 'pausa', 'pausar año', 'pausar cuatrimestre',
                    'dejar de estudiar', 'dejar la carrera un tiempo', 'dejar un tiempo',
                    'dejar estudios', 'abandonar temporalmente', 'suspender estudios',
                    'suspender', 'suspension', 'como pauso', 'como suspendo',
                    'como hago para pausar', 'necesito pausar', 'quiero pausar',
                    'quiero dejar un tiempo', 'problema para estudiar',
                    'no puedo estudiar un tiempo', 'enfermedad',
                    'trabajo me impide', 'trabajo no me deja',
                    'me voy de viaje', 'viaje', 'intercambio',
                    'embarazo', 'maternidad', 'paternidad', 'adopcion',
                    'me case', 'matrimonio', 'me voy a casar'
                ],
                respuesta: `<strong>📋 LICENCIAS ESTUDIANTILES</strong> <span style="font-size:0.6rem; background:rgba(245,124,0,0.15); color:#F57C00; padding:2px 8px; border-radius:10px; font-weight:700;">ORD. 1705</span><br><br>
                    Permite <strong>pausar tus actividades académicas</strong> sin perder tus derechos.<br><br>
                    <strong>Durante la licencia:</strong><br>
                    • No perdés las condiciones académicas<br>
                    • Podés conservar derechos de cursada<br>
                    • El tiempo no cuenta para permanencia<br>
                    • No se quita la beca UTN<br><br>
                    <strong>Motivos:</strong><br>
                    • Trabajo, matrimonio, embarazo/maternidad<br>
                    • Paternidad (15 días), adopción<br>
                    • Enfermedad (corta/larga duración)<br>
                    • Intercambio académico<br>
                    • Representación estudiantil<br>
                    • Donación de órganos<br>
                    • Y más...<br><br>
                    <a href="academico.html">Ver toda la info en Académico →</a>`
            },

            // ============ BIBLIOTECA ============
            {
                id: 'biblioteca',
                claves: [
                    'biblioteca', 'libros', 'elibro', 'koha', 'welibrary',
                    'biblioteca digital', 'recursos digitales', 'libros digitales',
                    'libros online', 'libro online', 'libro digital',
                    'donde hay libros', 'donde consigo libros', 'donde saco libros',
                    'prestamo libros', 'prestamo de libros', 'pedir libros',
                    'catalogo', 'catalogo utn', 'catalogo biblioteca',
                    'e-libro', 'biblioteca virtual', 'biblioteca de la facu',
                    'libro de la biblioteca', 'material biblioteca',
                    'apuntes', 'materiales de estudio', 'material de estudio',
                    'necesito un libro', 'busco un libro', 'donde estudio',
                    'libros utn', 'libros frrq'
                ],
                respuesta: `<strong>📚 BIBLIOTECA DIGITAL</strong><br><br>
                    <table style="width:100%; font-size:0.75rem; border-collapse:collapse;">
                        <tr><td style="padding:6px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>eLibro</strong></td><td style="padding:6px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;"><a href="https://elibro.net/es/lc/utnfrrq/inicio" target="_blank">Abrir →</a></td></tr>
                        <tr><td style="padding:6px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);"><strong>WeLibrary</strong></td><td style="padding:6px 8px; border-bottom:1px solid var(--border-color, #e5e7eb); text-align:right;"><a href="https://es.welib.st/" target="_blank">Abrir →</a></td></tr>
                        <tr><td style="padding:6px 8px;"><strong>Catálogo KOHA</strong></td><td style="padding:6px 8px; text-align:right;"><a href="https://koha.frrq.utn.edu.ar/" target="_blank">Abrir →</a></td></tr>
                    </table>
                    <br><a href="servicios.html">Ver en Servicios →</a>`
            },

            // ============ LOGOS UTN ============
            {
                id: 'logos',
                claves: [
                    'logo', 'logos', 'logos utn', 'repositorio', 'logotipo', 'logotipos',
                    'imagen institucional', 'descargar logo', 'logo utn', 'logo ceut',
                    'logos descargar', 'logos utn descargar', 'logo institucional',
                    'logos institucionales', 'isotipo', 'isologo', 'marca utn',
                    'necesito el logo', 'necesito logo', 'quiero el logo',
                    'donde saco el logo', 'donde descargo logo', 'logo de la utn'
                ],
                respuesta: `<strong>🎨 REPOSITORIO DE LOGOS UTN</strong><br><br>
                    Descargá los logos institucionales en PNG y SVG:<br><br>
                    <table style="width:100%; font-size:0.72rem; border-collapse:collapse;">
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 Logo CEUT FETI</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 Logo Nuevo UTN</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Azul HQ</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Blanco HQ</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Negro HQ</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Reco Azul HQ</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Reco Blanco HQ</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Reco Negro HQ</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Vertical Azul</td></tr>
                        <tr><td style="padding:3px 8px; border-bottom:1px solid var(--border-color, #e5e7eb);">🎨 UTN Vertical Blanco</td></tr>
                        <tr><td style="padding:3px 8px;">🎨 UTN Vertical Negro</td></tr>
                    </table>
                    <br>📁 Disponibles en la sección <a href="academico.html">Académico</a> → Logos UTN`
            },

            // ============ QUEJAS ============
            {
                id: 'queja',
                claves: [
                    'queja', 'quejas', 'reclamo', 'reclamos', 'propuesta', 'propuestas',
                    'sugerencia', 'sugerencias', 'buzon', 'buzon de quejas',
                    'hacer queja', 'hacer reclamo', 'presentar queja',
                    'presentar reclamo', 'quiero quejarme', 'quiero hacer una queja',
                    'quiero reclamar', 'necesito quejarme', 'tengo una queja',
                    'tengo un reclamo', 'donde me quejo', 'donde quejarme',
                    'donde reclamar', 'como me quejo', 'como quejarme',
                    'como reclamar', 'enviar queja', 'enviar reclamo',
                    'mandar queja', 'sugerir algo', 'proponer algo',
                    'quiero sugerir', 'buzon de sugerencias', 'queja anonima',
                    'reclamo anonimo', 'queja sobre algo', 'reclamar por algo'
                ],
                respuesta: `<strong>📢 QUEJAS Y PROPUESTAS</strong><br><br>
                    Enviá tu queja o propuesta <strong>de forma anónima</strong>.<br><br>
                    <strong>Características:</strong><br>
                    • 🔒 Anónimo<br>
                    • 📅 Revisión semanal<br>
                    • 👀 Podés ver las respuestas<br><br>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSe1qVreliO0O-VEeY2p8Hpz-jT7tFPw4RzKQaYjfTTI9MawNA/viewform" target="_blank">📝 Enviar queja/propuesta →</a><br>
                    <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5YVkW9zyMRJ3GdYnhBIF11tBJ1KmEMSBcI5yGKUF8YMY6jLVSCbzBtZ4JpbaHRsmSr-9XJLnbkuLH/pubhtml" target="_blank">📊 Ver respuestas →</a><br><br>
                    <a href="campus.html">Más info en Campus →</a>`
            },

            // ============ TUTORÍAS ============
            {
                id: 'tutoria',
                claves: [
                    'tutoria', 'tutorias', 'tutor', 'tutores',
                    'clases de apoyo', 'apoyo academico', 'ayuda con materia',
                    'ayuda con materias', 'ayuda en materia', 'necesito tutor',
                    'quiero tutor', 'busco tutor', 'tutoria de materia',
                    'tutorias disponibles', 'donde hay tutorias',
                    'donde veo tutorias', 'como consigo tutor', 'como pido tutor',
                    'necesito ayuda con una materia', 'no entiendo la materia',
                    'me cuesta una materia', 'profesor particular', 'particular'
                ],
                respuesta: `<strong>👥 TUTORÍAS</strong><br><br>
                    Las tutorías están disponibles <strong>todo el año</strong> para acompañarte en tu cursada.<br><br>
                    <strong>¿Cómo accedo?</strong><br>
                    • Mirá la planilla de tutorías disponibles<br>
                    • Contactá al tutor de tu materia<br><br>
                    <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSoxytliVeyR4EfziEUEFW_AL9o1w2jXPFpV0DnIcQ0WkAEtGulwDZpSimfgRuWD50lkP-_2RiQxMqh/pubhtml" target="_blank">📊 Ver planilla de Tutorías →</a><br><br>
                    <a href="campus.html">Más info en Campus →</a>`
            },

            // ============ GRUPOS WHATSAPP ============
            {
                id: 'grupos_whatsapp',
                claves: [
                    'grupo de whatsapp', 'grupos de whatsapp', 'whatsapp de la carrera',
                    'grupo de la carrera', 'grupo por año', 'grupos por año',
                    'grupo de primer año', 'grupo de segundo año', 'grupo de tercer año',
                    'grupo de cuarto año', 'grupo de quinto año',
                    'grupo whatsapp', 'grupos whatsapp', 'entrar al grupo',
                    'unirme al grupo', 'sumarme al grupo', 'grupo de mi año',
                    'grupo de mi carrera', 'grupo de la facu', 'grupo de companeros',
                    'grupo de compañeros', 'canales de whatsapp', 'canales whatsapp',
                    'donde estan los grupos', 'link grupo', 'link del grupo',
                    'link whatsapp', 'grupo de wsp', 'grupos de wsp',
                    'hay grupo', 'hay grupo de wsp', 'hay grupo de whatsapp'
                ],
                respuesta: `<strong>💬 GRUPOS DE WHATSAPP POR CARRERA</strong><br>
                    <span style="font-size:0.7rem; color:var(--texto-claro, #6B7280);">Unite al grupo de tu carrera y año</span><br><br>
                    <strong>🔧 Ingeniería</strong> (5 años)<br>
                    <a href="academico.html">Ver grupos de Ingeniería →</a><br><br>
                    <strong>🌿 Administración Rural</strong> (4 años)<br>
                    <a href="academico.html">Ver grupos de Adm. Rural →</a><br><br>
                    <strong>🛡️ Higiene y Seguridad</strong> (2 años)<br>
                    <a href="academico.html">Ver grupos de Higiene y Seg. →</a><br><br>
                    <strong>🏭 Ingeniería Industrial</strong> (5 años)<br>
                    <a href="academico.html">Ver grupos de Ing. Industrial →</a><br><br>
                    <strong>⚙️ Mecatrónica</strong> (2.5 años)<br>
                    <a href="academico.html">Ver grupos de Mecatrónica →</a><br><br>
                    <strong>📦 Logística</strong> (2.5 años)<br>
                    <a href="academico.html">Ver grupos de Logística →</a><br><br>
                    <strong>💻 Programación</strong> (2 años)<br>
                    <a href="academico.html">Ver grupos de Programación →</a><br><br>
                    📁 Todos los enlaces en <a href="academico.html">Académico</a>`
            },

            // ============ MOODLE ============
            {
                id: 'moodle',
                claves: [
                    'moodle', 'aula virtual', 'campus virtual', 'plataforma',
                    'aula', 'campus', 'materia virtual',
                    'donde esta el aula virtual', 'como entro al moodle',
                    'como entrar al moodle', 'link moodle', 'link aula virtual',
                    'material de clase', 'materiales de clase',
                    'subieron material', 'subieron tarea', 'tareas',
                    'donde veo las clases', 'donde estan las clases',
                    'clases virtuales', 'clases online', 'donde estan los materiales',
                    'no encuentro el aula', 'no me anda moodle', 'no funciona moodle'
                ],
                respuesta: '📚 Para entrar a <strong>Moodle</strong> ingresá a: <a href="https://frrq.cvg.utn.edu.ar/" target="_blank">frrq.cvg.utn.edu.ar</a>'
            },

            // ============ SYSACAD ============
            {
                id: 'sysacad',
                claves: [
                    'sysacad', 'sistema', 'siu', 'sistema academico',
                    'donde veo mis notas', 'mis notas', 'notas', 'ver notas',
                    'consultar notas', 'calificaciones',
                    'donde veo mis materias', 'mis materias',
                    'mi historia academica', 'certificado analitico', 'analitico',
                    'analitico', 'kardex',
                    'login alumno', 'ingresar al sistema', 'como entro al siu',
                    'no me anda sysacad', 'no funciona sysacad',
                    'no puedo entrar a sysacad', 'no me deja entrar',
                    'mis notas finales', 'mis calificaciones', 'boletin'
                ],
                respuesta: '📝 <strong>SYSACAD</strong> es el sistema de gestión académica. Ingresá acá: <a href="https://www3.frrq.utn.edu.ar/sysacadweb/loginalumno.asp" target="_blank">SYSACAD - Login Alumno</a>'
            },

            // ============ CALENDARIO ============
            {
                id: 'calendario',
                claves: [
                    'calendario', 'calendario academico', 'calendario de actividades',
                    'fechas importantes', 'fechas del año', 'fechas academicas',
                    'donde veo el calendario', 'calendario utn', 'calendario frrq'
                ],
                respuesta: '📅 Podés ver el <strong>calendario académico</strong> en la sección <a href="academico.html#calendario">Académico</a>.'
            },

            // ============ BECAS ============
            {
                id: 'becas',
                claves: [
                    'beca', 'becas', 'ayuda economica',
                    'beca utn', 'beca progresar', 'beca manuel belgrano',
                    'becas disponibles', 'como pido beca', 'como pedir beca',
                    'como saco beca', 'como obtener beca',
                    'quiero una beca', 'necesito beca', 'pedir beca',
                    'solicitar beca', 'beca comida', 'beca transporte',
                    'ayuda para estudiar', 'plata para estudiar', 'no me alcanza la plata',
                    'hay becas', 'hay becas disponibles', 'info sobre becas'
                ],
                respuesta: '🎓 Las <strong>becas</strong> se publican en la sección <a href="academico.html">Académico</a>. También podés consultar en Alumnado.'
            },

            // ============ HORARIOS ============
            {
                id: 'horarios_clase',
                claves: [
                    'horario', 'horarios', 'horario de clases', 'horarios de clases',
                    'cuando cursan', 'cuando curso', 'a que hora curso',
                    'horarios de materias', 'horarios de cursada',
                    'horario de la materia', 'donde veo los horarios',
                    'donde estan los horarios', 'cuando tengo clases',
                    'a que hora es la clase', 'horarios de este año'
                ],
                respuesta: '🕐 Los <strong>horarios</strong> los podés consultar en SYSACAD o en los grupos de WhatsApp por año.'
            },

            // ============ EQUIVALENCIAS ============
            {
                id: 'equivalencias',
                claves: [
                    'equivalencia', 'equivalencias', 'pedir equivalencia',
                    'solicitar equivalencia', 'como pido equivalencia',
                    'como pedir equivalencia', 'materia equivalente',
                    'me reconocen materia', 'reconocimiento de materia',
                    'validad materia', 'validar materia', 'validacion de materia',
                    'quiero que me reconozcan una materia', 'me pueden reconocer'
                ],
                respuesta: '🔄 El formulario de <strong>Solicitud de Equivalencias</strong> está en <a href="academico.html">Académico</a> → Formularios.'
            },

            // ============ WIFI ============
            {
                id: 'wifi',
                claves: [
                    'wifi', 'internet', 'red', 'contraseña', 'clave wifi',
                    'contraseña wifi', 'clave del wifi', 'password wifi',
                    'como me conecto al wifi', 'como conectarme al wifi',
                    'cual es el wifi', 'datos del wifi', 'no me anda el wifi',
                    'no tengo internet', 'internet gratis', 'wifi gratis',
                    'wifi campus', 'clave de internet', 'contraseña de internet',
                    'como es la clave del wifi', 'cual es la clave', 'clave de red',
                    'no me conecta el wifi', 'no me agarra el wifi'
                ],
                respuesta: '📶 El WiFi del campus es:<br>• Red: <strong>UTN Wifi</strong><br>• Contraseña: <strong>singular</strong>'
            },

            // ============ COPIADO ============
            {
                id: 'copiado',
                claves: [
                    'copiado', 'copias', 'impresion', 'imprimir',
                    'fotocopia', 'fotocopias', 'fotocopiadora', 'impresora',
                    'donde imprimo', 'donde saco copias', 'donde fotocopio',
                    'servicio de impresion', 'servicio de copiado',
                    'centro de copiado', 'centro de estudiantes copias',
                    'donde esta el centro de copiado', 'donde imprimir',
                    'necesito imprimir', 'necesito fotocopias', 'sacar fotocopias',
                    'donde saco fotocopias', 'hay fotocopiadora'
                ],
                respuesta: '🖨️ El <strong>centro de copiado</strong> está en el bar universitario.'
            },

            // ============ CURSOS ============
            {
                id: 'cursos',
                claves: [
                    'curso', 'cursos', 'capacitacion',
                    'cursos gratis', 'cursos gratuitos', 'cursos online',
                    'cursos utn', 'cursos ceut', 'cursos disponibles',
                    'que cursos hay', 'hacer un curso', 'quiero hacer un curso',
                    'capacitarme', 'aprender', 'talleres', 'talleres gratis',
                    'talleres gratuitos', 'hay cursos', 'hay cursos gratis',
                    'info sobre cursos', 'cursos de programacion', 'cursos de ingles'
                ],
                respuesta: '🎓 Hay <strong>cursos gratuitos</strong> disponibles en la sección <a href="campus.html">Campus</a> → Cursos.'
            },

            // ============ AYUDA ============
            {
                id: 'ayuda_general',
                claves: [
                    'ayuda', 'help', 'auxilio', 'necesito ayuda',
                    'ayuda con algo', 'me ayudan', 'me pueden ayudar',
                    'preguntas frecuentes', 'faq', 'dudas frecuentes',
                    'no se que hacer', 'estoy perdido', 'estoy perdida',
                    'no entiendo nada', 'no se por donde empezar'
                ],
                respuesta: '❓ Más información en la sección de <a href="ayuda.html">Ayuda</a> con preguntas frecuentes. También podés escribirme tu consulta específica.'
            },

            // ============ CONTACTO ============
            {
                id: 'contacto',
                claves: [
                    'contacto', 'contactar', 'comunicarme', 'telefono',
                    'como los contacto', 'como contactarlos', 'como comunicarme',
                    'como hablar con ustedes', 'como hablar con el centro',
                    'numero de telefono', 'como me comunico', 'como los llamo',
                    'donde los encuentro', 'donde estan ustedes',
                    'quiero hablar con alguien', 'necesito hablar con alguien',
                    'con quien hablo', 'con quien me comunico'
                ],
                respuesta: '📞 Podés contactarnos por:<br>• WhatsApp: <a href="https://wa.me/543482211788?text=Hola,%20tengo%20una%20consulta" target="_blank">+54 3482 211788</a><br>• Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a><br>• Ubicación: Calle 44 Nº 1000'
            },

            // ============ WHATSAPP ============
            {
                id: 'whatsapp',
                claves: [
                    'whatsapp', 'wsp', 'wpp', 'wasap', 'zap', 'wasa', 'wp',
                    'numero de whatsapp', 'whatsapp del centro', 'whatsapp del ceut',
                    'whatsapp de estudiantes', 'whatsapp contacto',
                    'cual es el whatsapp', 'pasame el whatsapp', 'dame el whatsapp'
                ],
                respuesta: '💬 Nuestro WhatsApp es: <a href="https://wa.me/543482211788?text=Hola,%20tengo%20una%20consulta" target="_blank">+54 3482 211788</a>'
            },

            // ============ EMAIL ============
            {
                id: 'email',
                claves: [
                    'email', 'correo', 'mail', 'gmail', 'correo electronico',
                    'email de contacto', 'email del centro', 'email del ceut',
                    'mail del centro', 'mail del ceut', 'cual es el mail',
                    'cual es el correo', 'pasame el mail', 'dame el correo'
                ],
                respuesta: '📧 Nuestro email es: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>'
            },

            // ============ UBICACIÓN ============
            {
                id: 'ubicacion',
                claves: [
                    'ubicacion', 'direccion', 'donde estan', 'donde queda',
                    'donde queda la facu', 'donde queda la utn',
                    'donde esta la utn', 'como llego', 'como llegar',
                    'como llego a la facu', 'direccion de la utn',
                    'ubicacion utn', 'donde estan ubicados',
                    'donde queda la facultad', 'donde esta la facultad',
                    'donde es la facu', 'como llego a la utn'
                ],
                respuesta: '📍 Estamos en <strong>Calle 44 Nº 1000</strong>, Reconquista, Santa Fe.'
            },

            // ============ HORARIO ALUMNADO ============
            {
                id: 'horario_alumnado',
                claves: [
                    'horario alumnado', 'horario de alumnado', 'horario secretaria',
                    'horario de secretaria', 'horario de atencion', 'horarios de atencion',
                    'cuando atiende alumnado', 'cuando abre alumnado',
                    'a que hora atiende', 'horario administrativo',
                    'cuando abre la facu', 'cuando esta abierto',
                    'horario facultad', 'horario de la facu', 'horarios de la facu',
                    'cuando hay atencion', 'cuando puedo ir', 'cuando ir a alumnado',
                    'a que hora esta abierto', 'a que hora abren',
                    'cuando atienden', 'horario de atencion alumnado',
                    'esta abierto', 'esta abierto alumnado'
                ],
                respuesta: `<strong>🕐 HORARIOS DE ATENCIÓN</strong><br><br>
                    <strong>Alumnado</strong><br><br>
                    📅 <strong>Lunes a Viernes:</strong><br>
                    • 9:00 am - 10:00 pm<br><br>
                    📅 <strong>Sábados:</strong> Cerrado<br>
                    📅 <strong>Feriados:</strong> Cerrado<br><br>
                    📍 <strong>Ubicación:</strong> Calle 44 Nº 1000, Reconquista, Santa Fe<br><br>
                    📞 <strong>Teléfono:</strong> <a href="tel:+543482751911">+54 3482 751911</a>`,
                followup: 'contacto'
            },

            // ============ CONSTANCIA ============
            {
                id: 'constancia',
                claves: [
                    'constancia de alumno regular', 'constancia alumno regular',
                    'certificado de alumno regular', 'certificado alumno regular',
                    'como pido constancia', 'como pedir constancia',
                    'como obtener constancia', 'como saco constancia',
                    'como descargo constancia', 'papel de alumno regular',
                    'necesito constancia', 'quiero constancia', 'sacar constancia',
                    'pedir constancia', 'obtener constancia',
                    'necesito certificado', 'quiero certificado', 'sacar certificado',
                    'pedir certificado', 'constancia de alumno', 'certificado de alumno',
                    'papel de alumno', 'justificar alumno regular',
                    'justificar regularidad', 'certificado regular',
                    'constancia regular', 'constancia de regularidad',
                    'constancia estudio', 'constancia de estudio',
                    'necesito un papel', 'papel de la facu', 'papel para el trabajo',
                    'necesito certificado de alumno', 'como pido el certificado'
                ],
                respuesta: `<strong>📄 CONSTANCIA DE ALUMNO REGULAR</strong><br><br>
                    🖥️ <strong>Opción 1: Online</strong><br>
                    1. Ingresá a <a href="https://www3.frrq.utn.edu.ar/sysacadweb/loginalumno.asp" target="_blank">SYSACAD - Login Alumno</a><br>
                    2. Menú → <strong>"Descarga de certificados"</strong><br>
                    3. Elegí <strong>"Constancia de Alumno Regular"</strong><br>
                    4. Descargá el PDF<br><br>
                    🏢 <strong>Opción 2: Presencial</strong><br>
                    1. Ir a Alumnado en horario de atención<br>
                    2. Te la entregan en el momento<br><br>
                    ✅ Podés pedirla seas regular o no.<br>
                    💰 Es totalmente gratuita.<br><br>
                    📞 Consultas: <a href="tel:+543482751911">+54 3482 751911</a>`,
                followup: 'contacto'
            },

            // ============ SALUD ============
            {
                id: 'salud',
                claves: [
                    'psicologa', 'psicologia', 'psicologo', 'salud mental',
                    'salud estudiante', 'salud para estudiantes',
                    'apoyo psicologico', 'ayuda psicologica',
                    'adicciones', 'adiccion', 'consumo',
                    'bienestar estudiantil', 'bienestar',
                    'necesito hablar con alguien', 'necesito ayuda psicologica',
                    'me siento mal', 'estoy mal', 'ansiedad', 'depresion',
                    'contencion', 'terapia', 'ayuda emocional',
                    'contencion emocional', 'estoy triste', 'estoy bajon',
                    'no me siento bien', 'necesito contención', 'necesito apoyo'
                ],
                respuesta: `<strong>🏥 SALUD Y BIENESTAR ESTUDIANTIL</strong><br><br>
                    🧠 <strong>Psicóloga gratuita</strong><br><br>
                    La UTN FRRQ cuenta con una Psicóloga a disposición de los estudiantes, orientada a <strong>casos de adicciones graves</strong>.<br><br>
                    <strong>¿Cómo acceder?</strong><br>
                    • Hablá con el Centro de Estudiantes<br>
                    • Ellos se encargan de gestionar los trámites<br>
                    • Es gratuito y confidencial<br><br>
                    📞 <strong>Contacto:</strong> <a href="tel:+543482211788">+54 3482 211788</a><br>
                    📧 Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`,
                followup: 'salud'
            },

            // ============ PASANTÍAS ============
            {
                id: 'pasantia',
                claves: [
                    'pasantia', 'pasantias', 'bolsa de trabajo', 'empleo',
                    'busco trabajo', 'busco empleo', 'practica profesional',
                    'practicas', 'pasantia laboral', 'oferta laboral',
                    'ofertas laborales', 'hay trabajo', 'hay laburo', 'hay empleo',
                    'quiero trabajar', 'quiero laburar', 'quiero un trabajo',
                    'necesito trabajo', 'necesito laburo', 'necesito un laburo',
                    'conseguir trabajo', 'conseguir laburo', 'encontrar trabajo',
                    'cv', 'curriculum', 'armar cv', 'como hago un cv',
                    'ayuda con cv', 'empresas', 'trabajar en empresa',
                    'quiero trabajar mientras estudio', 'trabajo part time',
                    'busco laburo', 'conseguir laburo', 'donde busco trabajo',
                    'donde hay trabajo', 'donde hay laburo', 'trabajo para estudiantes',
                    'pasantia para estudiantes', 'quiero ganar experiencia'
                ],
                respuesta: `<strong>💼 PASANTÍAS Y BOLSA DE TRABAJO</strong><br><br>
                    El Centro de Estudiantes gestiona las consultas sobre pasantías.<br><br>
                    📌 <strong>¿Cómo funciona?</strong><br>
                    • Hablá con cualquier miembro del Centro de Estudiantes<br>
                    • Ellos derivan la petición a CyT (Ciencia y Tecnología) y Extensión<br>
                    • Los contactos se comunican con las empresas<br><br>
                    📝 <strong>Requisitos:</strong><br>
                    • Tener el CV bien armado y actualizado<br>
                    • Predisposición y responsabilidad<br><br>
                    📞 <strong>Contacto:</strong><br>
                    • WhatsApp: <a href="https://wa.me/543482211788?text=Hola,%20quiero%20info%20sobre%20pasantías" target="_blank">+54 3482 211788</a><br>
                    • Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`,
                followup: 'pasantia'
            },

            // ============ CARRERAS ============
            {
                id: 'carreras',
                claves: [
                    'carreras', 'carrera', 'que carreras hay', 'que carreras se dictan',
                    'carreras disponibles', 'carreras de la utn',
                    'carreras de la facu', 'que se puede estudiar',
                    'que puedo estudiar', 'que hay para estudiar',
                    'ingenieria electromecanica', 'licenciatura en administracion rural',
                    'ingenieria industrial', 'licenciatura en higiene y seguridad',
                    'tecnicatura en mecatronica', 'tecnicatura en logistica',
                    'tecnicatura en programacion', 'que ingenierias hay',
                    'carreras de grado', 'carreras cortas', 'tecnicaturas',
                    'que se estudia aca', 'que puedo hacer', 'carreras utn frrq',
                    'que carreras se pueden estudiar', 'que carreras ofrecen'
                ],
                respuesta: `<strong>🎓 CARRERAS QUE SE DICTAN EN LA UTN FRRQ</strong><br><br>
                    🔧 Ingeniería Electromecánica<br>
                    🌿 Licenciatura en Administración Rural<br>
                    🏭 Ingeniería Industrial<br>
                    🛡️ Licenciatura en Higiene y Seguridad<br>
                    ⚙️ Tecnicatura en Mecatrónica<br>
                    📦 Tecnicatura en Logística<br>
                    💻 Tecnicatura en Programación<br><br>
                    📞 <strong>Consultas:</strong> <a href="tel:+543482211788">+54 3482 211788</a><br>
                    📧 Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`,
                followup: 'carreras'
            },

            // ============ DURACIÓN CARRERAS ============
            {
                id: 'duracion_carreras',
                claves: [
                    'duracion de carreras', 'cuanto dura', 'cuantos años dura',
                    'cuanto dura la carrera', 'cuantos años son',
                    'duracion de la carrera', 'cuantos años son las carreras',
                    'duracion carreras', 'cuanto tiempo dura',
                    'cuantos años hay que estudiar', 'cuanto se estudia',
                    'cuantos años tengo que estudiar', 'cuanto dura estudiar',
                    'cuanto tiempo tengo que estudiar'
                ],
                respuesta: `<strong>📊 DURACIÓN DE LAS CARRERAS</strong><br><br>
                    🔧 Ingeniería Electromecánica → 5 años<br>
                    🏭 Ingeniería Industrial → 5 años<br>
                    🌿 Licenciatura en Administración Rural → 4 años<br>
                    🛡️ Licenciatura en Higiene y Seguridad → 2 años<br>
                    ⚙️ Tecnicatura en Mecatrónica → 2.5 años<br>
                    📦 Tecnicatura en Logística → 2.5 años<br>
                    💻 Tecnicatura en Programación → 2 años<br><br>
                    📞 <strong>Consultas:</strong> <a href="tel:+543482211788">+54 3482 211788</a><br>
                    📧 Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`
            },

            // ============ RECURSAR ============
            {
                id: 'recursar',
                claves: [
                    'recursar', 'recursar materias', 'volver a cursar',
                    'recurse', 'recurso', 'como recursar',
                    'como vuelvo a cursar', 'ser oyente', 'oyente', 'ir de oyente',
                    'repetir materia', 'repetir una materia', 'repetir cursada',
                    'volver a hacer una materia', 'volver a hacer materia',
                    'me fue mal en una materia', 'desaprobe una materia',
                    'no aprobe', 'que pasa si desapruebo',
                    'perdi la regularidad', 'que pasa si no apruebo',
                    'tengo que recursar', 'debo recursar', 'necesito recursar'
                ],
                respuesta: `<strong>📉 RECURSAR MATERIAS</strong><br><br>
                    <strong>¿Qué significa?</strong><br>
                    Volver a cursar una materia que ya cursaste antes.<br><br>
                    <strong>¿Cómo se hace?</strong><br>
                    1. Cuando se abra la inscripción a cursado, anotate por SYSACAD<br>
                    2. Si recursás estando regular, solicitá que te añadan en Alumnado si no figura en SYSACAD<br>
                    3. Asistí a las clases como cualquier alumno<br>
                    4. También podés preguntar al profesor si podés ser oyente (sin inscribirte)<br><br>
                    ⚠️ <strong>Importante:</strong> Consultá en Alumnado por tu caso particular.<br><br>
                    📞 <strong>Consultas:</strong> <a href="tel:+543482751911">+54 3482 751911</a> (Alumnado)`
            },

            // ============ REGLAMENTO ============
            {
                id: 'reglamento',
                claves: [
                    'reglamento de estudio', 'reglamento', 'ordenanza 1549',
                    'derechos del estudiante', 'derechos', 'estudiante regular',
                    'condicion de regular', 'como ser regular',
                    'inasistencias', 'faltas', 'cuantas faltas puedo tener',
                    'cuantas faltas tengo', 'cuanto puedo faltar',
                    'limite de faltas', 'que pasa si falto mucho',
                    'como me hago regular', 'como mantener regularidad',
                    'como mantener la regularidad', 'perder regularidad',
                    'que es ser regular', 'alumno regular', 'alumno libre',
                    'alumno vocacional', 'derechos estudiante', 'deberes estudiante',
                    'sanciones', 'reglamento utn', 'que derechos tengo',
                    'cuantas faltas son', 'cuantas faltas permiten'
                ],
                respuesta: `<strong>📋 REGLAMENTO DE ESTUDIO (Ordenanza 1549)</strong><br><br>
                    📌 <strong>ESTUDIANTE REGULAR</strong><br>
                    • Aprobá mínimo 2 materias por ciclo lectivo (no cuenta el año de ingreso)<br>
                    • Si no aprobás 2 → pasás a NO REGULAR<br>
                    • Volvés a REGULAR al aprobar 2 materias<br><br>
                    📌 <strong>ASISTENCIA</strong><br>
                    • Podés faltar hasta el 25%<br>
                    • Con justificación podés pedir hasta el 40%<br><br>
                    📌 <strong>APROBACIÓN</strong><br>
                    • Directa: sin final (evaluación continua)<br>
                    • No directa: rendís final (se aprueba con 6 o más)<br>
                    • 4 finales desaprobados en la misma materia → recursás<br><br>
                    📌 <strong>RECURSAR</strong><br>
                    • Si ya tenés el cursado aprobado, anotate en Alumnado y no perdés la regularidad<br><br>
                    📄 <strong>Descargar Ordenanza 1549 completa:</strong><br>
                    <a href="archivos/Ord-1549-Reglamento-de-Estudio-para-Carreras-de-Grado.pdf" target="_blank">Ord-1549-Reglamento-de-Estudio.pdf</a><br><br>
                    📞 Consultas: <a href="tel:+543482751911">+54 3482 751911</a> (Alumnado)`,
                followup: 'reglamento'
            },

            // ============ VIOLENCIA ============
            {
                id: 'violencia',
                claves: [
                    'violencia de genero', 'violencia', 'acoso', 'abuso',
                    'maltrato', 'ayuda por violencia', 'denuncia', 'denunciar',
                    'sufro violencia', 'me acosan', 'me acosa', 'me maltratan',
                    'abuso sexual', 'acoso sexual', 'acoso laboral',
                    'necesito denunciar', 'quiero denunciar', 'como denunciar',
                    'donde denunciar', 'ayuda por acoso', 'ayuda violencia',
                    'protocolo violencia', 'me estan acosando', 'sufro acoso'
                ],
                respuesta: `<strong>🆘 VIOLENCIA DE GÉNERO</strong><br><br>
                    Si estás atravesando una situación de violencia de género, no estás sola/o.<br><br>
                    📌 <strong>¿Qué hacer?</strong><br>
                    • Contactá al Centro de Estudiantes<br>
                    • Ellos te van a orientar y acompañar<br>
                    • Es confidencial<br><br>
                    📞 <strong>Contacto:</strong><br>
                    • WhatsApp: <a href="https://wa.me/543482211788?text=Hola,%20necesito%20ayuda" target="_blank">+54 3482 211788</a><br>
                    • Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`
            },

            // ============ SUMARSE AL CEUT ============
            {
                id: 'sumarse',
                claves: [
                    'voluntariado', 'ser voluntario', 'ser voluntaria',
                    'formar parte del centro', 'formar parte del ceut',
                    'ser parte del centro', 'ser parte del ceut',
                    'como me sumo al centro', 'como ser del centro de estudiantes',
                    'integrar el centro', 'integrar el ceut',
                    'colaborar con el centro', 'ayudar en el centro',
                    'delegado', 'delegados', 'delegada', 'delegadas',
                    'quiero ser delegado', 'quiero ser parte',
                    'quiero sumarme', 'quiero unirme', 'quiero colaborar',
                    'como puedo ayudar', 'como ayudar en la facu',
                    'ser parte del centro', 'participar en el centro',
                    'me quiero sumar', 'me quiero unir', 'ayudar al centro'
                ],
                respuesta: `<strong>🤝 SUMARSE AL CEUT</strong><br><br>
                    ¿Querés ser parte del Centro de Estudiantes?<br><br>
                    📌 <strong>Requisitos:</strong><br>
                    • 1er año: entrás como voluntario/a<br>
                    • Grado: 6 materias regulares o aprobadas<br>
                    • Tecnicaturas: 3 materias aprobadas<br>
                    • Mientras no cumplas los requisitos, seguís como voluntario/a<br><br>
                    📌 <strong>¿Cómo postularte?</strong><br>
                    • Hablá con cualquier miembro del CEUT<br>
                    • Se completa un formulario de Google de relevamiento<br>
                    • Se evalúa desempeño, propuestas y trabajo en grupo<br><br>
                    📌 <strong>¿Qué hace el CEUT?</strong><br>
                    • Actividades y reclamos de cada carrera<br>
                    • Delegados por año<br><br>
                    📞 <strong>Contacto:</strong><br>
                    • WhatsApp: <a href="https://wa.me/543482211788?text=Hola,%20quiero%20sumarme%20al%20CEUT" target="_blank">+54 3482 211788</a><br>
                    • Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`
            },

            // ============ QUÉ HACE EL CEUT ============
            {
                id: 'que_hace_ceut',
                claves: [
                    'que hace el ceut', 'que hace el centro',
                    'que hace el centro de estudiantes', 'para que sirve el ceut',
                    'para que sirve el centro', 'funciones del ceut',
                    'funciones del centro', 'que es el ceut',
                    'que es el centro de estudiantes', 'quienes son el ceut',
                    'quienes son del centro', 'que hacen ustedes',
                    'a que se dedican', 'para que estan', 'que rol cumplen',
                    'que hace el centro de estudiantes utn'
                ],
                respuesta: `<strong>🏥 ¿QUÉ HACE EL CEUT?</strong><br><br>
                    El Centro de Estudiantes (CEUT FETI) es el órgano de representación de los estudiantes de la UTN FRRQ.<br><br>
                    📌 <strong>Nuestras funciones principales:</strong><br><br>
                    🎓 <strong>REPRESENTACIÓN</strong><br>
                    • Defensa de los derechos estudiantiles<br>
                    • Canal de diálogo entre estudiantes y autoridades<br>
                    • Participación en la vida universitaria<br><br>
                    📚 <strong>ACOMPAÑAMIENTO ACADÉMICO</strong><br>
                    • Tutorías<br>
                    • Difusión de info académica<br>
                    • Acompañamiento en licencias y trámites<br>
                    • Buzón de quejas y propuestas (anónimo)<br><br>
                    💼 <strong>GESTIÓN</strong><br>
                    • Pasantías (con CyT y Extensión)<br>
                    • Psicóloga (casos de adicciones)<br>
                    • Cursos gratuitos / Talleres<br>
                    • Repositorio de logos UTN<br><br>
                    💬 <strong>COMUNIDAD</strong><br>
                    • Grupos de WhatsApp por carrera<br>
                    • Actividades y reclamos por carrera<br>
                    • Delegados por año<br><br>
                    📌 <strong>¿Querés ser parte?</strong><br>
                    • Podés ser voluntario/a desde 1er año<br>
                    • Preguntá por "sumarse al CEUT"<br><br>
                    📞 <strong>Contacto:</strong><br>
                    • WhatsApp: <a href="https://wa.me/543482211788?text=Hola,%20tengo%20una%20consulta" target="_blank">+54 3482 211788</a><br>
                    • Email: <a href="mailto:feticeut@gmail.com">feticeut@gmail.com</a>`
            }
        ]
    };

    const STORAGE_KEY = 'ceut_chat_historial';
    const SEEN_KEY = 'ceut_chat_visto';
    const NOT_FOUND_KEY = 'ceut_chat_no_encontradas';
    const ABRIR_KEY = 'ceut_chat_abierto';

    // ===== DICCIONARIOS DE NORMALIZACIÓN =====

    // Sinónimos: variantes → término canónico
    const SINONIMOS = {
        // Inscribirse/anotarse
        'anoto': 'anotar', 'anotar': 'anotar', 'anotarme': 'anotar', 'anotarse': 'anotar',
        'anotaron': 'anotar', 'anotan': 'anotar', 'anotando': 'anotar', 'anote': 'anotar',
        'inscribo': 'inscribir', 'inscribir': 'inscribir', 'inscribirme': 'inscribir',
        'inscribirse': 'inscribir', 'inscripto': 'inscribir', 'inscripta': 'inscribir',
        'inscripciones': 'inscripcion', 'inscripcion': 'inscripcion',
        'registro': 'inscribir', 'registrarme': 'inscribir',
        'abrio': 'abrir', 'abren': 'abrir', 'abrieron': 'abrir',
        'abierta': 'abrir', 'abierto': 'abrir',

        // Materia/cursado
        'materias': 'materia', 'mate': 'materia', 'materita': 'materia',
        'cursada': 'cursado', 'cursar': 'cursado', 'cursadas': 'cursado',
        'cursando': 'cursado', 'cursito': 'cursado',
        'comision': 'cursado',

        // Mesa/examen/final
        'mesas': 'mesa', 'mesita': 'mesa',
        'examenes': 'examen', 'exa': 'examen', 'examencito': 'examen',
        'finales': 'final', 'finalito': 'final',
        'rindo': 'rendir', 'rendia': 'rendir', 'rendicion': 'rendir',
        'rendi': 'rendir', 'finalear': 'rendir', 'finaleo': 'rendir',
        'turnos': 'turno', 'llamados': 'llamado',
        'fechas': 'fecha',

        // Trámites
        'tramite': 'tramite', 'tramites': 'tramite',
        'formularios': 'formulario', 'form': 'formulario',
        'solicitudes': 'solicitud', 'solicitar': 'solicitud',
        'pedir': 'solicitud', 'pido': 'solicitud', 'pedi': 'solicitud',
        'planillas': 'formulario',

        // Licencia
        'licencias': 'licencia', 'pausar': 'licencia', 'pauso': 'licencia',
        'pausa': 'licencia', 'suspender': 'licencia', 'suspendo': 'licencia',
        'suspension': 'licencia', 'dejar': 'licencia', 'dejo': 'licencia',

        // Contacto
        'contactar': 'contacto', 'contactarme': 'contacto', 'contactarlos': 'contacto',
        'comunicarme': 'contacto', 'comunicarse': 'contacto',
        'hablar': 'contacto', 'hablo': 'contacto',
        'escribir': 'contacto', 'escribo': 'contacto',
        'consultar': 'contacto', 'consulto': 'contacto',
        'consulta': 'contacto', 'consultas': 'contacto',
        'telefono': 'telefono', 'tel': 'telefono', 'celular': 'telefono',
        'numero': 'telefono', 'num': 'telefono',
        'wsp': 'whatsapp', 'wpp': 'whatsapp', 'wasap': 'whatsapp',
        'wasa': 'whatsapp', 'zap': 'whatsapp', 'wp': 'whatsapp',
        'correo': 'email', 'mail': 'email', 'gmail': 'email',
        'ubicacion': 'ubicacion', 'direccion': 'ubicacion', 'dir': 'ubicacion',
        'donde': 'ubicacion', 'dond': 'ubicacion',
        'estan': 'ubicacion', 'queda': 'ubicacion', 'ubicados': 'ubicacion',

        // Carreras
        'carreras': 'carrera', 'carrerita': 'carrera',
        'estudiar': 'carrera', 'estudio': 'carrera', 'estudios': 'carrera',
        'ingenieria': 'carrera', 'tecnicatura': 'carrera', 'licenciatura': 'carrera',

        // Salud
        'psicologa': 'psicologa', 'psicologia': 'psicologa', 'psicologo': 'psicologa',
        'mental': 'salud', 'emocional': 'salud',
        'auxilio': 'ayuda', 'help': 'ayuda',
        'adiccion': 'adicciones', 'adicciones': 'adicciones',
        'contencion': 'salud', 'depresion': 'salud',
        'ansiedad': 'salud',

        // Pasantías
        'pasantias': 'pasantia', 'pasantia': 'pasantia',
        'trabajo': 'pasantia', 'trabajar': 'pasantia', 'trabajando': 'pasantia',
        'empleos': 'pasantia', 'empleo': 'pasantia', 'laboral': 'pasantia',
        'laburo': 'pasantia', 'laburar': 'pasantia', 'laburando': 'pasantia',
        'curriculum': 'pasantia', 'cv': 'pasantia', 'currículum': 'pasantia',

        // Biblioteca
        'libro': 'biblioteca', 'libros': 'biblioteca', 'librito': 'biblioteca',
        'catalogo': 'biblioteca', 'digital': 'biblioteca',
        'elibro': 'biblioteca', 'koha': 'biblioteca', 'welibrary': 'biblioteca',
        'apuntes': 'biblioteca', 'materiales': 'biblioteca', 'material': 'biblioteca',

        // Constancia
        'constancias': 'constancia', 'certificado': 'constancia',
        'certificados': 'constancia', 'papel': 'constancia', 'papeles': 'constancia',

        // Queja
        'quejas': 'queja', 'reclamo': 'queja', 'reclamos': 'queja',
        'reclamar': 'queja', 'quejarme': 'queja', 'quejarse': 'queja',
        'propuestas': 'propuesta', 'sugerencias': 'sugerencia',
        'sugerir': 'sugerencia', 'buzon': 'queja',

        // Tutorías
        'tutorias': 'tutoria', 'tutor': 'tutoria', 'tutores': 'tutoria',

        // Moodle / Sysacad
        'aula': 'moodle', 'virtual': 'moodle', 'plataforma': 'moodle',
        'campus': 'moodle',
        'sistema': 'sysacad', 'siu': 'sysacad', 'sistemas': 'sysacad',

        // Recursar
        'recurso': 'recursar', 'recurse': 'recursar', 'recursando': 'recursar',
        'recursada': 'recursar', 'repetir': 'recursar', 'repito': 'recursar',

        // Reglamento
        'ordenanza': 'reglamento', 'derechos': 'reglamento', 'derecho': 'reglamento',
        'inasistencias': 'reglamento', 'faltas': 'reglamento', 'falta': 'reglamento',

        // Feriados/recesos
        'feriados': 'feriado', 'recesos': 'receso',
        'vacaciones': 'receso', 'vacacion': 'receso', 'vacas': 'receso',

        // WiFi/copiado
        'internet': 'wifi', 'red': 'wifi', 'conexion': 'wifi',
        'contraseña': 'wifi', 'clave': 'wifi', 'password': 'wifi',
        'copias': 'copiado', 'impresion': 'copiado',
        'imprimir': 'copiado', 'fotocopia': 'copiado', 'fotocopias': 'copiado',

        // Violencia
        'acoso': 'violencia', 'abuso': 'violencia', 'maltrato': 'violencia',
        'denuncia': 'violencia', 'denunciar': 'violencia', 'denuncio': 'violencia',
        'genero': 'violencia',

        // CEUT
        'sumarme': 'sumar', 'sumar': 'sumar', 'unirme': 'sumar', 'unir': 'sumar',
        'voluntario': 'sumar', 'voluntariado': 'sumar', 'voluntaria': 'sumar',
        'integrar': 'sumar', 'colaborar': 'sumar',
        'delegado': 'sumar', 'delegada': 'sumar', 'delegados': 'sumar',
        'centro': 'ceut', 'centrito': 'ceut', 'ceut': 'ceut',

        // Cursos
        'cursos': 'curso', 'capacitacion': 'curso',
        'talleres': 'curso', 'taller': 'curso', 'capacitarme': 'curso',

        // Logos
        'logos': 'logo', 'logotipo': 'logo', 'logotipos': 'logo',
        'isotipo': 'logo', 'isologo': 'logo',

        // ===== ABREVIATURAS ARGENTINAS =====
        'xq': 'porque', 'x': 'por', 'q': 'que', 'tmb': 'tambien',
        'tngo': 'tengo', 'tnes': 'tienes', 'xfa': 'porfavor', 'pf': 'porfavor',
        'dnd': 'donde', 'dond': 'donde', 'cdo': 'cuando', 'cd': 'cuando',
        'msj': 'mensaje', 'info': 'informacion', 'ok': 'okay',
        'tb': 'tambien', 'tbn': 'tambien', 'slds': 'saludos',
        'xfi': 'porfavor', 'fvor': 'porfavor', 'fav': 'porfavor',

        // ===== INGLÉS BÁSICO =====
        'the': '_stop', 'a': '_stop', 'an': '_stop', 'of': '_stop',
        'to': '_stop', 'in': '_stop', 'on': '_stop', 'at': '_stop',
        'library': 'biblioteca', 'book': 'biblioteca', 'books': 'biblioteca',
        'exam': 'examen', 'exams': 'examen', 'finals': 'final',
        'subject': 'materia', 'subjects': 'materia', 'course': 'cursado',
        'password': 'wifi', 'career': 'carrera', 'degree': 'carrera',
        'help': 'ayuda', 'contact': 'contacto',
        'where': 'ubicacion', 'when': 'cuando', 'how': 'como',
        'what': 'que', 'who': 'quien',

        // ===== STOPWORDS =====
        'como': '_stop', 'que': '_stop', 'cual': '_stop', 'quien': '_stop',
        'es': '_stop', 'son': '_stop', 'esta': '_stop', 'estan': 'ubicacion',
        'para': '_stop', 'por': '_stop', 'con': '_stop', 'sin': '_stop',
        'una': '_stop', 'uno': '_stop', 'unos': '_stop', 'unas': '_stop', 'un': '_stop',
        'el': '_stop', 'la': '_stop', 'los': '_stop', 'las': '_stop',
        'de': '_stop', 'del': '_stop', 'al': '_stop',
        'y': '_stop', 'o': '_stop', 'u': '_stop', 'e': '_stop',
        'me': '_stop', 'te': '_stop', 'se': '_stop', 'nos': '_stop',
        'mi': '_stop', 'tu': '_stop', 'su': '_stop', 'mis': '_stop',
        'puedo': '_stop', 'puede': '_stop', 'podre': '_stop',
        'quiero': '_stop', 'quiere': '_stop', 'quisiera': '_stop',
        'necesito': '_stop', 'necesita': '_stop',
        'hay': '_stop', 'tengo': '_stop', 'tiene': '_stop',
        'hacer': '_stop', 'hago': '_stop', 'sacar': '_stop', 'saco': '_stop',
        'ver': '_stop', 'veo': '_stop', 'mirar': '_stop',
        'informacion': '_stop', 'algo': '_stop', 'algun': '_stop',
        'mas': '_stop', 'muy': '_stop', 'sera': '_stop', 'seria': '_stop',
        'va': '_stop', 'voy': '_stop', 'vas': '_stop',
        'che': '_stop', 'eh': '_stop', 'hola': '_stop',
        'saber': '_stop', 'sabe': '_stop', 'podria': '_stop', 'podrias': '_stop',
        'favor': '_stop', 'porfavor': '_stop', 'gracias': '_stop',
        'buenas': '_stop', 'buenos': '_stop', 'tardes': '_stop', 'noches': '_stop',
        'dias': '_stop', 'dia': '_stop', 'dia': '_stop'
    };

    // ===== UTILIDADES =====

    function normalizar(texto) {
        return String(texto || '')
            .toLowerCase()
            .trim()
            .replace(/[ñÑ]/g, 'n')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[¿¡?!.,;:"'`´]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function quitarEmojis(texto) {
        return texto.replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|[\u{1F000}-\u{1F02F}]/gu, ' ');
    }

    function raiz(p) {
        if (p.length <= 4) return p;
        if (p.endsWith('es')) return p.slice(0, -2);
        if (p.endsWith('s')) return p.slice(0, -1);
        return p;
    }

    // Levenshtein para typos
    function levenshtein(a, b) {
        if (a === b) return 0;
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // Procesar texto: normalizar + emojis + sinónimos + stemming
    function procesarTexto(texto) {
        const sinEmojis = quitarEmojis(texto);
        const normalizado = normalizar(sinEmojis);
        const palabras = normalizado.split(/\s+/).filter(p => p.length > 1);

        return palabras
            .map(p => {
                if (SINONIMOS[p] === '_stop') return null;
                if (SINONIMOS[p]) return SINONIMOS[p];
                const r = raiz(p);
                if (SINONIMOS[r] === '_stop') return null;
                if (SINONIMOS[r]) return SINONIMOS[r];
                if (r.length <= 2) return null;
                return r;
            })
            .filter(p => p !== null);
    }

    // Comparar dos palabras con tolerancia a typos
    function palabrasSimilares(a, b) {
        if (a === b) return true;
        if (a.length < 4 || b.length < 4) return false;
        const dist = levenshtein(a, b);
        const maxLen = Math.max(a.length, b.length);
        return dist <= 2 && dist / maxLen <= 0.3;
    }

    // ===== BÚSQUEDA =====

    function buscarRespuesta(texto) {
        const t = normalizar(quitarEmojis(texto));
        const palabrasUsuario = procesarTexto(texto);

        if (palabrasUsuario.length === 0 && t.length < 3) return null;

        let mejorMatch = null;
        let mejorScore = 0;
        let mejorClave = '';

        for (const item of CHATBOT_CONFIG.respuestas) {
            // 1. Match exacto por substring
            for (const clave of item.claves) {
                const claveNorm = normalizar(clave);
                if (claveNorm.length >= 4 && t.includes(claveNorm)) {
                    const score = 1000 + (claveNorm.length * 10);
                    if (score > mejorScore) {
                        mejorScore = score;
                        mejorMatch = item;
                        mejorClave = clave;
                    }
                }
            }

            // 2. Match por INTENCIÓN (tags)
            const intencion = CHATBOT_CONFIG.intenciones[item.id];
            if (intencion && intencion.tags) {
                let coincidencias = 0;
                for (const tag of intencion.tags) {
                    if (palabrasUsuario.includes(tag)) coincidencias++;
                    else if (t.includes(tag)) coincidencias++;
                }
                if (coincidencias > 0) {
                    const score = coincidencias * (intencion.prioridad || 50) + 200;
                    if (score > mejorScore) {
                        mejorScore = score;
                        mejorMatch = item;
                        mejorClave = `[INTENCION:${item.id}]`;
                    }
                }
            }

            // 3. Match fuzzy por palabras
            for (const clave of item.claves) {
                const palabrasClave = procesarTexto(clave);
                if (palabrasClave.length === 0) continue;

                let coincidencias = 0;
                for (const pc of palabrasClave) {
                    if (palabrasUsuario.includes(pc)) {
                        coincidencias++;
                    } else {
                        // Buscar similar (typos)
                        for (const pu of palabrasUsuario) {
                            if (palabrasSimilares(pu, pc)) {
                                coincidencias += 0.7;
                                break;
                            }
                        }
                    }
                }

                if (coincidencias > 0) {
                    const ratio = coincidencias / palabrasClave.length;
                    const score = (coincidencias * 25) + (ratio * 20) + (palabrasClave.length * 3);
                    const umbral = palabrasClave.length === 1 ? 20 : 15;
                    if (score >= umbral && score > mejorScore) {
                        mejorScore = score;
                        mejorMatch = item;
                        mejorClave = clave;
                    }
                }
            }
        }

        if (window.DEBUG_CHAT) {
            console.log('🔍 [Chatbot]');
            console.log('  Texto:', texto);
            console.log('  Procesado:', palabrasUsuario);
            console.log('  Match:', mejorMatch ? mejorMatch.id : 'NINGUNO');
            console.log('  Clave:', mejorClave);
            console.log('  Score:', mejorScore);
        }

        return mejorMatch;
    }

    // ===== RESTO DE FUNCIONES =====

    function horaActual() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    function fechaActual() {
        return new Date().toISOString().split('T')[0];
    }

    function etiquetaFecha(fecha) {
        const hoy = fechaActual();
        const ayer = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (fecha === hoy) return 'Hoy';
        if (fecha === ayer) return 'Ayer';
        const d = new Date(fecha);
        const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        return `${d.getDate()} de ${meses[d.getMonth()]}`;
    }

    function guardarNoEncontrada(texto) {
        try {
            const guardado = JSON.parse(localStorage.getItem(NOT_FOUND_KEY) || '[]');
            guardado.push({ texto, fecha: new Date().toISOString() });
            if (guardado.length > 100) guardado.shift();
            localStorage.setItem(NOT_FOUND_KEY, JSON.stringify(guardado));
        } catch (e) {}
    }

    function escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    function cargarHistorial() {
        try {
            const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            if (guardado.length === 0) {
                agregarMensaje('bot', CHATBOT_CONFIG.mensajeBienvenida, false, true);
            } else {
                let ultimaFecha = null;
                guardado.forEach((m) => {
                    const fecha = m.fecha || fechaActual();
                    if (fecha !== ultimaFecha) {
                        agregarSeparadorFecha(fecha);
                        ultimaFecha = fecha;
                    }
                    renderMensaje(m.tipo, m.texto, m.hora, m.fecha, false);
                });
                scrollAbajo();
            }
        } catch (e) {
            agregarMensaje('bot', CHATBOT_CONFIG.mensajeBienvenida, false, true);
        }
    }

    function guardarMensaje(tipo, texto, hora, fecha) {
        try {
            const guardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            const textoGuardar = texto.length > 800 ? texto.substring(0, 800) + '...' : texto;
            guardado.push({ tipo, texto: textoGuardar, hora, fecha });
            if (guardado.length > 60) guardado.shift();
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(guardado));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    localStorage.removeItem(STORAGE_KEY);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ tipo, texto: textoGuardar, hora, fecha }]));
                }
            }
        } catch (e) {}
    }

    // ===== HTML =====
    const html = `
        <button class="chat-toggle" id="chatToggle" aria-label="Abrir chat">
            <i class="fas fa-comment-dots"></i>
            <span class="badge-notif" id="chatBadge" style="display:none;">1</span>
        </button>

        <div class="chat-window" id="chatWindow" role="dialog" aria-label="Chat de ayuda">
            <div class="chat-header">
                <div class="chat-header-info">
                    <div class="chat-avatar"><img src="archivos/Logo CEUT_FETI.svg" alt="CEUT FETI" /></div>
                    <div>
                        <strong>${CHATBOT_CONFIG.nombreBot}</strong>
                        <small>${CHATBOT_CONFIG.subtitulo}</small>
                    </div>
                </div>
                <div class="chat-header-actions">
                    <button id="chatClear" title="Borrar conversación" aria-label="Borrar conversación">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button id="chatClose" title="Cerrar" aria-label="Cerrar chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="chat-messages" id="chatMessages"></div>

            <div class="chat-suggestions" id="chatSuggestions"></div>

            <form class="chat-input" id="chatForm">
                <input type="text" id="chatInput" placeholder="Escribí tu pregunta..." autocomplete="off" maxlength="200" inputmode="text" enterkeyhint="send" />
                <button type="submit" aria-label="Enviar"><i class="fas fa-paper-plane"></i></button>
            </form>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    const toggle = document.getElementById('chatToggle');
    const window_ = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('chatClose');
    const clearBtn = document.getElementById('chatClear');
    const messages = document.getElementById('chatMessages');
    const suggestions = document.getElementById('chatSuggestions');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const badge = document.getElementById('chatBadge');

    function agregarSeparadorFecha(fecha) {
        const sep = document.createElement('div');
        sep.className = 'chat-date-separator';
        sep.innerHTML = `<span>${etiquetaFecha(fecha)}</span>`;
        messages.appendChild(sep);
    }

    function renderMensaje(tipo, texto, hora, fecha, animar = true, followupKey = null) {
        const row = document.createElement('div');
        row.className = `chat-row ${tipo}`;
        if (!animar) row.style.animation = 'none';

        const avatar = document.createElement('div');
        avatar.className = `chat-msg-avatar ${tipo}-avatar`;
        if (tipo === 'bot') {
            avatar.innerHTML = '<img src="archivos/Logo CEUT_FETI.svg" alt="Bot" />';
        } else {
            avatar.textContent = '👤';
        }
        row.appendChild(avatar);

        const burbuja = document.createElement('div');
        burbuja.className = `chat-msg ${tipo}`;

        // Escapar HTML si es usuario
        const contenidoSeguro = tipo === 'user' ? escaparHTML(texto) : texto;
        burbuja.innerHTML = `${contenidoSeguro}<span class="msg-hora">${hora}</span>`;

        if (tipo === 'bot' && followupKey) {
            const followups = CHATBOT_CONFIG.followups[followupKey] || CHATBOT_CONFIG.followups.default;
            if (followups && followups.length) {
                const followupDiv = document.createElement('div');
                followupDiv.className = 'chat-followup';
                followups.forEach(f => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.innerHTML = f.texto;
                    btn.addEventListener('click', () => enviarMensaje(f.clave, f.texto));
                    followupDiv.appendChild(btn);
                });
                burbuja.appendChild(followupDiv);
            }
        }

        row.appendChild(burbuja);
        messages.appendChild(row);
        scrollAbajo();
    }

    function agregarMensaje(tipo, texto, guardar = true, primeraVez = false, followupKey = null) {
        const hora = horaActual();
        const fecha = fechaActual();

        const ultimoSep = messages.querySelector('.chat-date-separator:last-of-type span');
        const ultimoSepTexto = ultimoSep ? ultimoSep.textContent : null;
        const hoyTexto = etiquetaFecha(fecha);
        if (ultimoSepTexto !== hoyTexto) {
            agregarSeparadorFecha(fecha);
        }

        if (tipo === 'bot' && !primeraVez) {
            mostrarEscribiendo();
            setTimeout(() => {
                ocultarEscribiendo();
                renderMensaje(tipo, texto, hora, fecha, true, followupKey);
                if (guardar) guardarMensaje(tipo, texto, hora, fecha);
            }, 0);
        } else {
            renderMensaje(tipo, texto, hora, fecha, true, followupKey);
            if (guardar) guardarMensaje(tipo, texto, hora, fecha);
        }
    }

    function mostrarEscribiendo() {
        const row = document.createElement('div');
        row.className = 'chat-row bot';
        row.id = 'typingRow';

        const avatar = document.createElement('div');
        avatar.className = 'chat-msg-avatar bot-avatar';
        avatar.innerHTML = '<img src="archivos/Logo CEUT_FETI.svg" alt="Bot" />';
        row.appendChild(avatar);

        const typing = document.createElement('div');
        typing.className = 'chat-msg bot typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        row.appendChild(typing);

        messages.appendChild(row);
        scrollAbajo();
    }

    function ocultarEscribiendo() {
        const el = document.getElementById('typingRow');
        if (el) el.remove();
    }

    function enviarMensaje(textoClave, textoVisible) {
        const texto = textoVisible || textoClave;
        if (!texto.trim()) return;

        const hora = horaActual();
        const fecha = fechaActual();
        const ultimoSep = messages.querySelector('.chat-date-separator:last-of-type span');
        const ultimoSepTexto = ultimoSep ? ultimoSep.textContent : null;
        const hoyTexto = etiquetaFecha(fecha);
        if (ultimoSepTexto !== hoyTexto) {
            agregarSeparadorFecha(fecha);
        }
        renderMensaje('user', texto, hora, fecha);
        guardarMensaje('user', texto, hora, fecha);

        const match = buscarRespuesta(textoClave || texto);

        if (!match) {
            guardarNoEncontrada(texto);
        }

        const respuesta = match ? match.respuesta : CHATBOT_CONFIG.mensajeNoEncontrado;
        const followupKey = match ? (match.followup || 'default') : null;

        mostrarEscribiendo();
        const delay = CHATBOT_CONFIG.delayMinimo + Math.random() * (CHATBOT_CONFIG.delayMaximo - CHATBOT_CONFIG.delayMinimo);

        setTimeout(() => {
            ocultarEscribiendo();
            renderMensaje('bot', respuesta, horaActual(), fechaActual(), true, followupKey);
            guardarMensaje('bot', respuesta, horaActual(), fechaActual());
        }, delay);
    }

    function scrollAbajo() {
        requestAnimationFrame(() => {
            messages.scrollTop = messages.scrollHeight;
        });
    }

    function abrirChat() {
        window_.classList.add('abierto');
        toggle.classList.add('activo');
        toggle.innerHTML = '<i class="fas fa-times"></i>';
        toggle.setAttribute('aria-label', 'Cerrar chat');
        badge.style.display = 'none';
        localStorage.setItem(SEEN_KEY, '1');
        localStorage.setItem(ABRIR_KEY, '1');

        if (window.innerWidth <= 640) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }

        setTimeout(() => {
            if (window.innerWidth > 640) input.focus();
        }, 350);
    }

    function cerrarChat() {
        window_.classList.remove('abierto');
        toggle.classList.remove('activo');
        toggle.innerHTML = '<i class="fas fa-comment-dots"></i>';
        toggle.setAttribute('aria-label', 'Abrir chat');
        localStorage.setItem(ABRIR_KEY, '0');

        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';

        if (!localStorage.getItem(SEEN_KEY)) {
            badge.style.display = 'flex';
        }
    }

    function renderizarSugerencias() {
        suggestions.innerHTML = '';
        CHATBOT_CONFIG.sugerencias.forEach((s, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = s.texto;
            btn.style.animationDelay = `${i * 0.03}s`;
            btn.addEventListener('click', () => enviarMensaje(s.clave, s.texto));
            suggestions.appendChild(btn);
        });
    }

    toggle.addEventListener('click', () => {
        window_.classList.contains('abierto') ? cerrarChat() : abrirChat();
    });

    closeBtn.addEventListener('click', cerrarChat);

    clearBtn.addEventListener('click', () => {
        if (confirm('¿Borrar toda la conversación?')) {
            localStorage.removeItem(STORAGE_KEY);
            messages.innerHTML = '';
            agregarMensaje('bot', CHATBOT_CONFIG.mensajeBienvenida, false, true, 'default');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = input.value.trim();
        if (!texto) return;
        input.value = '';
        enviarMensaje(texto);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && window_.classList.contains('abierto')) {
            cerrarChat();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 640 && !window_.classList.contains('abierto')) {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
            if (window.innerWidth <= 640 && window_.classList.contains('abierto')) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
        }, 150);
    });

    // Init
    renderizarSugerencias();
    cargarHistorial();

    if (localStorage.getItem(ABRIR_KEY) === '1') {
        setTimeout(() => {
            abrirChat();
            badge.style.display = 'none';
        }, 500);
    } else if (!localStorage.getItem(SEEN_KEY)) {
        badge.style.display = 'flex';
    }

    // Debug global
    window.DEBUG_CHATBOT = {
        buscar: buscarRespuesta,
        procesar: procesarTexto,
        activarDebug: () => { window.DEBUG_CHAT = true; }
    };

    console.log('🤖 InfoCEUT v4.0 cargado');
})();