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
    
    <svg viewBox="0 0 256 209" width=40 height=auto xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M256 25.45c-9.42 4.177-19.542 7-30.166 8.27 10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45" fill="#55acee"/></svg>
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
