const contenedorCards= document.querySelector('#productos-container');

function crearProductos(productos) {
  productos.forEach(producto => {
    const nuevoProducto = document.createElement('DIV');
    nuevoProducto.classList = 'card-producto';
    nuevoProducto.innerHTML= `
    <img src="./img/${producto.id}.png">
    <h3> ${producto.nombre} </h3>
    <p> $${producto.precio} </p>
    <button> Agregar al carrito </button>
    ` 
    contenedorCards.appendChild(nuevoProducto);
    nuevoProducto.getElementsByTagName('button')[0].addEventListener('click', ()=> agregarCarrito(producto))
  })
}

crearProductos(productos);
