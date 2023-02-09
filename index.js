
var indexSong = 0;
var audio = new Audio(canciones[indexSong]);
var isPlaying = false;

//Inicializa los segundos y minutos
let sec = 0;
let min = 0;
//Esto se llama en bucle
function bucle() {
    if (isPlaying) {
        goTimer();
    }
}
function goTimer() {
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

function playMusic() {
    //Pausa la animacion quan no esta reproduint
    playPauseAnimation(true)
    isPlaying = true;
}

function backMusic() {
    //Para la cancion anterior
    //audio.stop();
    //Si intenta anar una cancion mes petita retorna el minim
    if (indexSong - 1 >= 0) {
        indexSong--;
    }
    refreshData();
}

function nextMusic() {
    //Para la cancion anterior
    //audio.stop();
    //Si intenta anar una cancion mes gran retorna el minim
    if (indexSong + 1 < canciones.length) {
        indexSong++;
    }
    refreshData();
}

function refreshData() {
    let cancionOBJ = canciones[indexSong];
    document.getElementsByClassName("title")[0].innerText = cancionOBJ.titol;
    document.getElementsByClassName("artista")[0].innerText = cancionOBJ.artista;
    document.getElementById("rotateImage").src = cancionOBJ.image;
    audio = new Audio(canciones[indexSong].path);
    console.log("Cancion actual", cancionOBJ);

    // Reseteja el contador
    sec = 0
    min = 0;
}

function playPauseAnimation(state) {
    if (state) {
        for (let i = 0; i < document.getElementsByClassName("musica").length; i++) {
            document.getElementsByClassName("musica")[i].style.animation = "musicamaestro 1s infinite";
            //titleQuizHTML.style.animationFillMode = "forwards";
            document.getElementsByClassName("musica")[i].style.animationDelay = i * 0.2 + "s";
        }
        document.getElementById("rotateImage").style.animation = "rotaMusica 5s infinite";
    } else {
        for (let i = 0; i < document.getElementsByClassName("musica").length; i++) {
            document.getElementsByClassName("musica")[i].style.animation = "none";
        }
        document.getElementById("rotateImage").style.animation = "none";
    }
    console.log(canciones);
}

setInterval(bucle, 1000);
