

 class GestionarProductos {

    iniciar() {

        
        productos = [

            {
                "id": 1,
                "nombre": "ARMA 3",
                "descripcion": "Adquiere tu membresía en arma 3",
                "precio": 300,
                "img": "arma.jpg",
                "destacado": 1
            },
            {
                "id": 2,
                "nombre": "PROJECT ZOMBOID",
                "descripcion": "Adquiere tu membresía en PZ",
                "precio": 200,
                "img": "pz.webp",
                "destacado": 1
            },

            {
                "id": 3,
                "nombre": "HELL LET LOOSE",
                "descripcion": "Adquiere tu membresía en HLL",
                "precio": 200,
                "img": "hll.webp",
                "destacado": 1
            },
            {
                "id": 4,
                "nombre": "READY OR NOT",
                "descripcion": "Adquiere tu membresía en RON",
                "precio": 300,
                "img": "ron.jpg",
                "destacado": 1
            },
            {
                "id": 5,
                "nombre": "DEADSIDE",
                "descripcion": "Adquiere tu membresía en DEADSIDE",
                "precio": 200,
                "img": "dead.jpg",
                "destacado": 1
            },
            
            
            //agregar nuevos productos
            //reemplazar por link de mpago


        ]
        

        
        let productosDestacados = productos.filter( prod => prod.destacado == 1 );

        this.cargarProductos( productosDestacados );
        
        this.mostrarCarrito();
        
        this.actualizarContador();
             
    }


  
    cargarProductos( productos ) { 
        
        const divProductos    = document.querySelector('#productos');
        divProductos.innerHTML = '';

        if( productos.length === 0 ) {

            this.mostrarHeader('No hay productos');
            return false;
        } 
        else {          

            productos.forEach( (producto) => {

                const {  id : id_prod,
                    nombre : nombre_prod,
                    precio: precio_prod,
                    img : img_prod,
                    cantidad : cant_prod,
                descripcion : descripcion_prod
            } = producto;


    
                let prod = document.createElement('div');
                prod.classList.add('col-12', 'h200', 'border', 'bg-white', 'rounded', 'mt-3', 'd-flex', 'align-items-center', 'p-3', 'flex-row', 'producto');
                prod.setAttribute('id', 'row_'+id_prod);    
               
        
                prod.innerHTML = `      <div class="w-20">
                                            <img src="../img/comunidad/${img_prod}" alt="" width="150" height="150" >
                                        </div>
    
                                        <div class="p-3 d-flex flex-column w-60 h-150">
                                            <h3 >${nombre_prod}</h3>                                            
                                            <p class ="descripcion">${descripcion_prod.substring(0,120)}</p>
                                        </div>
    
                                        <div class="d-flex align-items-center justify-content-center flex-column w-20 h-150">
                                            <p class="precio">$${precio_prod}</p>
                                            <a href="javascript:addCarrito(${id_prod})" class="btn btn-primary">Agregar al carrito</a>
                                        </div>`;
    
                divProductos.appendChild( prod );
    
            } )    
        }
    }

    
   /* buscar( q ) { 

        let resultado = productos.filter( producto => producto.nombre.toLowerCase().includes( q.toLowerCase() ) || producto.descripcion.toLowerCase().includes( q.toLowerCase() ));      
        this.cargarProductos( resultado );                   
    }*/



    addCart( infoProducto ) {
        
        
       const existe = carrito.some( producto => producto.id === infoProducto.id );

       
       if(existe) 
       {
          
           const articulos = carrito.map( producto => {

               if(producto.id === infoProducto.id)
               {
                   producto.cantidad++;
                   return producto;
               }
               else
               {
                   return producto;
               }

               carrito = articulos;               

           })

                     
                      Toastify({
                        text: "Se actualizo la cantidad del producto",
                        duration: 2000,
                        gravity: 'bottom'
        
                    }).showToast();
           
    
       }
       else 
       {
           
           carrito.push(infoProducto);

           Toastify({
            text: "Se agrego el producto",
            duration: 3000,
            gravity: 'bottom'

        }).showToast();
          

       }

       this.actualizarCarrito();
    }

   
    contarProductos() { 

        let contadorProductos = 0;

        carrito.forEach(( producto ) => {

            contadorProductos = contadorProductos + parseInt(producto.cantidad);
        })

        return contadorProductos;
    }

   
    actualizarCarrito() {

        
        this.actualizarContador();

        
        this.mostrarCarrito();

        
        this.guardarCarrito();
    }

    
    actualizarContador() { 

        let totalArticulos = this.contarProductos();

        let countCarrito = document.querySelector('#badgeCarrito');

       
        countCarrito.innerHTML = totalArticulos;

    }

    
    mostrarCarrito() { 

        let detalleCarrito = document.querySelector('#idCarrito');
    
        detalleCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach( ( producto ) => {


           
            const { id, nombre, precio, img, cantidad  } = producto;

    

            const row = document.createElement('div');
            row.classList.add('row');
            
            total += parseInt(precio*cantidad);

            row.innerHTML = `
                
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <img src="${img}" width="80"/>
                        </div>

                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            ${nombre}
                        </div>

                        <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                            $ ${precio}
                        </div>

                        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                            ${cantidad}
                        </div>

                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                            <a href="javascript:eliminar(${id})">
                                <i class="fa-solid fa-square-minus fa-2x"></i>
                            </a>
                        </div>
                        

            `;
    
            
            detalleCarrito.appendChild(row);

        })

        let row = document.createElement('div');
        row.classList.add('row');
        
        row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>`;

      
        detalleCarrito.appendChild(row);
    }

  
   //eliminar
    eliminarArticulo( id ) { 

        Swal.fire({
            title: '"Esta seguro de eliminar el producto?"',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            //position: center ,
            confirmButtonText: 'Si, eliminarlo',
            cancelButtonText: `Cancelar`,
            //time
          }).then((result) => {
            
            if (result.isConfirmed) 
            {
                carrito = carrito.filter( articulo => articulo.id != id);
                this.actualizarCarrito();

                this.mostrar_notificacion("el articulo fue eliminado del carrito",2000,"bottom");

            }            
          })         
          
    }
    
    //comprar
    comprarCarrito() { 

        Swal.fire({
            title: '"Esta seguro de finalizar la compra?"',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: `Cancelar`,
            
          }).then((result) => {
            
            if (result.isConfirmed) 
            {
                this.mostrar_notificacion("Gracias por su compra! Pronto nos comunicaremos para darte los accesos",5000,"bottom");
                carrito.length =[];
                
                this.actualizarCarrito();

                
                
            }            
          })         
          
    }



    guardarCarrito() { 
       
        localStorage.setItem(key_carrito, JSON.stringify( carrito ));
        const dt = DateTime.now();
        let date =  dt.toLocaleString();       
        localStorage.setItem(key_actualizacion,date);

    }

   
    mostrarHeader( msg ) { 
        const headerProductos = document.querySelector('#headerProductos');
        headerProductos.innerHTML = msg;
    }


mostrar_notificacion (texto,duracion,posicion){


                          
                          Toastify({
                            text: texto,
                            duration: duracion,
                            gravity: posicion
            
                        }).showToast();


}


}
