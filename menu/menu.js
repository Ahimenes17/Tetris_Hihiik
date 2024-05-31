var btn_start_game = document.getElementById("button-start-game")
var btn_scores = document.getElementById("button-scores")
var btn_settings = document.getElementById("button-settings")

btn_start_game.addEventListener("click", function () {StartGame ()})
btn_scores.addEventListener("click", function () {ShowScores ()})
btn_settings.addEventListener("click", function () {ShowSettings ()})

function StartGame(){
    window.location.href = "../game/tetris1.html";
}

function ShowScores(){
    window.location.href = "../scoreBoard/scoresTable.html"
}

function ShowSettings(){
    window.location.href = "../settings/settings.html"
}