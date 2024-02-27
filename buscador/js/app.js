const resultado = document.querySelector('#resultado');
const yearSelect = document.querySelector('#year');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos();

  llenarSelectYears();
});

const mostrarAutos = () => {
  autos.forEach((auto) => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;

    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Color: ${color} - Precio: $${precio}
    `;

    resultado.appendChild(autoHTML);
  });
};

const llenarSelectYears = () => {
  for (let year = minYear; year < maxYear; year++) {
    const option = document.createElement('option');

    option.value = year;
    option.textContent = year;

    yearSelect.appendChild(option);
  }
};
