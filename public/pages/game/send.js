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
    var score = document.getElementById('score_p');
    var level = document.getElementById('level_p');
    const score_json = {"name": name, "score": score, "level": level}
    scores.get('players')
    .push(score_json)
    .write()
    console.log("done")
}
