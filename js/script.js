/* Pagina de ecommerce de muebles industriales */
/* Posteriormente con mayor codigo voy a realizar diferentes archivos de js para tener las funciones separadas. */



let nombre = "Pablo ";
let apellido = "Fontana";
let nombre_apellido = nombre + apellido;

let usuario = prompt ("Bienvenido a Cronoz!! como es tu nombre?")

//validacion de contrasena y user para futuro login.
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





//variable para la redireccion de los diferentes productos! 
let redireccion;
do{
        redireccion = prompt("Hola " + usuario + ". ¿Qué estás interesado en buscar? Muebles para la living, cocina, comedor o otros?");
        redireccion = redireccion.toLowerCase();
        if (redireccion === "living" || redireccion === "cocina" || redireccion === "comedor" || redireccion === "otros") {
        alert("Esta semana tenemos ofertas en " + redireccion + ", ¡imperdibles!");
        } else {
        alert("No ingresaste un producto válido. ¡Inténtalo de nuevo!");
        }
        console.log(redireccion);
} while (redireccion !== "living" && redireccion !== "cocina" && redireccion !== "comedor" && redireccion !== "otros");



function escritorio(cantidad) {
        let precio_escritorio = 500;
        let costo_escritorio;

        if (isNaN(parseFloat(cantidad))) {
        console.log("Ingrese un número válido");
        return;
        }
        let resultado = precio_escritorio * cantidad;
        costo_escritorio = "Debes abonar $" + resultado;
        console.log(costo_escritorio);
}