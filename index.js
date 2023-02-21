var indexSong = 0;
var audio = new Audio(canciones[indexSong]);

//Inicializa los segundos y minutos
let sec = 0;
let min = 0;
//Esto se llama en bucle
function bucle() {
    if (!audio.paused) {
        goTimer();
    }

    //Pasa de cancion si finaliza 
    if (audio.currentTime >= audio.duration){
        nextMusic();
        playMusic();
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
    //document.getElementById("icon-play").classList.replace("pause_circle_filled", "play_circle_filled");
    //Pausa la animacion quan no esta reproduint
    playAnimation()
    if (!audio.paused) {
        document.getElementById("icon-play").innerText = "pause_circle_filled";
        pauseAnimation();
        audio.pause();
    } else {
        playAnimation();
        document.getElementById("icon-play").innerText = "play_circle_filled";
        audio.play();
    }
    console.log(document.getElementById("icon-play").innerText);
}

function backMusic() {
    audio.pause();
    //Para la cancion anterior
    //audio.stop();
    //Si intenta anar una cancion mes petita retorna el minim
    if (indexSong - 1 >= 0) {
        indexSong--;
    }
    pauseAnimation()
    refreshData();
}

function nextMusic() {
    audio.pause();
    //Para la cancion anterior
    //audio.stop();
    //Si intenta anar una cancion mes gran retorna el minim
    if (indexSong + 1 < canciones.length) {
        indexSong++;
    }
    pauseAnimation()

    refreshData();
}

function refreshData() {
    let cancionOBJ = canciones[indexSong];
    document.getElementsByClassName("title")[0].innerText = cancionOBJ.titol;
    document.getElementsByClassName("artista")[0].innerText = cancionOBJ.artista;
    document.getElementById("rotateImage").src = cancionOBJ.image;
    audio = new Audio(canciones[indexSong].path);
    //console.log("Cancion actual", cancionOBJ);

    // Reseteja el contador
    sec = 0
    min = 0;
    //Posa el contador a cero
    document.getElementsByClassName("time-song")[0].innerHTML = format(min) + ":" + format(sec);

}

function changeVolume() {
    let a = document.getElementById("volume-input").value;
    audio.volume = parseFloat(a) / 100;
    console.log("volumen", a, audio.volume);
}

function playAnimation() {
    //Carrega la animacio per cada barra i li posa un delay a cadascun
    let barresMusicals = document.getElementsByClassName("musica");
    for (let i = 0; i < barresMusicals.length; i++) {
        barresMusicals[i].style.animation = "musicamaestro 1s infinite";
        barresMusicals[i].style.animationDelay = i * 0.2 + "s";
    }
    //Carrega la animacio al la imatge per girar
    document.getElementById("rotateImage").style.animation = "rotaMusica 8s infinite linear";
}

function pauseAnimation() {
    //Treu la animacio per cada barra 
    let barresMusicals = document.getElementsByClassName("musica");
    //Si l'estat es false treu les animacions
    for (let i = 0; i < barresMusicals.length; i++) {
        barresMusicals[i].style.animation = "none";
    }
    //Treu la animacio al la imatge per girar
    document.getElementById("rotateImage").style.animation = "none";
}

setInterval(bucle, 1000);
