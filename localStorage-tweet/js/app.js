const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
const tweetTextArea = document.querySelector('#tweet');

let tweets = [];

// Eventos
formulario.addEventListener('submit', handleSubmit);

// Funciones
function handleSubmit(event) {
  event.preventDefault();

  const tweet = tweetTextArea.value;

  if (tweet === '') {
    // alert('Burro e mierda');
    mostrarError('Burro e mierda');
    return;
  }

  //   alert('Buena, no sos opa');
  tweets = [...tweets, tweet];

  tweetTextArea.value = '';

  mostrarTweets();
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement('p');

  mensajeError.textContent = mensaje;
  mensajeError.classList.add('error');
  mensajeError.id = 'tweet-error';

  document.querySelector('#contenido').appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

function mostrarTweets() {
  if (tweets.length <= 0) return;

  borrarTweets();

  tweets.forEach((tweet) => {
    let tweetElement = document.createElement('li');
    tweetElement.textContent = tweet;

    listaTweets.appendChild(tweetElement);
  });
}

function borrarTweets() {
  while (listaTweets.firstChild) {
    listaTweets.firstChild.remove();
  }
}
