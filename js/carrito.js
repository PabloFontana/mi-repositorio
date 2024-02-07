class carro {
    constructor( lista =[]){
        this.carro = lista ;
    }


    addCarro( {id , nombreProd , img , precio }){
        
        const index = this.carro.findIndex( listaCarrito => listaCarrito.id == id)
        
        if(index == -1){
            this.carro.push ({id, nombreProd , precio , cantidad: 1});
        }else{
            //incremento la cantidad de un producto existente en el carrito.
            this.carro[index].cantidad += 1;
        }
        

        localStorage.setItem('carro', JSON.stringify(this.carro) );
    }
    



    getProductos(){
        return this.carro;
    }


    getCantidad(){
        const cantidadCarrito = this.carro.reduce( ( cantidad, producto ) => { return cantidad + producto.cantidad } , 0 )
        return cantidadCarrito ; 

    }


    getSumaCarro(){
        const SumaCarrito = this.carro.reduce( ( acumulador, producto ) => { return acumulador + (producto.cantidad * producto.precio ) } , 0 )
        return SumaCarrito ; 
    }

}