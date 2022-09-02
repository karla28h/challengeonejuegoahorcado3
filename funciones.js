function agregarPalabra() {
    document.querySelector(".btns-inicio").style.display = "none";
    document.querySelector(".palabra-nueva").style.display = "flex"; 
    document.querySelector(".juego").style.display = "none"; 
    
    var btnGuardarEmpezar = document.querySelector(".btn-guardar-empezar");
    btnGuardarEmpezar.addEventListener("click", function(event) {
        var entrada = document.querySelector(".input-palabra-nueva");
        var valor = verificarPalabra(entrada.value);
        if(valor) {
            palabras.push(entrada.value);
            console.log(palabras);
            iniciarJuego();
        }
    });

    var btnCancelar = document.querySelector(".btn-cancelar");
    btnCancelar.addEventListener("click", function(event) {
        document.querySelector(".btns-inicio").style.display = "flex";
        document.querySelector(".palabra-nueva").style.display = "none"; 
        document.querySelector(".juego").style.display = "none";
    })
}

function dHorca(errores) {
    switch(errores) {
        case 1:
            dBase();
            break;
        case 2:
            dMastil();
            break;
        case 3:
            dTravesa();
            break;
        case 4:
            dSoga();
            break;
        case 5:
            dCabeza();
            break;
        case 6:
            dTronco();
            break;
        case 7:
            dPieDerecho();
            break;
        case 8:
            dPieIzquierdo();
            break;
        case 9:
            dManoDerecha();
            break;
        case 10:
            dManoIzquierda();
            return false;
            break;
        default:
            break;
    }
}

function dLetraCorrecta(letra, position) {
    var letras = document.querySelector(".letra-" + position);
    letras.textContent = letra;
}

function dLetraIncorrecta(letra) {
    var letraNo = document.createElement("span");
    letraNo.classList.add("letra-no");
    letraNo.textContent = letra;
    document.querySelector(".letras-no").appendChild(letraNo);
}

function dMensaje(mensaje) {
    console.log(mensaje);
}

let palabras = [
    "CODIGO",
    "JUEGO",
    "JAVA",
    "HTML",
    "ALURA",
    "ORACLE",
    "DISCORD",
    "WEB"
];

function escogerPalabra() {
    var indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

var palabra;

function iniciarJuego(){
    document.querySelector(".btns-inicio").style.display = "none";
    document.querySelector(".palabra-nueva").style.display = "none"; 
    document.querySelector(".juego").style.display = "flex";

    document.querySelector("canvas").style.display = "";
    document.querySelector(".entrada-juego").style.display = "";
    document.querySelector(".mensaje").style.display = "none";

    palabra = escogerPalabra();
    errores = 0;
    lUsadas = [];
    finJuego = false;
    ganaste = 0;
    mensaje = "";
    letrasErrores = [];

    limpiar();

    mostrarGuiones(palabra);

    console.log(palabra);
}

function mostrarGuiones(palabra) {
    for(var i = 1; i <= 8; i++) {
        document.querySelector(".linea-" + i).style.display = "none";

        var letras = document.querySelector(".letras");
        while(letras.firstChild) {
            letras.removeChild(letras.firstChild);
        }

        var letrasNo = document.querySelector(".letras-no");
        while(letrasNo.firstChild) {
            letrasNo.removeChild(letrasNo.firstChild);
        }
    }

    for(var i = 1; i <= palabra.length; i++) {
        document.querySelector(".linea-" + i).style.display = "";

        var letras = document.createElement("span");
        letras.classList.add("letra");
        letras.classList.add("letra-" + i);
        document.querySelector(".letras").appendChild(letras);
    }
}

function vFin() {
    if(finJuego) {
        document.querySelector("canvas").style.display = "none";
        document.querySelector(".entrada-juego").style.display = "none";
        document.querySelector(".mensaje").style.display = "";
        document.querySelector(".mensaje").textContent = mensaje;
        document.querySelector(".mensaje").style.color = colorMensaje;
    }
}

var finJuego = false;
var ganaste = 0;
var mensaje = "";
var colorMensaje;
var letrasErrores;

function vLetra(letra) {
    var esta = false;

    if(lUsadas.indexOf(letra) == -1) {
        lUsadas.push(letra);
    
        for(var i = 0; i < palabra.length; i++) {
            if(letra == palabra[i]) {
                dLetraCorrecta(letra, i + 1);
                ganaste++;
                esta = true;
            }
    
            if(ganaste == palabra.length) {
                finJuego = true;
                mensaje = "Ganaste, felicidades. La palabra era: " + palabra;
                colorMensaje = "green";
                vFin();
            }
        }
        if(!esta) {
            if(letrasErrores.indexOf(letra) == -1) {
                errores++;
                letrasErrores.push(letra);
                dLetraIncorrecta(letra);
                if(dHorca(errores) == false) {
                    finJuego = true;
                    mensaje = "Perdiste, lo siento. La palabra era: " + palabra;
                    colorMensaje = "red";
                    vFin();
                }
            }
        }
        return esta;
    }
}

function vGanaste() {
    
}

function verificarPalabra(palabra) {
    if(palabra.length > 8 || palabra.length < 2) {
        return false;
    }
    for(var i = 0; i < palabra.length; i++) {
        switch(palabra[i]) {
            case "A":
            case "B":
            case "C":
            case "D":
            case "E":
            case "F":
            case "G":
            case "H":
            case "I":
            case "J":
            case "K":
            case "L":
            case "M":
            case "Ñ":
            case "O":
            case "P":
            case "Q":
            case "R":
            case "S":
            case "T":
            case "U":
            case "V":
            case "W":
            case "X":
            case "Y":
            case "Z":
                continue;
                break;
            default:
                return false;
                break;
        }
    }
    return true;
}

document.addEventListener("keypress", vTecla);

var errores = 0;
var lUsadas = [];

function vTecla(event) {
    var letra = event.key.toUpperCase();;
    
    if(vLetraCorrecta(letra)) {
        var indice = vLetra(letra);
    }

    /*if(!indice) {
        errores++;
        if(lUsadas.indexOf(letra) != -1) {
            dHorca(errores);
        }
    }*/
}

function vLetraCorrecta(letra) {
    var l = letra.toUpperCase();
    switch(l) {
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "F":
        case "G":
        case "H":
        case "I":
        case "J":
        case "K":
        case "L":
        case "M":
        case "N":
        case "Ñ":
        case "O":
        case "P":
        case "Q":
        case "R":
        case "S":
        case "T":
        case "U":
        case "V":
        case "W":
        case "X":
        case "Y":
        case "Z":
            return true;
            break;
        default:
            return false;
            break;
    }
}