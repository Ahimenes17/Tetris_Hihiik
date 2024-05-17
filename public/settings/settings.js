var btn1back = document.getElementById("btn3Back")
var btnSound = document.getElementById("btn-sound")
var btnMusic = document.getElementById("btn-music")
var music = document.getElementById("music")

document.getElementById("soundoff-b").style.display = 'none'
document.getElementById("musicoff-b").style.display= 'none'

btn1back.addEventListener("click", function () {BackMenu1 ()})
btnMusic.addEventListener("click", function () {setMusic ()})
btnSound.addEventListener("click", function () {setSound ()})
music.addEventListener("oninput", function(){changeValueOfMusic()})

function BackMenu1(){
    window.location.href = "file:///home/ahimenes17/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/GitHub/Tetris_Hihiik/menu/menu.html"
}

function changeValueOfMusic(){
    var valueOfmusic = document.getElementById("music").value
    var audio = new Audio()
    audio.src = "/home/ahimenes17/Документы/GitHub/Tetris_Hihiik/audio/bg.mp3"
    audio.volume = valueOfmusic / 100
    audio.play()
}

function setSound() {
    var soundOn = document.getElementById("soundon-b")
    var soundOff = document.getElementById("soundoff-b")
    
    if (soundOn.style.display === 'none') {
        soundOn.style.display = 'inline';
        soundOff.style.display = 'none';
        document.getElementById("sound").value = 45
    } else {
        soundOn.style.display = 'none';
        soundOff.style.display = 'inline';
        document.getElementById("sound").value = 0
    }
}

function setMusic(){
    var musicOn = document.getElementById("musicon-b")
    var musicOff = document.getElementById("musicoff-b")
    if (musicOn.style.display === 'none'){
        musicOn.style.display = 'inline'
        musicOff.style.display = 'none'
        document.getElementById("music").value = 45 
    } else {
        musicOn.style.display = 'none'
        musicOff.style.display = 'inline'
        document.getElementById("music").value = 0
    }
}