const db = require('./db')
const bodyParser = require('body-parser');
const express = require('express')
var cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json());

app.get('/leaderboard', async (req, res) => {
    try {
        const query = {
            text: 'SELECT * from players ORDER BY score DESC LIMIT 10',
        }
        const response = await db.query(query)
        res.json(response.rows)
    } catch (err) {
        console.error("ERROR: ", err)
        res.sendStatus(500);
    }
})

app.post('/new-user', async (req, res) => {
    console.log("req.body: ", req.body)
    const { name, firebase_uid } = req.body;
    try {
        const query = {
            text: 'insert into players (create_time, name, score, firebase_uid) values (now(), $1, 0, $2)',
            values: [name, firebase_uid]
        }
        const response = await db.query(query)
        res.json(response)
    } catch (err) {
        res.sendStatus(500)
    }
})


app.listen(5000, () => {
    console.log("http://localhost:5000")
})