const modal = new bootstrap.Modal('#modalCarrito', {});
const btnModalCarrito = document.querySelector('#btnModalCarrito');
const cartCount = document.querySelector('#cartCount');
const ProductoDestacado = document.querySelector('.ProductoDestacado');
const modalListProducts = document.querySelector('#modalListProducts');
const btnCerrar = document.querySelector('#btnCerrar');
const btnComprar = document.querySelector('#btnComprar');
const btnOrder = document.querySelector('#btnOrder')
const inputSearch = document.querySelector('#inputSearch')
btnModalCarrito.addEventListener('click', function(){
    modal.show();
})

btnCerrar.addEventListener('click', ()=>{
    modal.hide();
})


inputSearch.addEventListener('input', (event)=>{
    const busqueda = event.target.value ;
    const ArrayBusqueda = listaProd.filter(( producto)=> producto.nombreProd.toLowerCase().includes( busqueda.toLowerCase()) );
    renderProductos(ArrayBusqueda)

}) 
//boton para ordenar por precio


btnOrder.addEventListener('click', () => {
    console.log('Ordenando');
    listaProd.sort( (a,b)=>{
        if( a.precio < b.precio){
            return -1
        }
        if( a.precio > b.precio ){
            return 1
        }
        return 0
    })
    renderProductos(listaProd)
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
    const product= listaProd.find( item => item.id == id );
    console.table(product);

}

renderProductos(listaProd)




