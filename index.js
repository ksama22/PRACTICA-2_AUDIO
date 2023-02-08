//Inicializa los segundos y minutos
let sec = 0;
let min = 0;
//Esto se llama en bucle
function bucle() {
    //Suma segundos
    sec++;
    //Se carga en pantalla
    document.getElementsByClassName("time-song")[0].innerHTML = format(min) + ":" + format(sec);
    if (sec == 59) {
        min++;
        sec = 0;
    }
}

function format(numero) {
    if (numero < 10) {
        return "0" + numero;
    }
    return numero;
}

setInterval(bucle, 10);
