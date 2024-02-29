const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const precioMinimo = document.querySelector('#minimo');
const precioMaximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const yearSelect = document.querySelector('#year');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

let datosBusqueda = {
  marca: '',
  year: '',
  precioMinimo: '',
  precioMaximo: '',
  puertas: '',
  transmision: '',
  color: '',
};

// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos();

  llenarSelectYears();
});

marca.addEventListener('change', (event) => handleChange(event));
year.addEventListener('change', (event) => handleChange(event));
precioMinimo.addEventListener('change', (event) => handleChange(event));
precioMaximo.addEventListener('change', (event) => handleChange(event));
puertas.addEventListener('change', (event) => handleChange(event));
transmision.addEventListener('change', (event) => handleChange(event));
color.addEventListener('change', (event) => handleChange(event));

const handleChange = ({ target }) => {
  const { value, id } = target;

  console.log(value);

  datosBusqueda = {
    ...datosBusqueda,
    [id]: value,
  };

  filtrarAuto();
};

const filtrarAuto = () => {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarPrecioMaximo)
    .filter(filtrarPrecioMinimo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  limpiarAutos();
  mostrarAutos(resultado);
};

const filtrarMarca = (auto) => {
  const { marca } = datosBusqueda;

  if (marca) {
    return auto.marca === marca;
  }

  return auto;
};

const filtrarYear = (auto) => {
  const { year } = datosBusqueda;

  if (year) {
    return auto.year === parseInt(year);
  }

  return auto;
};

const filtrarPrecioMaximo = (auto) => {
  const { precioMaximo } = datosBusqueda;

  if (precioMaximo) {
    return auto.precioMaximo >= parseInt(precioMaximo);
  }

  return auto;
};

const filtrarPrecioMinimo = (auto) => {
  const { precioMinimo } = datosBusqueda;

  if (precioMinimo) {
    return auto.precioMinimo <= parseInt(precioMinimo);
  }

  return auto;
};

const filtrarPuertas = (auto) => {
  const { puertas } = datosBusqueda;

  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }

  return auto;
};

const filtrarTransmision = (auto) => {
  const { transmision } = datosBusqueda;

  if (transmision) {
    return auto.transmision === transmision;
  }

  return auto;
};

const filtrarColor = (auto) => {
  const { color } = datosBusqueda;

  if (color) {
    return auto.color === color;
  }

  return auto;
};

const mostrarAutos = (nuevosAutos) => {
  if (nuevosAutos?.length === 0) {
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent =
      'No hay resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
    return;
  }

  if (!nuevosAutos) {
    autos.forEach((auto) => {
      const { marca, modelo, year, precio, puertas, color, transmision } = auto;

      const autoHTML = document.createElement('p');

      autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Color: ${color} - Precio: $${precio}
      `;

      resultado.appendChild(autoHTML);
    });
  } else {
    nuevosAutos.forEach((auto) => {
      const { marca, modelo, year, precio, puertas, color, transmision } = auto;

      const autoHTML = document.createElement('p');

      autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Color: ${color} - Precio: $${precio}
      `;

      resultado.appendChild(autoHTML);
    });
  }
};

const limpiarAutos = () => {
  while (resultado.firstChild) {
    resultado.firstChild.remove();
  }
};

const llenarSelectYears = () => {
  for (let year = minYear; year < maxYear; year++) {
    const option = document.createElement('option');

    option.value = year;
    option.textContent = year;

    yearSelect.appendChild(option);
  }
};
