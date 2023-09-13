
let carrito       = [];
let productos     = [];

let gestor;
const DateTime = luxon.DateTime
const key_actualizacion = "ultima_actualizacion";
const key_carrito = "carrito";



document.addEventListener('DOMContentLoaded', () => {

    // Cargar el carrito con el localstorage, si no hay nada asignarle un array vacio
    carrito = JSON.parse( localStorage.getItem(key_carrito) ) || [];

    let ingreso = localStorage.getItem(key_actualizacion);

    ingreso ? console.log("Ultimo ingreso" + ingreso) : console.log("no esta registrado el ultimo ingreso");

    gestor = new GestionarProductos();
    gestor.iniciar();
})


function addCarrito( id ) {
    
    const prod = document.querySelector('#row_'+id);
    let producto = new Producto (   id,
                                    prod.querySelector('h3').textContent,
                                    prod.querySelector('.precio').textContent.substring(1,6),
                                    prod.querySelector('img').src
                                );

   
    gestor.addCart( producto );
}


function eliminar( id ) {   
    gestor.eliminarArticulo( id );
}
function comprar() {   
    gestor.comprarCarrito( );
}