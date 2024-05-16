const contenedorCards = document.querySelector('#productos-container');
const unidadesElement = document.querySelector('#unidades');
const precioElement = document.querySelector('#precio');
const carritoVacioElement = document.querySelector('#carrito-vacio');
const totalesElement = document.querySelector('#totales');
const reiniciarCarritoElement = document.querySelector('#reiniciar');

function crearProductos() {
  contenedorCards.innerHTML = '';
  const productos = JSON.parse(localStorage.getItem('productos'));
  if (productos && productos.length > 0) {
    productos.forEach(producto => {
      const nuevoProducto = document.createElement('DIV');
      nuevoProducto.classList = 'card-producto';
      nuevoProducto.innerHTML = `
      <img src="./img/${producto.id}.png">
      <h3> ${producto.nombre} </h3>
      <p> $${producto.precio} </p>
      <div> 
        <button>-</button>
        <span class="cantidad">${producto.cantidad} </span>
        <button>+</button>
      </div>
      `
      contenedorCards.appendChild(nuevoProducto);
      nuevoProducto
        .getElementsByTagName('button')[1]
        .addEventListener('click', (e) => {
          // const cuentaElement = e.target.parentElement.getElementsByTagName('span')[0];
          // cuentaElement.innerText = agregarCarrito(producto);
          agregarCarrito(producto)
          crearProductos();
          actualizarTotales();
      });

      nuevoProducto
        .getElementsByTagName('button')[0]
        .addEventListener('click', (e) => {
          crearProductos();
          // const cuentaElement = e.target.parentElement.getElementsByTagName('span')[0];
          // cuentaElement.innerText = restarCarrito(producto);
          restarCarrito(producto)
          crearProductos();
          actualizarTotales();
      });
    });
  }
  console.log(productos)
  
}

crearProductos();
actualizarTotales();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem('productos'));
  let unidades = 0;
  let precio = 0;
  if( productos && productos.length  > 0) {
    productos.forEach(producto => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    })
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio;
  }
  revisarMensajeVacio();
}


actualizarTotales();
revisarMensajeVacio();

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem('productos'));
  carritoVacioElement.classList.toggle('escondido', productos && productos.length > 0);
  totalesElement.classList.toggle('escondido', !(productos && productos.length > 0));
}

revisarMensajeVacio();



reiniciarCarritoElement.addEventListener('click', reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem('productos');
  actualizarTotales();
  crearProductos();
}

