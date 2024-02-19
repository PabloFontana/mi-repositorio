/* Pagina de ecommerce de muebles industriales */
function validar_password(password){
        if( password=== "" || (password.lenght<4 )){
                return false;
        }else{
                return true;
        }
        }
function validar_user(user){
        if( user=== "" || (user.lenght<4) ){
                return false;
        }else{
                return true;
        }
        }

class busquedaProd {
        constructor(listaProd){
                this.listaProd = listaProd; 
        }

addStock(producto){
        let id = this.listaProd.length +1 ;
        producto.id = id ;
        this.listaProd.push(producto);
        
}
/* retornando producto por id */
getProductoById(id){
        const productoCod = this.listaProd.find ( item => item.id == id);
        
return productoCod ? productoCod : 'No ingresaste un codigo de producto valido, intenta de nuevo.' ;
}

/* filtro por categoria */
getProductoByCategoria(categoria){
        const listaProd = this.listaProd.filter(item => item.categoria=== categoria );
        return listaProd; 
        
        }
/* filtro por nombre de producto. con Includes aplicado!! */
getProductoByNombreProd(nombreProd){
        const listaProd = this.listaProd.filter(item => item.nombreProd.toLowerCase().includes(nombreProd.toLowerCase()));
        return listaProd;
}
getProductoByIVA(precio){
        const sumaIva = precio*1.21;
}

showProducto(){
        console.table(this.listaProd);
}
}

