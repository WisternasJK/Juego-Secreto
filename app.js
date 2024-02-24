/*La forma de conectar JavaScript con los elementos del HTML es a través del "document", que es un objeto global que representa el documento HTML
actual en el que se está ejecutnado el script, sirve como puente. 
Este puente permite trabajar con muchos métodos, uno de ellos es el querySelector. 
Este permite (de todos los elementos de HTML) buscar y devolver el primer elemento que coincida con el selector especificado.
El Document Object Model (DOM), es una interfaz de programación que representa y estructura documentos HTML o XML como un árbol de objetos. 
El objeto global "document" en JavaScript es la entrada principal al DOM. 
Por lo tanto, cuando se dice que "document" es un objeto global del DOM en JavaScript, significa que este objeto es la interfaz principal a 
través de la cual puedes acceder y manipular la estructura y el contenido del documento HTML.*/


let numeroSecreto = 0;
let intento = 1;
//un array o arreglo.
let listaNumeroSorteados = [];

let numeroLimite = prompt("Ingrese la cantidad de números para jugar:");

let numeroMaximo = numeroLimite;

//La función puede tener un comportamiento dinámico de acuerdo a los parametros que se le establece.
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    //Es buena practica agregar el return, retorna algo.
    return;
}

/*--1--*/
//Una funcion es un bloque de codigo reutilizable que realiza una tarea específica.
function verificarIntento() {
    
    //El método getElementById permite, seleccionar un elemento del documento HTML por medio del valor del atributo id que se le haya asignado.
    //Se pone value, porque se necesita el valor y no el objeto.
    //Se usa parseInt porque la variable numeroDeUsuarios almacena un string.
    
    let numeroDeUsuarios = parseInt(document.getElementById('valorUsuario').value);

    //Retorna un booleano
    //El "===" es una mejor validación, tiene que ser igual en valor y en tipo de dato.
    if(numeroDeUsuarios === numeroSecreto){

        asignarTextoElemento('p', `Acertaste el número en ${intento} ${(intento == 1) ? 'intento' : 'intentos'}!`);
        //Obtiene el ID del elemento y selecciona el método removeAttriibute para eliminar el atributo disabled.
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(numeroDeUsuarios > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor!');
        } else{
            asignarTextoElemento('p', 'El número secreto es mayor!');
        }
    
        intento++;
        limpiarCaja();
    }
}


function limpiarCaja()
{
    //Se puede usar el ID con # usando querySelector.
    document.querySelector('#valorUsuario').value = "";
    
}


function generarNumeroSecreto() {

    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);

    //Se pregunta si se sorteó todos los numeros.
    if(listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sorteron todos los numeros posibles!');
        
    }else{
        //Si el numero generado está incluido en la lista, se va a volver a generar otro numero.
        if(listaNumeroSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        //Si no está en la lista es porque no se sorteó.
        } else{
            //Para que no aparezca ese numero otra vez, se guarda en la lista.
           
            listaNumeroSorteados.push(numeroGenerado);

            return numeroGenerado;
            
        }
    }
}

function condicionesIniciales()
{   
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}: `);
    numeroSecreto = generarNumeroSecreto();
    intento = 1;

}

condicionesIniciales();


function reiniciarJuego()
{
    //Limpiar la caja
    limpiarCaja();

    //Indicar mensaje intervalo de numeros
    //Generar numero aleatorio
     //Inicializar el numero de intentos
     condicionesIniciales()

    //Deshabilitar el boton de nuevo juego
    //Se va a usar el ID: "reiniciar". Aca se necesita poner (setAttribute) el "disabled" con el valor "true"  
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}


