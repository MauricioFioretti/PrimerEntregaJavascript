/* Diseñar un juego para 2 jugadores que consiste en 2 rondas. En principio se pide el nombre de cada jugador.

Primer ronda: A cada jugador se le generan 3 dados con números entre 1 y 6. Si los 3 dados son iguales, suma 6 puntos. Si 2 dados son iguales, el tercero se genera nuevamente, y si los 3 dados son iguales suma 6 puntos, sino suma 3 puntos. Si los 3 dados son distintos suma 0 puntos.

Segunda ronda: El jugador elige par o impar y se generan 3 dados nuevamente. Si el jugador eligió la misma paridad que la paridad de la suma de los 3 dados, entonces suma tantos puntos como el mayor de los 3 dados. Además, si la paridad que eligió es igual a la paridad de cada uno de los dados, se multiplica por 2 la cantidad de puntos que tiene hasta el momento.

Validar nombres ingresados (que no tengan números ni caracteres especiales). Ir mostrando por consola o por pantalla los dados generados y qué va pasando a lo largo del programa de forma ordenada. Validar números ingresados para la paridad (1 es par y 2 es impar). Finalmente mostrar puntos obtenidos por cada jugador y el ganador.*/

"use strict"

console.log(`El siguiente juego es para 2 jugadores y consiste en 2 rondas.\n
======================================================================\n
PRIMER RONDA\n
Se tiran 3 dados y se obtiene un puntaje segun las siguientes reglas: \n
Si salen 3 dados iguales, suma 6 puntos. \n
Si salen 2 dados iguales, el tercero se tira nuevamente. Si los 3 dados resultantes son iguales suma 6 puntos, sino 3 puntos.\n
Si salen los 3 dados distintos, no suma puntos.\n
======================================================================\n
SEGUNDA RONDA\n
El jugador elige par o impar y se generan 3 dados nuevamente.\n
Si el jugador eligió la misma paridad que la paridad de la suma de los 3 dados, entonces suma tantos puntos como el mayor de los 3 dados.\n
Si elige distinta paridad que la suma de los 3 dados, no suma puntos.\n
Además, si la paridad que eligió es igual a la paridad de cada uno de los dados, se multiplica por 2 la cantidad de puntos que tiene hasta el momento.\n`)

alert(`Las reglas del juego se encuentran por consola, presiona la tecla F12.`)

//===============================================Variables====================================================================
let jugador1 = compruebaNombre(1)
let jugador2 = compruebaNombre(2)

let dado1 = 0, dado2 = 0, dado3 = 0

let puntajeJ1 = 0, puntajeJ2 = 0

let paridad1 = 0, paridad2 = 0

//===============================================Funciones====================================================================

//Función para crear un nombre y comprobar si el nombre tiene caracteres que no sean letras, empiezan en espacio o no contienen nada
function compruebaNombre(numeroJugador) {
    let condicion = false
    let jugador
    let jugadorN //Se usa una variable distinta a jugador, ya que a jugador la transformamos a todo minúsculas

    do {
        jugadorN = prompt(`Ingrese el nombre del jugador ${numeroJugador}: \nSolo se admiten letras sin tilde y espacios que no esten al principio.`)
        jugador = jugadorN.toLowerCase()

        for (let i = 0; i < jugador.length; i++) {
            if ((jugador.charCodeAt(i) < 97 || jugador.charCodeAt(i) > 122) && jugador.charAt(i) != " ") {
                condicion = true
                break
            }

            else {
                condicion = false
            }
        }
    } while (condicion || jugador == "" || jugador.charAt(0) == " ")

    return jugadorN
}

//Función para generar un dado random entre 1 y 6
function dadoRandom() {
    let dado = Math.floor((Math.random() * 6) + 1)
    return dado
}

//Función para generar la simulación de la tirada de dados y cargar puntos según la cantidad de dados iguales del jugador
function primerRonda(jugador) {
    dado1 = dadoRandom()
    dado2 = dadoRandom()
    dado3 = dadoRandom()
    let puntaje = 0

    document.write(`Los 3 dados generados para ${jugador} son: ${dado1}-${dado2}-${dado3} <br>`)

    if (dado1 == dado2 || dado1 == dado3 || dado2 == dado3) {
        if (dado1 == dado2) {
            if (dado1 == dado3) {
                puntaje += 6
            }
            else {
                dado3 = dadoRandom()

                document.write(`Como el 3er dado era distinto se generó nuevamente y salió: ${dado3} <br>`)

                if (dado1 == dado3) {
                    puntaje += 6
                }
                else {
                    puntaje += 3
                }
            }
        }

        else if (dado1 == dado3) {
            dado2 = dadoRandom()

            document.write(`Como el 2do dado era distinto se generó nuevamente y salió: ${dado2} <br>`)

            if (dado1 == dado2) {
                puntaje += 6
            }
            else {
                puntaje += 3
            }
        }

        else {
            dado1 = dadoRandom()

            document.write(`Como el 1er dado era distinto se generó nuevamente y salió: ${dado1} <br>`)

            if (dado1 == dado2) {
                puntaje += 6
            }
            else {
                puntaje += 3
            }
        }
    }
    //Acá se podría poner la impresión de la cantidad de puntos que se obtuvieron en la primer ronda, pero prefiero dejarlo despues de llamar a la función
    //No se pone el else ya que deberia sumar 0 puntos, y puntaje ya vale 0

    return puntaje
}

//Función para determinar la paridad elegida por un jugador
function paridad(jugador) {
    let paridad = 0
    do {
        paridad = prompt(`${jugador} debe elegir una paridad \nIngrese 1 = par \nIngrese 2 = impar`)
    } while (paridad !== "1" && paridad !== "2")

    return paridad
}

//Función para generar la simulación de la tirada de dados y cargar puntos según la paridad elegida por el jugador
function segundaRonda(jugador, paridad, puntaje) {
    dado1 = dadoRandom()
    dado2 = dadoRandom()
    dado3 = dadoRandom()
    document.write(`Los 3 dados generados para ${jugador} son: ${dado1}-${dado2}-${dado3} <br>`)

    let paridadDados = (dado1 + dado2 + dado3) % 2  //Si la suma es par, resto 0. Si la suma es impar, resto 1

    if (paridadDados == 0 && paridad == 1 || paridadDados == 1 && paridad == 2) {
        puntaje += Math.max(dado1, dado2, dado3) //Devuelve el mayor de los numeros que le pasemos
        
        if(paridad == 1){
            document.write(`${jugador} eligió par y la paridad de la suma de los dados también es par, por lo que se suma al puntaje el mayor de los dados. Su nuevo puntaje es: ${puntaje} puntos <br>`)
        }
        else{
            document.write(`${jugador} eligió impar y la paridad de la suma de los dados también es impar, por lo que se suma al puntaje el mayor de los dados. Su nuevo puntaje es: ${puntaje} puntos <br>`)
        }

        if ((paridad == 1 && dado1 % 2 == 0 && dado2 % 2 == 0 && dado3 % 2 == 0) || (paridad == 2 && dado1 % 2 == 1 && dado2 % 2 == 1 && dado3 % 2 == 1)) {
            puntaje *= 2

            document.write(`Además, como la paridad de cada uno de los dados es igual a la paridad que eligió ${jugador}, el total de los puntos obtenidos hasta el momento se duplican, obteniendo un total de: ${puntaje} puntos <br>`)
        }
    }
    else {
        if(paridad == 1){
            document.write(`${jugador} eligió par y la paridad de la suma de los dados es impar, por lo que no suma puntos. El puntaje final es: ${puntaje} puntos<br>`)
        }
        else{
            document.write(`${jugador} eligió impar y la paridad de la suma de los dados es par, por lo que no suma puntos. El puntaje final es: ${puntaje} puntos<br>`)
        }
    }

    document.write(`<br>`)

    return puntaje
}



//===============================================RONDA 1======================================================================
document.write(`COMIENZA LA PRIMER RONDA <br>`)

//Primer ronda, jugador 1:
puntajeJ1 = primerRonda(jugador1)
document.write(`En la primer ronda, ${jugador1} obtuvo ${puntajeJ1} puntos <br><br>`)

//Primer ronda, jugador 2:
puntajeJ2 = primerRonda(jugador2)
document.write(`En la primer ronda, ${jugador2} obtuvo ${puntajeJ2} puntos <br><br>`)


//===============================================RONDA 2======================================================================

document.write(`COMIENZA LA SEGUNDA RONDA <br>`)

//Segunda ronda, jugador 1:
paridad1 = paridad(jugador1)
puntajeJ1 = segundaRonda(jugador1, paridad1, puntajeJ1)

//Segunda ronda, jugador 2:
paridad2 = paridad(jugador2)
puntajeJ2 = segundaRonda(jugador2, paridad2, puntajeJ2)


//=========================================Elección de ganadores=============================================================

document.write(`FELICITACIONES A LOS PARTICIPANTES POR JUGAR <br>`)

if (puntajeJ1 > puntajeJ2) {
    document.write(`El ganador fue ${jugador1} con ${puntajeJ1} puntos vs  ${puntajeJ2} puntos de ${jugador2}`)
}
else if (puntajeJ2 > puntajeJ1) {
    document.write(`El ganador fue ${jugador2} con ${puntajeJ2} puntos vs  ${puntajeJ1} puntos de ${jugador1}`)
}
else {
    document.write(`Hubo empate entre ${jugador1} y ${jugador2} con ${puntajeJ1} puntos`)
}