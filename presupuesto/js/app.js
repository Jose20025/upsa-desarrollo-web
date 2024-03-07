// * VARIABLES
const formulario = document.querySelector('#agregar-gasto');
const gastoInput = document.querySelector('#gasto');
const cantidadInput = document.querySelector('#cantidad');

const listaGastos = document.querySelector('#gastos ul');

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
    this.presupuesto = Number(monto);
    this.restante = Number(monto);
    this.listaGastos = [];
  }
}

class UI {
  insertarPresupuesto(presupuesto) {
    const { presupuesto: monto, restante } = presupuesto;

    // Agregar HTML
    const spanTotal = document.querySelector('#total');
    const spanRestante = document.querySelector('#restante');

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

  if (nombre === '' && cantidad === '') {
    ui.imprimirAlerta('Los datos son obligatorios', 'error');
  }
}
