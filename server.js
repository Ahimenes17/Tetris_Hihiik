// server.js
const express = require('express');
const app = express();
const path = require('path');
const mime = require('mime');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/records.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the records database.');
});

/*
app.use(express.static('public', {
setHeaders: (res, filePath) => {
  const mimeType = mime.lookup(filePath);
  res.setHeader('Content-Type', mimeType);
}
}));*/
app.use(express.static('public'));
app.use(express.static('public/audio'));
app.use(express.static('public/pages/menu'));
app.use(express.static('public/pages/game'));
app.use(express.static('public/pages/scoreBoard'));

app.use(express.json());

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "http://localhost:3000");
res.header("Access-Control-Allow-Methods", "POST");
res.header("Access-Control-Allow-Headers", "Content-Type");
next();
});

const pagesPath = path.join(__dirname, 'public/pages');

app.get('/', (req, res) => {
	res.sendFile(path.join(pagesPath, 'menu/menu.html'));
});

app.get('/play', (req, res) => {
  res.sendFile(path.join(pagesPath, 'game/tetris1.html'));
});


let playersTableSQL = `CREATE TABLE IF NOT EXISTS players (
Name TEXT,
Score INTEGER,
Level INTEGER
);`

app.post('/submit', (req, res) => {
	console.log(req.body);
	const { name, score, level } = req.body;
	console.log(name, score, level);
	if (name != null && score != null && level != null) {
		db.serialize(() => {
			console.log("db");
			db.run(playersTableSQL);

			db.run("INSERT INTO players (Name, Score, Level) VALUES (?, ?, ?)", [name, score, level]);
			console.log(`все строки базы данных: `);
			db.each("SELECT * FROM players", (err, row) => {
				console.log(`${row.Name}: Score: ${row.Score}, Level: ${row.Level}`);
			});
		});
	}
});


app.listen(3000, () => {
console.log('Server is running on port 3000');
});
