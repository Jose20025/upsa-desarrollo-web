document.addEventListener('DOMContentLoaded', () => {
  const inputMail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const inputCC = document.querySelector('#cc');

  const objetoMail = {
    email: '',
    asunto: '',
    mensaje: '',
    cc: '',
  };

  const spinner = document.querySelector('#spinner');

  const formulario = document.querySelector('#formulario');
  const botonSubmit = document.querySelector(
    '#formulario button[type="submit"]'
  );

  const botonReset = document.querySelector('#formulario button[type="reset"]');

  inputMail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);
  inputCC.addEventListener('input', validar);
  botonSubmit.addEventListener('click', enviarFormulario);
  botonReset.addEventListener('click', resetFormulario);

  function resetFormulario(event) {
    event.preventDefault();

    objetoMail.email = '';
    objetoMail.asunto = '';
    objetoMail.mensaje = '';
    objetoMail.cc = '';
    formulario.reset();

    deshabilitarBotonEnviar();
    limpiarAlertas(event.target.parentElement.parentElement);
  }

  function validar(event) {
    const { value, name, id } = event.target;

    if (value.trim() === '') {
      if (id === 'cc') {
        limpiarAlertas(event.target.parentElement);
        return;
      }

      mostrarAlerta(
        `El campo ${id} es requerido`,
        event.target.parentElement,
        id
      );
      deshabilitarBotonEnviar();
      objetoMail[id] = '';
      return;
    }

    if (id === 'email' && !validarEmail(value)) {
      mostrarAlerta(
        'El email no es valido, burro',
        event.target.parentElement,
        id
      );

      deshabilitarBotonEnviar();
      objetoMail[id] = '';
      return;
    }

    if (id === 'cc' && !validarEmail(value)) {
      mostrarAlerta(
        'El CC no es valido, burro',
        event.target.parentElement,
        id
      );

      deshabilitarBotonEnviar();
      objetoMail[id] = '';
      return;
    }

    objetoMail[id] = value.trim().toLocaleLowerCase();

    if (!isAllValid()) {
      deshabilitarBotonEnviar();
    }

    limpiarAlertas(event.target.parentElement);
    habilitarBotonEnviar();
  }

  function habilitarBotonEnviar(event) {
    botonSubmit.disabled = false;
    botonSubmit.classList.remove('opacity-50');
  }

  function deshabilitarBotonEnviar(event) {
    botonSubmit.disabled = true;

    if (!botonSubmit.classList.contains('opacity-50'))
      botonSubmit.classList.add('opacity-50');
  }

  function validarEmail(value) {
    const regEx =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    return regEx.test(value);
  }

  function mostrarAlerta(mensaje, element, id) {
    if (formulario.querySelector(`#error-alert-${id}`)) {
      document.getElementById(`error-alert-${id}`).remove();
    }

    const alerta = document.createElement('h1');
    alerta.className =
      'block text-white bg-red-600 p-3 rounded-lg border text-center font-medium';
    alerta.id = `error-alert-${id}`;

    alerta.textContent = mensaje;

    element.appendChild(alerta);
  }

  // Función que limpie las alertas
  function limpiarAlertas(referencia) {
    if (referencia.querySelector('h1')) {
      referencia.querySelector('h1').remove();
    }
  }

  function isAllValid() {
    const values = Object.values(objetoMail);
    values.pop();

    return !values.some((value) => value === '');
  }

  function enviarFormulario(event) {
    event.preventDefault();

    if (!isAllValid()) return;

    console.log(objetoMail);

    spinner.classList.remove('hidden');
    spinner.classList.add('block');

    const sendingMessage = document.createElement('h1');

    sendingMessage.textContent = 'Enviando...';

    sendingMessage.className =
      'text-white bg-slate-300 p-3 rounded-lg border text-center font-medium animate__pulse animate__animated animate__infinite';

    formulario.appendChild(sendingMessage);

    setTimeout(() => {
      const messageSent = document.createElement('h1');

      sendingMessage.remove();

      messageSent.textContent = 'Enviado!';

      messageSent.className =
        'text-white bg-green-500 p-3 rounded-lg border text-center font-medium animate__pulse animate__animated animate__faster';

      formulario.appendChild(messageSent);

      spinner.classList.remove('block');
      spinner.classList.add('hidden');

      setTimeout(() => {
        messageSent.remove();
        formulario.reset();

        deshabilitarBotonEnviar();
      }, 3000);
    }, 3000);
  }
});
