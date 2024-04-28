var btn1back = document.getElementById("btn3Back")
var btnSound = document.getElementById("btn-sound")
var btnMusic = document.getElementById("btn-music")

btn1back.addEventListener("click", function () {BackMenu1 ()})
btnMusic.addEventListener("click", function () {setMusic ()})
btnSound.addEventListener("click", function () {setSound ()})

function BackMenu1(){
    window.location.href = "file:///home/ahimenes17/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/GitHub/Tetris_Hihiik/menu/menu.html"
}

function setSound() {
    let soundOn = "soundOn.svg"
    let soundOff = "soundOff.svg"

    
}

function setMusic(){

}