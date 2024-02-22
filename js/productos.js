const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const CarritoTotal = document.querySelector('#CarritoTotal')
const ProductoDestacado = document.querySelector('.ProductoDestacado');
const modalListProducts = document.querySelector('#modalListProducts');
const btnCerrar = document.querySelector('#btnCerrar');
const btnComprar = document.querySelector('#btnComprar');
const btnOrder = document.querySelector('#btnOrder')
const inputSearch = document.querySelector('#inputSearch')
const SeleccionCategoria = document.querySelector('#SeleccionCategoria')
//No puedo hacer el local storage me devuelva el carrito que si queda guardado. no encuentro el error para saber porque no queda cargado al actualizar..
const listaDelCarrito = JSON.parse( localStorage.getItem('carro') ) || [];
const carrito = new carro(listaDelCarrito);

let lista_Productos = [] ;

cartCount.innerText = carrito.getCantidad();


btnModalCarrito.addEventListener('click', function(){
    
    const listaCarrito = carrito.getProductos();
    renderCarrito(listaCarrito);

    CarritoTotal.innerText = carrito.getSumaCarro(); 
    modal.show();
})

btnCerrar.addEventListener('click', ()=>{
    modal.hide();
})


inputSearch.addEventListener('input', (event)=>{
    const busqueda = event.target.value ;
    const ArrayBusqueda = lista_Productos.filter(( producto)=> producto.nombreProd.toLowerCase().includes( busqueda.toLowerCase()) );
    renderProductos(ArrayBusqueda)

}) 
//boton para ordenar por precio


SeleccionCategoria.addEventListener('change' , (e)=>{
    const id_categoria = SeleccionCategoria.value ;

    console.log('Cambio a  categoria', id_categoria)

    FiltroCategoria (id_categoria)
});



const FiltroCategoria = ( id_categoria ) =>{
    const nuevaLista = lista_Productos.filter ( (producto)=> producto.id_categoria == id_categoria );
    renderProductos(nuevaLista);

    /* console.table(nuevaLista); */

}


btnOrder.addEventListener('click', () => {
    console.log('Ordenando');
    lista_Productos.sort( (a,b)=>{
        if( a.precio < b.precio){
            return -1
        }
        if( a.precio > b.precio ){
            return 1
        }
        return 0
    })
    renderProductos(lista_Productos)
    //desaibilita la opcion de volver a precionar el boton, falta agregar un boton para ordenar de mayor a menor.
    btnOrder.setAttribute('disabled', true)
})




/* Mando list productos y los retorna renderizados. */
//producto destado viene desde el html de las carts de prodcutos, acordate de cambiar la clase para que sea mas entendible todo
const renderProductos = (lista)=> {

ProductoDestacado.innerHTML = '' ;

lista.forEach( producto => {
    ProductoDestacado.innerHTML += //html
        `<div class="ProductoDestacado">   
                <img class="tamanoAdaptado" src="${producto.img}" title="${producto.nombreProd}" alt="${producto.nombreProd}">
                <h3>${producto.nombreProd} </h3>
                <p class="precioProducto">Precio: $ ${producto.precio}</p>
                <button id="${producto.id}" class="btnproductos"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAcBJREFUSEvNlD+Iz3EYx1/v7vN8BgODcmKQUgajgdsMjBalDErJsSgkGRklkkxXLsVAFouNsgnDTaYzUkiWq1P3/Xy6h+/ld/3ud98/H/2cPOvz9Lye9/NPbLBpg/Pz7wCekv9WswjMyuzC31C3qmAIMMh7RGYvx4Wsa5GndBW4ATyX2dEmwKAYmfW2eD3AfSs5fwEmCGGXpI+jkLEAdTKvqkdIJ4GbMqsVrbHxASlNAa+B74SwU9KSp7QMrVu3LLOJpna29tCr6j3SPqRTCuFhCcBzvof7eeCuzC7WwC7AWaQZ4J3MDgxX19Qidzdy/gZsIYS9kua7Ae6byPkzsJkQ9kuaG0AaATmfwP0x8FZmBwexnWu2Ktn9gWI83QlI6QVwGGlaIdwvA7jvIecPwBIhbJO00HgX7jvI+RPwgxAmJdXfYMV6D8VTegUcAq7I7FbL4V3/td3XcJ9VjGeGY/oBOR/H/WnRy3CfUoxv/gzgHkhpHml3D+SZzI6NxvQqKKq8I6gI4FV1Ceky7rcV4501N9HhKxryym9KqX5+k8BXmW0fObpWXzmgqmaQ6kN6ohjPjSho9RUDxplD0Qz+a8BPRxzKGeZ9QbQAAAAASUVORK5CYII="/>
                Agregar </button>
        </div>`;
});



const btns = document.querySelectorAll(".btnproductos");

btns.forEach(btn =>{
    btn.addEventListener('click' , addACarrito)

})

}


const addACarrito = ( e ) =>{
    const id = e.target.id ; 
    //obtengo el producto
    const product= lista_Productos.find( item => item.id == id );
    console.table(product);
    carrito.addCarro( product);
    cartCount.innerText = carrito.getCantidad() ;
}


const renderCarrito = (listaCarrito ) => {
    modalListProducts.innerHTML ='';
    
    listaCarrito.forEach( prodCarrito =>{
        modalListProducts.innerHTML +=//html
        `<tr>
            <td> ${prodCarrito.nombreProd} </td>
            <td> ${prodCarrito.cantidad} </td>
            <td> $${prodCarrito.precio} </td>
            <td> $  ${prodCarrito.precio * prodCarrito.cantidad} </td>
            
        </tr>
        `;
    }); 
}

const renderCategoria = (listaCarrito ) => {
    SeleccionCategoria.innerHTML = '' ;
    listaCarrito.forEach( categoria => {
        SeleccionCategoria.innerHTML += //html 
        `<option selected value="${categoria.id_categoria}">${categoria.nombreCategoria}</option>
        `
    });


} 




//leyendo json local.
const getProductos = async () => {

    try{
        const endPoint = '../data.json';
        const respuesta = await fetch (endPoint)
        const json = await respuesta.json();

        
        const { listaProd , categoria }  = json;
        lista_Productos = listaProd ; 


        console.table(categoria)
        renderProductos(listaProd);
        renderCategoria(categoria)


    } catch (error){
        Swal.fire({
            title: "Error",
            text: 'Tenemos un inconveniente para mostrar los Productos, por favor intente más tarde',
            icon: "error",
            confirmButtonText: 'Aceptar'
        });

        console.log(error)
    
    }
    


}

getProductos();





