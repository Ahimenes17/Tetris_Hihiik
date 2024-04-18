var btn_start_game = document.getElementById("button-start-game")
var btn_scores = document.getElementById("button-scores")
var btn_settings = document.getElementById("button-settings")

btn_start_game.addEventListener("click", function () {StartGame ()})
btn_scores.addEventListener("click", function () {ShowScores ()})
btn_settings.addEventListener("click", function () {ShowSettings ()})

function StartGame(){
    window.location.href = "file:///home/ahimenes17/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/GitHub/Tetris_Hihiik/game/tetris1.html";
}

function ShowScores(){
    window.location.href = "file:///home/ahimenes17/%D0%94%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/GitHub/Tetris_Hihiik/scoreBoard/scoresTable.html"
}

function ShowSettings(){

}