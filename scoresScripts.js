const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('scores.json')
const scores = low(adapter)

var btnSend = document.getElementById('btnSend')

btnSend.addEventListener("click", function() {send_score();})

function send_score(){
    console.log("I'm ready!")
	score.defaults({players:{}})
    .write()
    var name = document.getElementById('name');
    var score = document.getElementById('score');
    var level = document.getElementById('level');
    const score_json = {"name_p": name, "score_p": score, "level_p": level}
    scores.get('players')
    .push(score_json)
    .write()
    console.log("I'm finish!")
}