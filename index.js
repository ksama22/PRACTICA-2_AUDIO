
//Inicializa los segundos y minutos
let sec = 0;
let min = 0;
//Esto se llama en bucle
function bucle() {
    if (!reproductor.paused) {
        goTimer();
    }

    //Pasa de cancion si finaliza 
    if (reproductor.currentTime >= reproductor.duration) {
        nextMusic();
        playMusic();
    }
}
//Cancion actual
var indexSong = 0;
//Variable que tendra las canciones
let canciones = null;
//No uso <audio>, lo defino en new Audio
var reproductor = null

// funcion asincrona (async await)
async function carregaDades() {
    await fetch('./dades.json')
        //La respuesta en formato json
        .then(response => response.json())
        .then(data => {
            //El resultado (data) lo guarda en 'canciones'
            canciones = data;
        })
    //El reprodcutor cargara la primera cancion
    reproductor = new Audio(canciones[indexSong]);
    //Escribe el titulo, la imagen y el artista
    refreshData();
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
    if (!reproductor.paused) {
        document.getElementById("icon-play").innerText = "pause_circle_filled";
        pauseAnimation();
        reproductor.pause();
    } else {
        playAnimation();
        document.getElementById("icon-play").innerText = "play_circle_filled";
        reproductor.play();
    }
}

function backMusic() {
    reproductor.pause();
    //Para la cancion anterior
    //reproductor.stop();
    //Si intenta anar una cancion mes petita retorna el minim
    if (indexSong - 1 >= 0) {
        indexSong--;
    }
    stopAnimation()
    refreshData();
}

function nextMusic() {
    reproductor.pause();
    //Para la cancion anterior
    //reproductor.stop();
    //Si intenta anar una cancion mes gran retorna el minim
    if (indexSong + 1 < canciones.length) {
        indexSong++;
    }
    stopAnimation()
    refreshData();
}

function refreshData() {
    let cancionOBJ = canciones[indexSong];
    document.getElementsByClassName("title")[0].innerText = cancionOBJ.titol;
    document.getElementsByClassName("artista")[0].innerText = cancionOBJ.artista;
    document.getElementById("rotateImage").src = cancionOBJ.image;
    reproductor = new Audio(canciones[indexSong].path);
    //console.log("Cancion actual", cancionOBJ);

    // Reseteja el contador
    sec = 0
    min = 0;
    //Posa el contador a cero
    document.getElementsByClassName("time-song")[0].innerHTML = format(min) + ":" + format(sec);

}

function changeVolume() {
    let a = document.getElementById("volume-input").value;
    reproductor.volume = parseFloat(a) / 100;
    console.log("volumen", a, reproductor.volume);
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
        barresMusicals[i].style.animationPlayState = "paused";
    }
    //Treu la animacio al la imatge per girar
    document.getElementById("rotateImage").style.animationPlayState = "paused";
}

function stopAnimation() {
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
