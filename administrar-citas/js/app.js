// Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');

const listadoCitas = document.querySelector('#citas');

// Clases
class Cita {
  constructor({ mascota, propietario, telefono, fecha, hora, sintomas }) {
    this.id = new Date().toISOString();
    this.mascota = mascota;
    this.propietario = propietario;
    this.telefono = telefono;
    this.fecha = fecha;
    this.hora = hora;
    this.sintomas = sintomas;
  }
}

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas.push(cita);
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id != id);
  }
}

class UI {
  mostrarAlerta(elemento, mensaje) {
    const padre = elemento.parentElement;

    const alerta = document.createElement('div');

    alerta.textContent = mensaje;
    alerta.className = 'alert alert-danger mt-2';

    padre.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }

  mostrarConfirmacion() {
    const confirmacion = document.createElement('div');
    const padre = formulario.parentElement;

    confirmacion.textContent = 'Cita agregada correctamente';
    confirmacion.className = 'alert alert-success mt-2';

    padre.insertBefore(confirmacion, padre.firstChild);

    setTimeout(() => {
      confirmacion.remove();
    }, 2000);
  }

  mostrarCitas(citas) {
    this.limpiarCitas();

    const { citas: listaCitas } = citas;

    listaCitas.forEach((cita) => {
      const { id, mascota, propietario, telefono, fecha, hora, sintomas } =
        cita;

      const liCita = document.createElement('li');

      liCita.className = 'cita';

      liCita.innerHTML = `
      <h1>${mascota}</h1>
      <p><span class="font-bold">Propietario: </span> ${propietario}</p>
      <p><span class="font-bold">Telefono: </span> ${telefono}</p>
      <p><span class="font-bold">Fecha: </span> ${fecha}</p>
      <p><span class="font-bold">Hora: </span> ${hora}</p>
      <p><span class="font-bold">Sintomas: </span> ${sintomas}</p>
      `;

      const botonesDiv = document.createElement('div');
      botonesDiv.className = 'botones-div';

      const botonEliminar = document.createElement('button');
      const botonEditar = document.createElement('button');

      botonEliminar.addEventListener('click', () => {
        citas.eliminarCita(id);

        ui.mostrarCitas(citas);
      });

      botonEliminar.textContent = 'Eliminar';
      botonEditar.textContent = 'Editar';

      botonEliminar.className = 'btn btn-danger text-white';
      botonEditar.className = 'btn btn-info text-white';

      botonesDiv.appendChild(botonEliminar);
      botonesDiv.appendChild(botonEditar);
      liCita.appendChild(botonesDiv);
      listadoCitas.appendChild(liCita);
    });
  }

  limpiarCitas() {
    while (listadoCitas.firstChild) {
      listadoCitas.firstChild.remove();
    }
  }
}

const ui = new UI();

let citas;

document.addEventListener('DOMContentLoaded', () => {
  cargarListeners();

  citas = new Citas();
});

function cargarListeners() {
  formulario.addEventListener('submit', handleSubmit);
}

const handleSubmit = (event) => {
  event.preventDefault();

  let validado = true;

  // Validamos los datos
  // Nombre
  if (mascotaInput.value === '' || !mascotaInput.value) {
    ui.mostrarAlerta(mascotaInput, 'El nombre de la mascota es requerido');
    validado = false;
  }

  // Propietario
  if (propietarioInput.value === '' || !propietarioInput.value) {
    ui.mostrarAlerta(
      propietarioInput,
      'El nombre del propietario es requerido'
    );
    validado = false;
  }

  // Telefono
  if (telefonoInput.value === '' || !telefonoInput.value) {
    ui.mostrarAlerta(telefonoInput, 'El telefono es requerido');
    validado = false;
  } else if (isNaN(telefonoInput.value)) {
    ui.mostrarAlerta(telefonoInput, 'El telefono es invalido');
    validado = false;
  }

  if (fechaInput.value === '' || !fechaInput.value) {
    // Fecha
    ui.mostrarAlerta(fechaInput, 'La fecha de la cita es requerida');
    validado = false;
  } else if (isNaN(new Date(fechaInput.value).getTime())) {
    ui.mostrarAlerta(fechaInput, 'La fecha de la cita es invalida');
    validado = false;
  } else if (new Date(fechaInput.value).getTime() < Date.now()) {
    ui.mostrarAlerta(
      fechaInput,
      'La fecha de la cita no puede ser anterior a la fecha de hoy'
    );
    validado = false;
  }

  // Hora
  if (horaInput.value === '' || !horaInput.value) {
    ui.mostrarAlerta(horaInput, 'La hora de la cita es requerida');
    validado = false;
  }

  // Sintomas
  if (sintomasInput.value === '' || !sintomasInput.value) {
    ui.mostrarAlerta(
      sintomasInput,
      'Los sintomas de la mascota son requeridos'
    );
    validado = false;
  }

  if (!validado) return;

  const nuevaCita = new Cita({
    mascota: mascotaInput.value,
    propietario: propietarioInput.value,
    telefono: telefonoInput.value,
    fecha: fechaInput.value,
    hora: horaInput.value,
    sintomas: sintomasInput.value,
  });

  citas.agregarCita(nuevaCita);
  ui.mostrarCitas(citas);
  ui.mostrarConfirmacion();

  formulario.reset();
};
