const contenedorProductos = document.getElementById('contenedor-productos') // Se crea una constante 
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal= document.getElementById('precioTotal')
const pagar = document.getElementById('pagar')

/*Para agregar localStorage despues del carrito, una vez que este cargado el documento.
   creamos una condicion donde nos dice, que si ya cargo llamamos al carrito agregando el JSON */
document.addEventListener('DOMContentLoaded',() => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//Recorremos el Stock de producto utilizando un for each, Y por cada producto que se nos va a crear  vamos a agregar una clase
 //Luego procedemos a escribir el html donde ira inmersa cada imagen
 // Una vez agregado el boton terminamos de agregar todas las propiedades de los productos, inyectamos el html con appendchild
 let carrito = [] // Creaos una variable q va a ser una array vacio. Por que los elementos se van a agregar cuando el usuario seleccione

 stockProductos.forEach((producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <img src=${producto.img} alt= "">
        <h3>${producto.nombre}</h3>
        <p>${producto.desc}</p>
        <p>Talle: ${producto.talle}</p>
        <p class="precioProducto">Precio:$ ${producto.precio}</p>
        <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
        contenedorProductos.appendChild(div)

        const boton= document.getElementById(`agregar${producto.id}`)

        boton.addEventListener('click',() => {
            agregarAlCarrito(producto.id)
        })
    })

//Ahora creamos una funcion agregar para agregar los productos
const agregarAlCarrito = (prodId)=>{
    //Aqui trabajamos con la cantidad de productos agregados en el carrito. Si son un mismo producto se va a mantener el mismo producto sumando simplemente su cantidad
    const existe = carrito.some(prod => prod.id === prodId)
    if(existe) {
        const prod = carrito.map(prod => { // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId) {
                prod.cantidad++
                
            }
        })
    } else {

    const item = stockProductos.find ((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
    }
    actualizarCarrito()
    }//Este codigo nos va a traer aquel producto cuya propiedad id, coincida con el producto id que reciba por parametro


//Ahora hacemos casi lo mismo que en el stockProductos, solo que tenemos que recorrer el carrito y por cada producto crear un div con una clase para que se inserten bien los productos
//Luego por cada producto vamos a crear un div, que va a traer la clase producto-carrito que ya esta creada en css
const actualizarCarrito= () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod)=>{
        const div = document.createElement('div')
        div.className =('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: ${prod.precio * prod.cantidad}</p>
        <p>Cantidad: <span id ="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        //Nos permite mantener el carrito actualizado con los productos que dejamos dentro aun despues de haber recargado la pagina
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    //Por cada producto que recorra mi carrito le digo a mi acumulador que le sume la propiedad precio a mi producto y le damos el valor inicial al acumulador en cero.
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad,0)
}

//Ahora creamos una funcion para eliminar del carrito
//Cuando llamamos al eliminar del carrito recibo el id del producto a borrar por parametro lo busco con find dentro del carrito siguiendo la referencia de ese elemento, buscamos su indice. Y una vez con el indice hacemos un splice con el indice q nos da los metodos y borramos la cantidad que seria 1
const eliminarDelCarrito = (prodId) => {
    
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
    
}

//Esta funcion nos permite vaciar el carrito, igualando la longitud a cero para eliminar todos los elementos.
botonVaciar.addEventListener('click', () => {
    alert('¡¡Se van a eliminar todos los productos de tu carrito!!')
    carrito.length = 0
    actualizarCarrito()
})

pagar.addEventListener('click', () => {
    alert('¡¡Gracias por su compra, vuelva pronto!!')

    carrito.length = 0
    actualizarCarrito()
})


