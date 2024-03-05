const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
const tweetTextArea = document.querySelector('#tweet');

let tweets = [];

// Eventos
document.addEventListener('DOMContentLoaded', () => {
  tweets = JSON.parse(localStorage.getItem('tweets')) ?? [];
  mostrarTweets();
  formulario.addEventListener('submit', handleSubmit);
});

// Funciones
function handleSubmit(event) {
  event.preventDefault();

  const tweet = tweetTextArea.value;

  if (tweet === '') {
    // alert('Burro e mierda');
    mostrarError('El text area no puede estar vacío');
    return;
  }

  if (tweets.includes(tweet)) {
    mostrarError('Ya existe ese tweet');
    return;
  }

  //   alert('Buena, no sos opa');
  tweets = [...tweets, tweet];

  guardarLocalStorage();

  tweetTextArea.value = '';

  mostrarTweets();
}

function eliminarTweet(event) {
  const tweetMsg = event.target.parentElement.querySelector('p');

  console.log(tweetMsg);

  tweets = tweets.filter((tweet) => tweet !== tweetMsg.textContent);

  mostrarTweets();

  guardarLocalStorage();
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
  borrarTweets();

  if (tweets.length <= 0) return;

  tweets.forEach((tweet) => {
    let tweetElement = document.createElement('div');
    tweetElement.classList.add('tweet-card');

    tweetElement.innerHTML = `
    
    <p>${tweet}</p>
    
    <button class="delete-button">X</button>
    `;

    tweetElement
      .querySelector('button')
      .addEventListener('click', eliminarTweet);

    listaTweets.appendChild(tweetElement);
  });
}

function borrarTweets() {
  while (listaTweets.firstChild) {
    listaTweets.firstChild.remove();
  }
}

function guardarLocalStorage() {
  // Guardar en localStorage
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
