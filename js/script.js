let palabras=["perro","computadora","escarabajo","factura"];
let palabra;
let palabraSecreta;
let espacios;
let adivinar;
let contador=0;

String.prototype.replaceAt=
function(index, character){
    return this.substring(0, index) + character + 
    this.substring(index+character.length); }

function cargarPalabras(){
    //selecciona una palabra al azar del array plabras y reemplaza las letras por guiones
    palabra=palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta=palabra.replace(/./g,"_ ");
    //console.log(palabra+"="+ palabraSecreta);
    
}



function nuevoJuego(){
    //inicia el juego
    cargarPalabras();
    let juego=document.getElementById("juego")
    //agregamos al html heramientas para jugar
    juego.innerHTML= `
    <h1>Juega y Gana</h1>
    <h2>Introduzca 1 letra</h2>
    <input type="text" maxlength="1" id="letra"> <button onclick="Adivinar()" id="adivinar">Aceptar</button>
    <p id="espacios"></p>;
    <div class="ahorcado" id="ahorcado">

    </div>`
    espacios=document.getElementById("espacios").innerHTML=palabraSecreta;
     
}

function Adivinar(){

    //utiliza 1 letra para adivinar
    let letra=document.getElementById("letra").value;
    //llena los espacios con guiones
    //habilita el fallar
    let falla= true;
    //recorre la palabra 
    for(let i in palabra){
        //si la letra es igual a 1 letra en palabra
        if(letra==palabra[i]){
            //si hay iguales, remplaza los guiones por la letra
            palabraSecreta=palabraSecreta.replaceAt(i*2,letra);
            //no fallo
            falla=false;
        }
    }
    //llena los espacios con guiones
    espacios=document.getElementById("espacios").innerHTML=palabraSecreta;
    
    if(falla){
        contador++;
        //se mueve a los largo de 1177 pixeles descontando
        document.getElementById("ahorcado").style.backgroundPosition=-(235*contador)+'px 0';
    }if(contador==4){
        //cuando llegue al final de la imagen
        adivinar=document.getElementById("adivinar").disabled=true;
        letra=document.getElementById("letra").disabled=true;
        contador=0;
        alert("Perdiste");

    }else{
        //no queda guiones
        if(palabraSecreta.indexOf('_')<0){
            adivinar=document.getElementById("adivinar").disabled=true;
            letra=document.getElementById("letra").disabled=true;
            contador=0;
            alert("ganaste");
        }
    }

    letra=document.getElementById("letra").value='';
}
