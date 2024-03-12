// * VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const gastoInput = document.querySelector('#gasto');
const cantidadInput = document.querySelector('#cantidad');
const spanTotal = document.querySelector('#total');
const spanRestante = document.querySelector('#restante');

const listadoGastos = document.querySelector('#gastos ul');

let presupuesto;

cargarEventListeners();

// * EVENTOS
function cargarEventListeners() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
  formulario.addEventListener('submit', handleSubmit);
}

// * CLASES
class Presupuesto {
  constructor(monto) {
    this.monto = Number(monto);
    this.restante = Number(monto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.restante -= gasto.cantidad;
    this.gastos = [...this.gastos, gasto];
  }

  eliminarGasto(id) {
    const gastoEncontrado = this.gastos.find((gasto) => gasto.id === id);

    this.restante += Number(gastoEncontrado.cantidad);

    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
  }
}

class UI {
  insertarPresupuesto(presupuesto) {
    const { monto, restante } = presupuesto;

    // Agregar HTML
    spanTotal.textContent = monto;
    spanRestante.textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    // Crear div
    const alertaDiv = document.createElement('div');

    alertaDiv.classList.add('text-center', 'alert');
    alertaDiv.textContent = mensaje;

    if (tipo === 'error') {
      alertaDiv.classList.add('alert-danger');
    } else {
      alertaDiv.classList.add('alert-success');
    }

    // Mostrar el mensaje
    document.querySelector('.primario').insertBefore(alertaDiv, formulario);

    setTimeout(() => {
      alertaDiv.remove();
    }, 2000);
  }

  mostrarGastosHTML(gastos) {
    this.limpiarHTML();

    gastos.forEach((gasto) => {
      const liGasto = document.createElement('li');
      const botonBorrar = document.createElement('button');

      const { id, nombre, cantidad } = gasto;

      botonBorrar.textContent = 'Borrar';
      botonBorrar.className = 'btn btn-danger';

      botonBorrar.addEventListener('click', () => {
        presupuesto.eliminarGasto(id);
        this.mostrarGastosHTML(presupuesto.gastos);
        this.cambiarRestante(-cantidad);
      });

      liGasto.className =
        'list-group-item d-flex justify-content-between align-items-center';

      liGasto.innerHTML = `${nombre}
      <span class="badge badge-primary badge-pill">Bs. ${cantidad}</span>`;
      liGasto.id = id;

      liGasto.appendChild(botonBorrar);
      listadoGastos.appendChild(liGasto);
    });
  }

  limpiarHTML() {
    while (listadoGastos.firstChild) {
      listadoGastos.firstChild.remove();
    }
  }

  cambiarRestante(cantidad) {
    spanRestante.textContent -= Number(cantidad);
  }
}

// * INSTANCIAR LA CLASE UI
const ui = new UI();

// * FUNCIONES
function preguntarPresupuesto() {
  let presupuestoUsuario = prompt('Digite el presupuesto: ');

  if (
    presupuestoUsuario === '' ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    Number(presupuestoUsuario) <= 0
  ) {
    window.location.reload();
    return;
  }

  // Si está todo validado
  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto);
}

function handleSubmit(event) {
  event.preventDefault();

  // Leer datos del formulario
  const nombre = gastoInput.value;
  const cantidad = cantidadInput.value;

  if (nombre === '' || cantidad === '') {
    ui.imprimirAlerta('Los datos son obligatorios', 'error');
    return;
  } else if (isNaN(Number(cantidad)) || Number(cantidad) <= 0) {
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }

  // ui.cambiarRestante(cantidad);

  const gasto = { id: Date.now(), nombre, cantidad };

  presupuesto.nuevoGasto(gasto);
  ui.cambiarRestante(cantidad);

  ui.imprimirAlerta('El gasto fue agregado correctamente!');

  const { gastos, restante, monto } = presupuesto;

  ui.mostrarGastosHTML(gastos, presupuesto);

  if (restante <= 0) {
    spanRestante.parentElement.parentElement.classList.remove('alert-warning');
    spanRestante.parentElement.parentElement.classList.add('alert-danger');
  } else if (restante <= 0.3 * monto) {
    spanRestante.parentElement.parentElement.classList.remove('alert-success');
    spanRestante.parentElement.parentElement.classList.add('alert-warning');
  }

  formulario.reset();
}
