/* ====================================================
   MICRORUTA SCZ – JAVASCRIPT BÁSICO
   Las páginas se conectan con enlaces <a href="...">.
   Aquí solo se añaden pequeños detalles interactivos.
   ==================================================== */

// 1. PLANIFICADOR: agregar una actividad y cambiar su orden.
function agregarActividad() {
    var nombre = prompt('¿Qué actividad quieres agregar?');
    if (!nombre || nombre.trim() === '') return;

    var lista = document.getElementById('lista-actividades');
    var regreso = document.getElementById('actividad-regreso');
    if (!lista) return;

    var nueva = document.createElement('div');
    nueva.className = 'actividad actividad-extra';
    nueva.innerHTML = '<span class="actividad-icono">+</span>' +
        '<div class="actividad-texto"><strong></strong><span>Actividad adicional · Duración por definir</span></div>' +
        '<button class="mover" type="button" title="Mover actividad" onclick="moverActividad(this)">⋮</button>';
    nueva.querySelector('strong').textContent = nombre.trim();
    lista.insertBefore(nueva, regreso);
    actualizarCantidad();
}

// Mueve una actividad una posición hacia abajo (ideal para demostrar el orden editable).
function moverActividad(boton) {
    var actividad = boton.closest('.actividad');
    var siguiente = actividad.nextElementSibling;
    if (siguiente && siguiente.id !== 'actividad-regreso') {
        actividad.parentNode.insertBefore(siguiente, actividad);
    } else {
        var lista = actividad.parentNode;
        var primera = lista.querySelector('.actividad[data-editable]');
        if (primera && primera !== actividad) lista.insertBefore(actividad, primera);
    }
}

function actualizarCantidad() {
    var contador = document.getElementById('cantidad-actividades');
    if (contador) contador.textContent = 2 + document.querySelectorAll('.actividad-extra').length;
}

function alternarRegreso() {
    var boton = document.getElementById('boton-regreso');
    var regreso = document.getElementById('actividad-regreso');
    boton.classList.toggle('activo');
    var activo = boton.classList.contains('activo');
    boton.setAttribute('aria-pressed', String(activo));
    if (regreso) regreso.classList.toggle('oculto', !activo);
}

// 2. RESULTADO: cambiar la opción de organización del viaje.
function seleccionarOpcion(boton, mensaje) {
    var botones = document.querySelectorAll('.opcion');
    botones.forEach(function (item) { item.classList.remove('seleccionada'); });
    boton.classList.add('seleccionada');
    var nota = document.getElementById('texto-sugerencia');
    if (nota) nota.textContent = mensaje;
}

// 3. RESULTADO -> AGENDA: guardar un aviso simple en el navegador.
function guardarAgenda() {
    localStorage.setItem('microruta_guardado', 'si');
    window.location.href = 'agenda.html?guardado=si';
}
function mostrarAvisoGuardado() {
    var aviso = document.getElementById('aviso-guardado');
    var datos = new URLSearchParams(window.location.search);
    if (aviso && (datos.get('guardado') === 'si' || localStorage.getItem('microruta_guardado') === 'si')) {
        aviso.classList.remove('oculto');
    }
}

// 4. MODO VIAJE: marcar los cuatro pasos y actualizar la barra.
function cambiarPaso(boton) {
    boton.classList.toggle('marcado');
    var marcado = boton.classList.contains('marcado');
    boton.querySelector('.paso-check').textContent = marcado ? '✓' : '';

    var total = document.querySelectorAll('.paso-viaje.marcado').length;
    document.getElementById('numero-progreso').textContent = total;
    document.querySelectorAll('.segmento').forEach(function (segmento, indice) {
        segmento.classList.toggle('listo', indice < total);
    });
}

// 5. AGENDA: elegir visualmente un día de la semana.
function seleccionarDia(boton) {
    document.querySelectorAll('.dia').forEach(function (item) {
        item.classList.remove('seleccionado');
        item.setAttribute('aria-pressed', 'false');
    });
    boton.classList.add('seleccionado');
    boton.setAttribute('aria-pressed', 'true');
}

// Se ejecuta cuando se abre cualquier página.
document.addEventListener('DOMContentLoaded', function () {
    mostrarAvisoGuardado();
});
