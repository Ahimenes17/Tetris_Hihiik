import {JSONFilePreset} from 'lowdb/node'

var btnSend = document.getElementById('btnSend')

btnSend.addEventListener("click", function() {send_score();})

function send_score(){
	const scores = {players:{}};
    var name = document.getElementById('name');
    var score = document.getElementById('score');
    var level = document.getElementById('level');
    const score_json = {"name_p": name, "score_p": score, "level_p": level}
    
    const db = JSONFilePreset('scores.json', scores);
    db.data.scores.push(score_json)
    db.write()
}