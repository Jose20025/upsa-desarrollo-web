const carrito = document.querySelector('#carrito');

const listaCarrito = document.querySelector('#lista-carrito tbody');

const botonVaciarCarrito = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulos = [];

// Definimos los listeners
const cargarEventListeners = () => {
  listaCursos.addEventListener('click', agregarCurso);
  botonVaciarCarrito.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', () => {
    articulos = JSON.parse(localStorage.getItem('carrito')) ?? [];

    construirItemsCarrito();
  });
};

// Definimos las funciones
const agregarCurso = (event) => {
  event.preventDefault();
  // console.log(event.target.classList)

  if (event.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = event.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
};

const leerDatosCurso = (curso) => {
  const infoCurso = {
    id: curso.querySelector('a').getAttribute('data-id'),
    img: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    autor: curso.querySelector('p').textContent,
    cantidad: 1,
  };

  // Verificamos si el producto existe dentro del carrito
  const existe = articulos.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursosActualizados = articulos.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articulos = [...cursosActualizados];
  } else {
    articulos = [...articulos, infoCurso];
  }

  guardarLocalStorage();

  vaciarItemsCarrito();
  construirItemsCarrito();
};

const construirItemsCarrito = () => {
  articulos.forEach((curso) => {
    const { img, titulo, precio, cantidad, id } = curso;

    const row = document.createElement('tr');
    row.innerHTML = `
            <td>
                <img src="${img}" width="100" alt="Imagen de Curso de ${titulo}">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

    const deleteButton = row.querySelector('.borrar-curso');

    deleteButton.addEventListener('click', () => {
      articulos = articulos.filter((curso) => curso.id !== id);

      guardarLocalStorage();

      vaciarItemsCarrito();
      construirItemsCarrito();
    });

    listaCarrito.appendChild(row);
  });
};

const vaciarItemsCarrito = () => {
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
};

const vaciarCarrito = () => {
  articulos = [];

  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
};

const guardarLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(articulos));
};

cargarEventListeners();
